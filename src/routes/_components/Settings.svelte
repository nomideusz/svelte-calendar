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
	let open = $state(false);

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
	<button class="ps-open" aria-expanded={open} aria-controls="ps-body" onclick={() => (open = !open)}>
		<span>Props</span>
		<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
	</button>

	<div class="ps-body" class:ps-body--open={open} id="ps-body">
		<div class="ps-row ps-row--selects">
			{#each selects as f (f.key)}
				{@const reason = reasonOf(f)}
				<label class="ps-sel" class:ps-off={!!reason} {...show(f)}>
					<span class="ps-name">{f.label}</span>
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

		<div class="ps-row ps-row--chips">
			{#each toggles as f (f.key)}
				{@const reason = reasonOf(f)}
				<button
					type="button"
					class="ps-chip"
					class:ps-chip--on={values[f.key] === true}
					class:ps-off={!!reason}
					aria-pressed={values[f.key] === true}
					aria-disabled={!!reason}
					{...show(f)}
					onclick={() => { if (!reason) setVal(f.key, values[f.key] !== true); }}
				>
					<span class="ps-box" aria-hidden="true"></span>{f.label}
				</button>
			{/each}

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
	</div>

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
		--ps-rule: var(--dt-border-day, rgba(0, 0, 0, 0.14));
		border-top: 2px solid var(--dt-text, #111);
		border-bottom: 1px solid var(--ps-rule);
		color: var(--dt-text, #111);
	}

	.ps-open {
		display: none;
	}

	.ps-row {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		border-bottom: 1px solid var(--ps-rule);
	}

	/* ── Selects: prop name over value, ruled like timetable columns ── */
	.ps-sel {
		flex: 1 1 140px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 8px 14px 8px 0;
		margin-right: 14px;
		border-right: 1px solid var(--ps-rule);
		min-width: 0;
	}
	.ps-sel:last-child {
		border-right: none;
		margin-right: 0;
	}
	.ps-name {
		font: 500 11.5px/1 var(--dt-mono, ui-monospace, 'SFMono-Regular', Menlo, monospace);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.6));
	}
	.ps-sel select {
		appearance: none;
		width: 100%;
		padding: 2px 22px 2px 0;
		border: none;
		background: transparent
			url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='gray' stroke-width='1.6'/%3E%3C/svg%3E")
			right 0 center / 14px no-repeat;
		font: 700 15px/1.3 var(--dt-sans, inherit);
		letter-spacing: -0.01em;
		color: inherit;
		cursor: pointer;
		text-overflow: ellipsis;
	}
	.ps-sel select option {
		color: initial;
		background: initial;
	}
	.ps-sel select:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 3px;
		border-radius: 2px;
	}

	/* ── Toggles: prop chips, on = reversed ink plate ── */
	.ps-row--chips {
		gap: 5px;
		padding: 8px 0;
	}
	.ps-chip {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		min-height: 28px;
		padding: 0 10px 0 8px;
		border: 1px solid var(--ps-rule);
		border-radius: 4px;
		background: transparent;
		font: 500 12px/1 var(--dt-mono, ui-monospace, 'SFMono-Regular', Menlo, monospace);
		color: inherit;
		cursor: pointer;
		transition: background 120ms, color 120ms, border-color 120ms;
	}
	.ps-chip:hover:not(.ps-off) {
		border-color: var(--dt-text, #111);
	}
	.ps-box {
		width: 9px;
		height: 9px;
		border: 1.5px solid currentColor;
		border-radius: 1px;
		box-sizing: border-box;
	}
	.ps-chip--on {
		background: var(--dt-text, #111);
		border-color: var(--dt-text, #111);
		color: var(--dt-bg, #fff);
	}
	.ps-chip--on .ps-box {
		background: currentColor;
	}
	.ps-chip:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}

	.ps-off {
		opacity: 0.38;
		cursor: not-allowed;
	}
	.ps-off * {
		cursor: not-allowed;
	}

	/* ── Ranges ── */
	.ps-rng {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		min-height: 28px;
		padding: 0 10px;
		border: 1px solid var(--ps-rule);
		border-radius: 4px;
	}
	.ps-rng input {
		width: 84px;
		accent-color: var(--dt-text, #111);
	}
	.ps-rng output {
		min-width: 2ch;
		font: 700 14px/1 var(--dt-sans, inherit);
		font-variant-numeric: tabular-nums;
		text-align: right;
	}

	/* ── Info line: one message at a time, like a board's running text ── */
	.ps-info {
		display: flex;
		align-items: center;
		gap: 14px;
		min-height: 40px;
	}
	.ps-msg {
		margin: 0;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 8px;
		font: 500 13px/1.35 var(--dt-sans, inherit);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.6));
	}
	.ps-live {
		flex: none;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--signal, #eb0000);
	}

	@media (max-width: 700px) {
		.ps-open {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			min-height: 44px;
			padding: 0;
			border: none;
			border-bottom: 1px solid var(--ps-rule);
			background: none;
			font: 700 15px/1 var(--dt-sans, inherit);
			color: inherit;
			cursor: pointer;
		}
		.ps-open[aria-expanded='true'] svg {
			transform: rotate(180deg);
		}
		.ps-body {
			display: none;
		}
		.ps-body--open {
			display: block;
		}
		.ps-sel {
			flex-basis: 40%;
		}
		.ps-chip,
		.ps-rng {
			min-height: 36px;
		}
		.ps-sel:nth-child(2n) {
			border-right: none;
			margin-right: 0;
		}
		.ps-row--selects {
			row-gap: 0;
		}
		.ps-row--selects .ps-sel {
			border-bottom: 1px solid var(--ps-rule);
		}
		.ps-info {
			flex-wrap: wrap;
			gap: 8px;
			padding: 10px 0;
		}
	}
</style>
