<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { PresetName } from '../../theme/presets.js';
	import { presets } from '../../theme/presets.js';

	/* ─── Field definition types ─────────────────────── */
	type BaseField = {
		key: string;
		label: string;
		group?: string;
	};

	type RangeField = BaseField & {
		type: 'range';
		min: number;
		max: number;
		step: number;
		enabledWhen?: string;
	};

	type ToggleField = BaseField & {
		type: 'toggle';
	};

	type SelectField = BaseField & {
		type: 'select';
		options: { value: string; label: string }[];
	};

	type SegmentField = BaseField & {
		type: 'segment';
		options: { value: string; label: string }[];
	};

	export type SettingsField = RangeField | ToggleField | SelectField | SegmentField;

	/* ─── Props ───────────────────────────────────────── */
	interface Props {
		fields: SettingsField[];
		values: Record<string, string | number | boolean>;
		theme: PresetName;
	}

	let { fields, values = $bindable(), theme = $bindable() }: Props = $props();

	const themeKeys: PresetName[] = ['midnight', 'parchment', 'indigo', 'neutral', 'bare'];
	const themeLabels: Record<PresetName, string> = {
		midnight: 'Midnight',
		parchment: 'Parchment',
		indigo: 'Indigo',
		neutral: 'Neutral',
		bare: 'Bare',
	};
	const darkThemes = new Set<PresetName>(['midnight']);
	const panelId = 'stg-panel';

	let open = $state(true);

	const themeStyle = $derived(presets[theme]);
	const colorScheme = $derived(darkThemes.has(theme) ? 'dark' : 'light');

	function setVal(key: string, v: string | number | boolean) {
		values = { ...values, [key]: v };
	}

	function fmt(v: string | number | boolean): string {
		if (typeof v === 'string') return v;
		if (typeof v === 'boolean') return v ? 'true' : 'false';
		if (Number.isInteger(v)) return String(v);
		return v.toFixed(2);
	}

	function controlId(key: string): string {
		return `stg-${key.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
	}

	/* Split fields into top-level (no group name) and grouped */
	const { topFields, groupedFields } = $derived.by(() => {
		const top: SettingsField[] = [];
		const orderedGroups: { name: string; id: string; fields: SettingsField[] }[] = [];
		const indexByName = new Map<string, number>();

		for (const field of fields) {
			const groupName = field.group ?? '';

			if (!groupName) {
				top.push(field);
				continue;
			}

			const existingIndex = indexByName.get(groupName);
			if (existingIndex === undefined) {
				const id = groupName
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/(^-|-$)/g, '');
				indexByName.set(groupName, orderedGroups.length);
				orderedGroups.push({ name: groupName, id: id || 'general', fields: [field] });
			} else {
				orderedGroups[existingIndex].fields.push(field);
			}
		}

		return { topFields: top, groupedFields: orderedGroups };
	});
</script>

<div class="stg" style="{themeStyle}; color-scheme: {colorScheme}">
	<button
		class="stg-hd"
		aria-expanded={open}
		aria-controls={panelId}
		onclick={() => (open = !open)}
	>
		<svg
			class="stg-chevron"
			class:stg-chevron--open={open}
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
		>
			<path d="M6 4l4 4-4 4" />
		</svg>
		<span>Settings</span>
	</button>

	{#if open}
		<div class="stg-body" id={panelId} transition:slide={{ duration: 180 }}>
			<!-- ─── Top bar: theme + ungrouped fields ─── -->
			<div class="stg-bar">
				<div class="stg-bar-item">
					<span class="stg-col-title" id="stg-theme-label">Theme</span>
					<div class="stg-pills" role="radiogroup" aria-labelledby="stg-theme-label">
						{#each themeKeys as k (k)}
							<button
								type="button"
								class="stg-pill"
								class:stg-pill--on={theme === k}
								role="radio"
								aria-checked={theme === k}
								onclick={() => (theme = k)}
							>
								{themeLabels[k]}
							</button>
						{/each}
					</div>
				</div>

				{#each topFields as f (f.key)}
					{@const fid = controlId(f.key)}
					{#if f.type === 'segment'}
						<div class="stg-bar-item">
							{#if f.label}
								<span class="stg-col-title" id={`${fid}-label`}>{f.label}</span>
							{/if}
							<div class="stg-pills" role="radiogroup" aria-labelledby={f.label ? `${fid}-label` : undefined} aria-label={f.label ? undefined : f.key}>
								{#each f.options as option (option.value)}
									<button
										type="button"
										class="stg-pill"
										class:stg-pill--on={String(values[f.key]) === option.value}
										role="radio"
										aria-checked={String(values[f.key]) === option.value}
										onclick={() => setVal(f.key, option.value)}
									>
										{option.label}
									</button>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<!-- ─── Grouped fields in columns ─── -->
			{#if groupedFields.length > 0}
				<div class="stg-grid">
					{#each groupedFields as section (section.id)}
						<section class="stg-col" aria-labelledby={`stg-s-${section.id}`}>
							<h3 class="stg-col-title" id={`stg-s-${section.id}`}>{section.name}</h3>

							{#each section.fields as f (f.key)}
								{@const fid = controlId(f.key)}

								{#if f.type === 'toggle'}
									<label class="stg-row stg-row--toggle" for={fid}>
										<span class="stg-lbl">{f.label}</span>
										<input
											id={fid}
											class="stg-sr"
											type="checkbox"
											role="switch"
											checked={values[f.key] === true}
											onchange={(e) => setVal(f.key, (e.target as HTMLInputElement).checked)}
										/>
										<span class="stg-sw" aria-hidden="true">
											<span class="stg-sw-knob"></span>
										</span>
									</label>

								{:else if f.type === 'range'}
									{@const disabled = !!f.enabledWhen && values[f.enabledWhen] !== true}
									<div class="stg-row stg-row--rng" class:stg-row--disabled={disabled}>
										<div class="stg-rng-hd">
											<label class="stg-lbl" for={fid}>{f.label}</label>
											<span class="stg-num">{fmt(values[f.key])}</span>
										</div>
										<input
											id={fid}
											class="stg-rng"
											type="range"
											min={f.min}
											max={f.max}
											step={f.step}
											value={values[f.key]}
											{disabled}
											oninput={(e) => setVal(f.key, Number((e.target as HTMLInputElement).value))}
										/>
									</div>

								{:else if f.type === 'select'}
									<div class="stg-row">
										<label class="stg-lbl" for={fid}>{f.label}</label>
										<select
											id={fid}
											class="stg-sel"
											value={String(values[f.key] ?? '')}
											onchange={(e) => setVal(f.key, (e.target as HTMLSelectElement).value)}
										>
											{#each f.options as option (option.value)}
												<option value={option.value}>{option.label}</option>
											{/each}
										</select>
									</div>

								{:else if f.type === 'segment'}
									<div class="stg-row stg-row--seg">
										{#if f.label}
											<span class="stg-lbl" id={`${fid}-label`}>{f.label}</span>
										{/if}
										<div class="stg-pills" role="radiogroup" aria-labelledby={f.label ? `${fid}-label` : undefined} aria-label={f.label ? undefined : f.key}>
											{#each f.options as option (option.value)}
												<button
													type="button"
													class="stg-pill"
													class:stg-pill--on={String(values[f.key]) === option.value}
													role="radio"
													aria-checked={String(values[f.key]) === option.value}
													onclick={() => setVal(f.key, option.value)}
												>
													{option.label}
												</button>
											{/each}
										</div>
									</div>
								{/if}
							{/each}
						</section>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* ─── Root: themed via --dt-* tokens from inline style ─── */
	.stg {
		border: 1px solid var(--dt-border, rgba(148, 160, 180, 0.10));
		border-radius: 10px;
		background: var(--dt-surface, #10141c);
		overflow: hidden;
		font-family: var(--dt-sans, 'Outfit', system-ui, sans-serif);
		margin-bottom: 20px;
	}

	/* ─── Collapsible header ─────────────────────────── */
	.stg-hd {
		display: flex;
		align-items: center;
		gap: 7px;
		width: 100%;
		padding: 10px 14px;
		background: none;
		border: none;
		cursor: pointer;
		font-weight: 600;
		font-size: 12px;
		line-height: 1;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dt-text-2, rgba(148, 160, 180, 0.62));
		transition: color 120ms;
	}
	.stg-hd:hover {
		color: var(--dt-text, rgba(228, 234, 245, 0.88));
	}

	.stg-chevron {
		width: 11px;
		height: 11px;
		flex-shrink: 0;
		transition: transform 150ms ease;
	}
	.stg-chevron--open {
		transform: rotate(90deg);
	}

	/* ─── Body ───────────────────────────────────────── */
	.stg-body {
		padding: 0 14px 12px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	/* ─── Top bar: theme + mode pills ────────────────── */
	.stg-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px 20px;
		padding-bottom: 4px;
	}

	.stg-bar-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	/* ─── Column grid for grouped fields ─────────────── */
	.stg-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
		gap: 2px 20px;
		border-top: 1px solid color-mix(in srgb, var(--dt-border, rgba(148, 160, 180, 0.10)) 50%, transparent);
		padding-top: 6px;
	}

	.stg-col {
		padding: 4px 0 2px;
		min-width: 0;
	}

	.stg-col-title {
		margin: 0 0 2px;
		font-weight: 600;
		font-size: 11px;
		line-height: 1;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-text-3, rgba(148, 160, 180, 0.40));
	}

	/* ─── Row (inline: label left, control right) ──── */
	.stg-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		min-height: 26px;
		padding: 2px 0;
	}

	.stg-row--rng {
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
		gap: 2px;
		min-height: auto;
		padding: 4px 0;
	}

	.stg-row--disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.stg-rng-hd {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px;
	}

	.stg-row--seg {
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 3px;
		padding: 3px 0;
	}

	.stg-row--toggle {
		cursor: pointer;
	}

	/* ─── Label ──────────────────────────────────────── */
	.stg-lbl {
		font-weight: 400;
		font-size: 13px;
		line-height: 1.2;
		color: var(--dt-text-2, rgba(148, 160, 180, 0.62));
		white-space: nowrap;
		flex-shrink: 0;
	}

	/* ─── Toggle switch ──────────────────────────────── */
	.stg-sr {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	.stg-sw {
		position: relative;
		display: block;
		width: 32px;
		height: 18px;
		border-radius: 9px;
		border: 1px solid var(--dt-border, rgba(148, 160, 180, 0.10));
		background: color-mix(in srgb, var(--dt-text-3, rgba(148, 160, 180, 0.40)) 10%, transparent);
		cursor: pointer;
		flex-shrink: 0;
		transition: background 150ms, border-color 150ms;
	}
	.stg-sr:checked + .stg-sw {
		background: var(--dt-accent-dim, rgba(99, 102, 241, 0.12));
		border-color: color-mix(in srgb, var(--dt-accent, #6366f1) 35%, transparent);
	}

	.stg-sw-knob {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--dt-text-3, rgba(148, 160, 180, 0.40));
		transition: transform 150ms ease, background 150ms;
	}
	.stg-sr:checked + .stg-sw .stg-sw-knob {
		transform: translateX(14px);
		background: var(--dt-accent, #6366f1);
	}

	/* ─── Range slider ───────────────────────────────── */
	.stg-rng {
		width: 100%;
		-webkit-appearance: none;
		appearance: none;
		height: 3px;
		border-radius: 2px;
		background: color-mix(in srgb, var(--dt-text-3, rgba(148, 160, 180, 0.40)) 30%, transparent);
		outline: none;
		cursor: pointer;
	}
	.stg-rng::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--dt-text-2, rgba(148, 160, 180, 0.62));
		border: none;
		cursor: grab;
		transition: background 100ms, transform 100ms;
	}
	.stg-rng::-webkit-slider-thumb:hover {
		background: var(--dt-text, rgba(228, 234, 245, 0.88));
		transform: scale(1.15);
	}
	.stg-rng::-webkit-slider-thumb:active {
		cursor: grabbing;
	}
	.stg-rng::-moz-range-thumb {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--dt-text-2, rgba(148, 160, 180, 0.62));
		border: none;
		cursor: grab;
	}

	.stg-rng:disabled {
		cursor: default;
	}

	.stg-num {
		flex-shrink: 0;
		min-width: 22px;
		text-align: right;
		font: 500 11px / 1 var(--dt-mono, 'SF Mono', 'Cascadia Code', ui-monospace, monospace);
		font-variant-numeric: tabular-nums;
		color: var(--dt-text-2, rgba(148, 160, 180, 0.62));
	}

	/* ─── Select dropdown ────────────────────────────── */
	.stg-sel {
		appearance: none;
		font-weight: 400;
		font-size: 13px;
		line-height: 1;
		padding: 5px 24px 5px 8px;
		border-radius: 6px;
		border: 1px solid var(--dt-border, rgba(148, 160, 180, 0.10));
		background: color-mix(in srgb, var(--dt-text-3, rgba(148, 160, 180, 0.40)) 8%, var(--dt-surface, #10141c));
		color: var(--dt-text, rgba(228, 234, 245, 0.88));
		outline: none;
		cursor: pointer;
		background-image: linear-gradient(45deg, transparent 50%, var(--dt-text-3, rgba(148, 160, 180, 0.40)) 50%),
			linear-gradient(135deg, var(--dt-text-3, rgba(148, 160, 180, 0.40)) 50%, transparent 50%);
		background-position: calc(100% - 12px) center, calc(100% - 8px) center;
		background-size: 4px 4px, 4px 4px;
		background-repeat: no-repeat;
		transition: border-color 120ms;
	}
	.stg-sel:hover {
		border-color: var(--dt-border-day, rgba(148, 160, 180, 0.14));
	}
	.stg-sel:focus {
		border-color: color-mix(in srgb, var(--dt-accent, #6366f1) 45%, transparent);
	}
	.stg-sel option {
		background: var(--dt-bg, #0b0e14);
		color: var(--dt-text, rgba(228, 234, 245, 0.88));
	}

	/* ─── Segment pills ──────────────────────────────── */
	.stg-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.stg-pill {
		padding: 4px 9px;
		border-radius: 100px;
		border: 1px solid color-mix(in srgb, var(--dt-border, rgba(148, 160, 180, 0.10)) 60%, transparent);
		background: color-mix(in srgb, var(--dt-text-3, rgba(148, 160, 180, 0.40)) 8%, transparent);
		color: var(--dt-text-2, rgba(148, 160, 180, 0.62));
		font-weight: 400;
		font-size: 12px;
		line-height: 1;
		cursor: pointer;
		transition: border-color 120ms, color 120ms, background 120ms;
	}
	.stg-pill:hover {
		color: var(--dt-text, rgba(228, 234, 245, 0.88));
		border-color: var(--dt-border, rgba(148, 160, 180, 0.10));
	}
	.stg-pill--on {
		color: var(--dt-accent, #6366f1);
		border-color: color-mix(in srgb, var(--dt-accent, #6366f1) 35%, transparent);
		background: var(--dt-accent-dim, rgba(99, 102, 241, 0.12));
	}

	/* ─── Focus rings ────────────────────────────────── */
	.stg-sr:focus-visible + .stg-sw,
	.stg-sel:focus-visible,
	.stg-rng:focus-visible,
	.stg-pill:focus-visible,
	.stg-hd:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--dt-accent, #6366f1) 55%, transparent);
		outline-offset: 2px;
	}

	/* ─── Responsive: stack columns on small screens ── */
	@media (max-width: 600px) {
		.stg-grid {
			grid-template-columns: 1fr;
		}
		.stg-bar {
			flex-direction: column;
			gap: 6px;
		}
	}
</style>
