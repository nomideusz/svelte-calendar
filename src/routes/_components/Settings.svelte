<script lang="ts">
	
	/* ─── Field definition types ─────────────────────── */
	type BaseField = {
		key: string;
		/** The prop this control drives, shown as the control's name */
		label: string;
		/** One line on what the prop does — shown in the info line on hover/focus */
		hint?: string;
		/** Key of a toggle that must be on for this field to apply */
		enabledWhen?: string;
		/** Return a reason to disable the field (the current view ignores it). */
		disabledWhen?: (values: Record<string, string | number | boolean>) => string | false;
		/** Rarely needed: kept behind the "More props" disclosure */
		more?: boolean;
		/** The page shows it above the calendar on a phone, so the rail leaves it out there */
		quick?: boolean;
	};
	type RangeField = BaseField & { type: 'range'; min: number; max: number; step: number };
	type ToggleField = BaseField & { type: 'toggle' };
	type SelectField = BaseField & { type: 'select'; options: { value: string; label: string }[] };

	export type SettingsField = RangeField | ToggleField | SelectField;

	interface Props {
		fields: SettingsField[];
		values: Record<string, string | number | boolean>;
		/** What the hovered or focused control does (or why it is off); the page shows it */
		hint?: string;
	}

	let { fields, values = $bindable(), hint = $bindable('') }: Props = $props();

	function setVal(key: string, v: string | number | boolean) {
		values = { ...values, [key]: v };
	}

	function reasonOf(f: SettingsField): string {
		const reason = f.disabledWhen?.(values);
		if (reason) return reason;
		// Named as its control is: the prop (visibleHours), not the state key.
		if (f.enabledWhen && values[f.enabledWhen] !== true)
			return `Needs ${fields.find((g) => g.key === f.enabledWhen)?.label ?? f.enabledWhen}`;
		return '';
	}

	const selects = $derived(fields.filter((f): f is SelectField => f.type === 'select'));
	const toggles = $derived(fields.filter((f): f is ToggleField => f.type === 'toggle' && !f.more));
	const moreToggles = $derived(fields.filter((f): f is ToggleField => f.type === 'toggle' && !!f.more));
	const ranges = $derived(fields.filter((f): f is RangeField => f.type === 'range'));

	/* hover/focus feed the info line; the disabled reason wins over the hint */
	function show(f: SettingsField) {
		return {
			onpointerenter: () => (hint = reasonOf(f) || f.hint || ''),
			onpointerleave: () => (hint = ''),
			onfocusin: () => (hint = reasonOf(f) || f.hint || ''),
			onfocusout: () => (hint = ''),
		};
	}
</script>

