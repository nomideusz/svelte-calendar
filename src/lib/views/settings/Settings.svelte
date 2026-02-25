<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { PresetName } from '../../theme/presets.js';
	import { presets, stageBg } from '../../theme/presets.js';

	/* ─── Field definition types ─────────────────────── */
	type RangeField = {
		key: string;
		label: string;
		type: 'range';
		min: number;
		max: number;
		step: number;
	};

	type ToggleField = {
		key: string;
		label: string;
		type: 'toggle';
	};

	export type SettingsField = RangeField | ToggleField;

	/* ─── Props ───────────────────────────────────────── */
	interface Props {
		fields: SettingsField[];
		values: Record<string, number | boolean>;
		theme: PresetName;
	}

	let { fields, values = $bindable(), theme = $bindable() }: Props = $props();

	const themeKeys: PresetName[] = ['midnight', 'parchment', 'indigo'];
	const themeLabels: Record<PresetName, string> = {
		midnight: 'Midnight',
		parchment: 'Parchment',
		indigo: 'Indigo',
	};
	const themeAccents: Record<PresetName, string> = {
		midnight: '#ef4444',
		parchment: '#b85c2f',
		indigo: '#6366f1',
	};

	let open = $state(true);

	function setVal(key: string, v: number | boolean) {
		values = { ...values, [key]: v };
	}

	function fmt(v: number | boolean): string {
		if (typeof v === 'boolean') return v ? 'true' : 'false';
		if (Number.isInteger(v)) return String(v);
		return v.toFixed(2);
	}
</script>

<div class="stg">
	<button class="stg-toggle" onclick={() => (open = !open)}>
		<svg class="stg-icon" class:stg-icon--open={open} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
			<path d="M6 4l4 4-4 4" />
		</svg>
		<span>Settings</span>
	</button>

	{#if open}
		<div class="stg-body" transition:slide={{ duration: 180 }}>
			<!-- Theme picker -->
			<div class="stg-row">
				<span class="stg-label">Theme</span>
				<div class="stg-themes">
					{#each themeKeys as k (k)}
						<button
							class="stg-chip"
							class:stg-chip--active={theme === k}
							style="--chip-c: {themeAccents[k]}"
							onclick={() => (theme = k)}
						>
							<span class="stg-chip-dot"></span>
							{themeLabels[k]}
						</button>
					{/each}
				</div>
			</div>

			<!-- Dynamic fields -->
			{#each fields as f (f.key)}
				<div class="stg-row">
					<span class="stg-label">{f.label}</span>
					{#if f.type === 'range'}
						<div class="stg-slider-wrap">
							<input
								class="stg-slider"
								type="range"
								min={f.min}
								max={f.max}
								step={f.step}
								value={values[f.key]}
								oninput={(e) => setVal(f.key, Number((e.target as HTMLInputElement).value))}
							/>
							<span class="stg-val">{fmt(values[f.key])}</span>
						</div>
					{:else if f.type === 'toggle'}
						<button
							class="stg-sw"
							class:stg-sw--on={values[f.key] === true}
							onclick={() => setVal(f.key, !values[f.key])}
							aria-pressed={values[f.key] === true}
							aria-label={f.label}
						>
							<span class="stg-sw-knob"></span>
						</button>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.stg {
		border: 1px solid rgba(148, 160, 180, 0.06);
		border-radius: 10px;
		background: rgba(148, 160, 180, 0.02);
		overflow: hidden;
		margin-bottom: 20px;
	}

	/* ─── Toggle header ──────────────────────────────── */
	.stg-toggle {
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		padding: 10px 14px;
		background: none;
		border: none;
		cursor: pointer;
		font: 500 10px / 1 'Outfit', system-ui, sans-serif;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(148, 160, 180, 0.4);
		transition: color 120ms;
	}
	.stg-toggle:hover {
		color: rgba(220, 225, 235, 0.7);
	}

	.stg-icon {
		width: 12px;
		height: 12px;
		transition: transform 160ms ease;
		flex-shrink: 0;
	}
	.stg-icon--open {
		transform: rotate(90deg);
	}

	/* ─── Body ────────────────────────────────────────── */
	.stg-body {
		padding: 2px 14px 14px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	/* ─── Row ─────────────────────────────────────────── */
	.stg-row {
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 28px;
	}
	.stg-label {
		flex-shrink: 0;
		width: 100px;
		font: 400 10px / 1 'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace;
		color: rgba(148, 160, 180, 0.35);
		white-space: nowrap;
	}

	/* ─── Theme chips ────────────────────────────────── */
	.stg-themes {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
	.stg-chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 4px 10px;
		border-radius: 100px;
		border: 1px solid rgba(148, 160, 180, 0.08);
		background: rgba(148, 160, 180, 0.03);
		cursor: pointer;
		font: 400 10px / 1 'Outfit', system-ui, sans-serif;
		color: rgba(148, 160, 180, 0.4);
		transition: border-color 140ms, background 140ms, color 140ms;
	}
	.stg-chip:hover {
		border-color: rgba(148, 160, 180, 0.15);
		color: rgba(220, 225, 235, 0.6);
	}
	.stg-chip--active {
		border-color: var(--chip-c);
		background: color-mix(in srgb, var(--chip-c) 8%, transparent);
		color: var(--chip-c);
	}
	.stg-chip-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--chip-c);
		opacity: 0.6;
	}
	.stg-chip--active .stg-chip-dot {
		opacity: 1;
		box-shadow: 0 0 6px var(--chip-c);
	}

	/* ─── Range slider ───────────────────────────────── */
	.stg-slider-wrap {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.stg-slider {
		flex: 1;
		-webkit-appearance: none;
		appearance: none;
		height: 3px;
		border-radius: 2px;
		background: rgba(148, 160, 180, 0.1);
		outline: none;
		cursor: pointer;
	}
	.stg-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: rgba(220, 225, 235, 0.5);
		border: 2px solid rgba(220, 225, 235, 0.15);
		cursor: grab;
		transition: background 100ms, transform 100ms;
	}
	.stg-slider::-webkit-slider-thumb:hover {
		background: rgba(220, 225, 235, 0.7);
		transform: scale(1.15);
	}
	.stg-slider::-webkit-slider-thumb:active {
		cursor: grabbing;
	}
	.stg-slider::-moz-range-thumb {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: rgba(220, 225, 235, 0.5);
		border: 2px solid rgba(220, 225, 235, 0.15);
		cursor: grab;
	}
	.stg-val {
		flex-shrink: 0;
		min-width: 38px;
		text-align: right;
		font: 500 10px / 1 'SF Mono', 'Cascadia Code', monospace;
		color: rgba(220, 225, 235, 0.45);
		font-variant-numeric: tabular-nums;
	}

	/* ─── Toggle switch ──────────────────────────────── */
	.stg-sw {
		position: relative;
		width: 34px;
		height: 18px;
		border-radius: 9px;
		border: 1px solid rgba(148, 160, 180, 0.12);
		background: rgba(148, 160, 180, 0.08);
		cursor: pointer;
		padding: 0;
		transition: background 160ms, border-color 160ms;
	}
	.stg-sw--on {
		background: rgba(99, 102, 241, 0.25);
		border-color: rgba(99, 102, 241, 0.35);
	}
	.stg-sw-knob {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(148, 160, 180, 0.4);
		transition: transform 160ms ease, background 160ms;
	}
	.stg-sw--on .stg-sw-knob {
		transform: translateX(16px);
		background: rgba(99, 102, 241, 0.9);
	}
</style>
