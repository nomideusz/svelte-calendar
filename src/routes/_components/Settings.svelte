<script lang="ts">
	import type { Snippet } from 'svelte';

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
	};
	type RangeField = BaseField & { type: 'range'; min: number; max: number; step: number };
	type ToggleField = BaseField & { type: 'toggle' };
	type SelectField = BaseField & { type: 'select'; options: { value: string; label: string }[] };

	export type SettingsField = RangeField | ToggleField | SelectField;

	interface Props {
		fields: SettingsField[];
		values: Record<string, string | number | boolean>;
		/** Shown in the info line while no control is hovered or focused */
		status?: string;
		/** Rendered at the start of the info line (the external drag source) */
		lead?: Snippet;
	}

	let { fields, values = $bindable(), status = '', lead }: Props = $props();

	let hint = $state('');

	function setVal(key: string, v: string | number | boolean) {
		values = { ...values, [key]: v };
	}

	function reasonOf(f: SettingsField): string {
		const reason = f.disabledWhen?.(values);
		if (reason) return reason;
		if (f.enabledWhen && values[f.enabledWhen] !== true) return `Needs ${f.enabledWhen}`;
		return '';
	}

	const selects = $derived(fields.filter((f): f is SelectField => f.type === 'select'));
	const toggles = $derived(fields.filter((f): f is ToggleField => f.type === 'toggle'));
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
			<label class="ps-sel" class:ps-off={!!reason} {...show(f)}>
				<span class="ps-name">{f.label}:</span>
				<select
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

	<div class="ps-toggles">
		{#each toggles as f (f.key)}
			{@const reason = reasonOf(f)}
			<button
				type="button"
				class="ps-switch"
				class:ps-switch--on={values[f.key] === true}
				class:ps-off={!!reason}
				role="switch"
				aria-checked={values[f.key] === true}
				aria-disabled={!!reason}
				{...show(f)}
				onclick={() => { if (!reason) setVal(f.key, values[f.key] !== true); }}
			>
				<span class="ps-switch-lb">{f.label}</span>
				<span class="ps-knob" aria-hidden="true"></span>
			</button>
		{/each}
	</div>

	{#if ranges.length}
		<div class="ps-ranges">
			{#each ranges as f (f.key)}
				{@const reason = reasonOf(f)}
				<label class="ps-rng" class:ps-off={!!reason} {...show(f)}>
					<span class="ps-name">{f.label}</span>
					<input
						type="range"
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
	{/if}

	<div class="ps-info">
		{@render lead?.()}
		<p class="ps-msg" aria-live="polite">
			{#if hint}
				{hint}
			{:else if status}
				<span class="ps-live" aria-hidden="true"></span>{status}
			{:else}
				Drag an event to move it, drag its edge to resize, drag on empty time to create.
			{/if}
		</p>
	</div>
</section>

<style>
	.ps {
		--ps-rule: var(--dt-border-day, rgba(0, 0, 0, 0.3));
		color: var(--dt-text, #111);
	}

	/* ── Selects: the prop name on the left, its value in a hairline box ── */
	.ps-selects {
		display: flex;
		flex-direction: column;
		gap: calc(22 * var(--u));
	}
	.ps-sel {
		display: grid;
		grid-template-columns: calc(108 * var(--u)) minmax(0, 1fr);
		align-items: center;
		gap: calc(12 * var(--u));
	}
	.ps-name {
		font: 400 calc(22 * var(--u)) / 1 var(--dt-sans, inherit);
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
		background: transparent
			url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%23333' stroke-width='1.4'/%3E%3C/svg%3E")
			right calc(12 * var(--u)) center / calc(24 * var(--u)) no-repeat;
		font: 400 calc(22 * var(--u)) / 1.2 var(--dt-sans, inherit);
		color: inherit;
		cursor: pointer;
		text-overflow: ellipsis;
	}
	.ps-sel select option {
		color: initial;
		background: initial;
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
		grid-template-columns: 1fr 1fr;
		gap: calc(10 * var(--u)) calc(20 * var(--u));
		margin-top: calc(28 * var(--u));
	}
	.ps-switch {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(8 * var(--u));
		min-height: calc(40 * var(--u));
		padding: 0 calc(8 * var(--u)) 0 calc(16 * var(--u));
		border: 2px solid var(--dt-text-2, rgba(0, 0, 0, 0.66));
		border-radius: calc(22 * var(--u));
		background: transparent;
		color: inherit;
		font: 400 calc(19 * var(--u)) / 1 var(--dt-sans, inherit);
		text-align: left;
		cursor: pointer;
		transition: border-color 120ms;
	}
	.ps-switch:hover:not(.ps-off) {
		border-color: var(--dt-text, #111);
	}
	.ps-switch-lb {
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
	.ps-off * {
		cursor: not-allowed;
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
		accent-color: var(--dt-accent, #1d4fd7);
	}
	.ps-rng output {
		font: 400 calc(18 * var(--u)) / 1 var(--dt-sans, inherit);
		font-variant-numeric: tabular-nums;
		text-align: right;
	}

	/* ── Info line: one message at a time ── */
	.ps-info {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: calc(12 * var(--u)) calc(16 * var(--u));
		margin-top: calc(24 * var(--u));
		min-height: calc(36 * var(--u));
	}
	.ps-msg {
		margin: 0;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 8px;
		font: 400 calc(17 * var(--u)) / 1.4 var(--dt-sans, inherit);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.6));
	}
	.ps-live {
		flex: none;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--dt-accent, #1d4fd7);
	}

	@media (prefers-reduced-motion: reduce) {
		.ps-knob,
		.ps-knob::after,
		.ps-switch {
			transition: none;
		}
	}
</style>