<section class="ps" aria-label="Calendar props">
	<div class="ps-selects">
		{#each selects as f (f.key)}
			{@const reason = reasonOf(f)}
			<label class="ps-sel" class:ps-off={!!reason} class:ps-quick={f.quick} title={reason || undefined} {...show(f)}>
				<span class="ps-name">{f.label}:</span>
				<select
					name={f.key}
					aria-describedby={reason || f.hint ? `ps-why-${f.key}` : undefined}
					value={String(values[f.key] ?? '')}
					disabled={!!reason}
					onchange={(e) => setVal(f.key, e.currentTarget.value)}
				>
					{#each f.options as o (o.value)}
						<option value={o.value}>{o.label}</option>
					{/each}
				</select>
			</label>
		{/each}
	</div>

	{#snippet toggle(f: ToggleField)}
		{@const reason = reasonOf(f)}
		<button
			type="button"
			class="ps-switch"
			class:ps-switch--on={values[f.key] === true}
			class:ps-off={!!reason}
			role="switch"
			aria-checked={values[f.key] === true}
			aria-disabled={!!reason}
			aria-describedby={reason || f.hint ? `ps-why-${f.key}` : undefined}
			title={reason || undefined}
			{...show(f)}
			onclick={() => { if (!reason) setVal(f.key, values[f.key] !== true); }}
		>
			<span class="ps-switch-lb">{f.label}</span>
			<span class="ps-knob" aria-hidden="true"></span>
		</button>
	{/snippet}

	<div class="ps-toggles">
		{#each toggles as f (f.key)}{@render toggle(f)}{/each}
	</div>

	<details class="ps-more">
		<summary>More props</summary>
		<div class="ps-toggles">
			{#each moreToggles as f (f.key)}{@render toggle(f)}{/each}
		</div>
		<div class="ps-ranges">
			{#each ranges as f (f.key)}
				{@const reason = reasonOf(f)}
				<label class="ps-rng" class:ps-off={!!reason} title={reason || undefined} {...show(f)}>
					<span class="ps-name">{f.label}</span>
					<input
						type="range"
						name={f.key}
						aria-describedby={reason || f.hint ? `ps-why-${f.key}` : undefined}
						min={f.min}
						max={f.max}
						step={f.step}
						value={values[f.key]}
						disabled={!!reason}
						oninput={(e) => setVal(f.key, Number(e.currentTarget.value))}
					/>
					<output>{values[f.key]}</output>
				</label>
			{/each}
		</div>
	</details>

	<!-- What a control does, or why it is off, read with the control: the
	     info line shows it too, but is not announced (it is not live for hints). -->
	{#each fields as f (f.key)}
		{@const why = reasonOf(f) || f.hint}
		{#if why}<span class="ps-why" id="ps-why-{f.key}">{why}</span>{/if}
	{/each}
</section>

<style>
	.ps {
		--ps-rule: var(--dt-border-day, rgba(15, 15, 15, 0.6));
		color: var(--dt-text, #111);
	}

	/* ── Selects: the prop name on the left, its value in a hairline box ── */
	.ps-selects {
		display: flex;
		flex-direction: column;
		gap: calc(12 * var(--u));
	}
	.ps-sel {
		display: grid;
		grid-template-columns: calc(108 * var(--u)) minmax(0, 1fr);
		align-items: center;
		gap: calc(12 * var(--u));
	}
	.ps-name {
		font: 400 calc(22 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, #111);
		white-space: nowrap;
	}
	.ps-sel select {
		appearance: none;
		width: 100%;
		min-height: calc(50 * var(--u));
		padding: 0 calc(40 * var(--u)) 0 calc(16 * var(--u));
		border: 2px solid var(--dt-text, #111);
		border-radius: calc(6 * var(--u));
		background: transparent;
		font: 400 calc(22 * var(--u)) / 1.2 var(--dt-sans, system-ui, sans-serif);
		color: inherit;
		cursor: pointer;
		text-overflow: ellipsis;
	}
	/* The chevron is a mask over currentColor, so it reads on dark hosts too. */
	.ps-sel {
		position: relative;
	}
	.ps-sel::after {
		content: '';
		position: absolute;
		right: calc(12 * var(--u));
		top: 50%;
		width: calc(24 * var(--u));
		height: calc(24 * var(--u));
		translate: 0 -50%;
		background: currentColor;
		mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='black' stroke-width='1.4'/%3E%3C/svg%3E") center / contain no-repeat;
		pointer-events: none;
	}
	/* The open list is painted by the browser: give it the host's own ground
	   and ink, or a dark host gets light text on the default light popup. */
	.ps-sel select option {
		color: var(--dt-text, CanvasText);
		background: var(--dt-bg, Canvas);
	}
	.ps-sel select:hover:not(:disabled) {
		border-color: var(--dt-text, #111);
	}
	.ps-sel select:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}

	/* ── Toggles: switches in two columns, on = the knob in the accent ── */
	.ps-toggles {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: calc(10 * var(--u)) calc(20 * var(--u));
		margin-top: calc(18 * var(--u));
	}
	.ps-switch {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(8 * var(--u));
		min-height: calc(40 * var(--u));
		padding: 0 calc(8 * var(--u)) 0 calc(16 * var(--u));
		border: 2px solid var(--dt-text-2, rgba(15, 15, 15, 0.66));
		border-radius: calc(22 * var(--u));
		background: transparent;
		color: inherit;
		font: 400 calc(19 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		text-align: left;
		cursor: pointer;
		transition: border-color 120ms;
	}
	.ps-switch:hover:not(.ps-off) {
		border-color: var(--dt-text, #111);
	}
	.ps-switch-lb {
		/* the switch sets /1; descenders need the room or the clip cuts them */
		line-height: 1.3;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.ps-knob {
		flex: none;
		position: relative;
		width: calc(44 * var(--u));
		height: calc(26 * var(--u));
		border-radius: calc(13 * var(--u));
		background: color-mix(in srgb, var(--dt-text, #111) 18%, transparent);
		transition: background 140ms;
	}
	.ps-knob::after {
		content: '';
		position: absolute;
		top: calc(3 * var(--u));
		left: calc(3 * var(--u));
		width: calc(20 * var(--u));
		height: calc(20 * var(--u));
		border-radius: 50%;
		background: var(--dt-bg, #efebe9);
		transition: transform 140ms;
	}
	.ps-switch--on {
		color: var(--dt-accent, #1d4fd7);
		border-color: var(--dt-accent, #1d4fd7);
	}
	.ps-switch--on .ps-knob {
		background: var(--dt-accent, #1d4fd7);
	}
	.ps-switch--on .ps-knob::after {
		transform: translateX(calc(18 * var(--u)));
		background: #fff;
	}
	.ps-switch:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}

	.ps-off {
		opacity: 0.4;
		cursor: not-allowed;
	}
	/* A disabled switch is neutral whatever its value: no accent, so an ON
	   that does nothing doesn't read as on; the knob keeps its side. */
	.ps-switch.ps-off {
		opacity: 1;
		color: var(--dt-text-3, rgba(15, 15, 15, 0.54));
		border-color: var(--dt-text-3, rgba(15, 15, 15, 0.54));
	}
	.ps-switch.ps-off .ps-knob {
		background: color-mix(in srgb, var(--dt-text, #111) 10%, transparent);
	}
	.ps-switch.ps-off .ps-knob::after {
		background: var(--dt-bg, #efebe9);
	}
	.ps-off * {
		cursor: not-allowed;
	}

	.ps-why {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	/* ── Ranges ── */
	.ps-ranges {
		display: flex;
		flex-direction: column;
		gap: calc(10 * var(--u));
		margin-top: calc(18 * var(--u));
	}
	.ps-rng {
		display: grid;
		grid-template-columns: minmax(0, 1fr) calc(120 * var(--u)) 3ch;
		align-items: center;
		gap: calc(12 * var(--u));
		min-height: calc(36 * var(--u));
	}
	.ps-rng .ps-name {
		font-size: calc(18 * var(--u));
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ps-rng input {
		width: 100%;
		min-height: 24px;
		accent-color: var(--dt-accent, #1d4fd7);
	}
	.ps-rng output {
		font: 400 calc(18 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		text-align: right;
	}

	/* ── More props: a plain disclosure over a hairline ── */
	.ps-more {
		margin-top: calc(18 * var(--u));
		border-top: 1px solid var(--ps-rule);
	}
	.ps-more summary {
		display: flex;
		align-items: center;
		gap: calc(10 * var(--u));
		min-height: calc(44 * var(--u));
		font: 400 calc(19 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		cursor: pointer;
		list-style: none;
	}
	.ps-more summary::-webkit-details-marker {
		display: none;
	}
	.ps-more summary::after {
		content: '';
		width: calc(16 * var(--u));
		height: calc(16 * var(--u));
		background: currentColor;
		mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='black' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat;
		transition: transform 140ms;
	}
	.ps-more[open] summary::after {
		transform: rotate(180deg);
	}
	.ps-more summary:hover {
		color: var(--dt-text, #111);
	}
	.ps-more summary:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}
	.ps-more .ps-toggles {
		margin-top: calc(8 * var(--u));
	}

	/* Touch: every control at least 44px tall, whatever the unit has shrunk to. */
	@media (pointer: coarse) {
		.ps-switch,
		.ps-more summary,
		.ps-rng,
		.ps-rng input,
		.ps-sel select {
			min-height: 44px;
		}
	}

	/* Folded under the calendar (tablet widths): the controls run in columns
	   instead of stretching each select across the page. */
	@media (min-width: 641px) and (max-width: 1360px) {
		.ps-selects {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: calc(16 * var(--u)) calc(28 * var(--u));
		}
		.ps-toggles {
			grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
		}
		.ps-ranges {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: calc(10 * var(--u)) calc(28 * var(--u));
		}
	}

	@media (max-width: 640px) {
		.ps-quick {
			display: none;
		}
	}

	/* The narrowest phones: one switch per row, so no prop name is cut. */
	@media (max-width: 380px) {
		.ps-toggles {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ps-knob,
		.ps-knob::after,
		.ps-switch {
			transition: none;
		}
	}
</style>
