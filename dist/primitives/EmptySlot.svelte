<!--
  EmptySlot — clickable empty time slot for "click to create" interactions.

  Renders a transparent hit-target that highlights on hover and emits
  the time range when clicked. View components place these in gaps
  between events.
-->
<script lang="ts">
	interface Props {
		/** Start time of the empty slot */
		start: Date;
		/** End time of the empty slot */
		end: Date;
		/** Click handler — create event in this range */
		onclick?: (range: { start: Date; end: Date }) => void;
		/** Orientation for cursor hint */
		orientation?: 'horizontal' | 'vertical';
	}

	let {
		start,
		end,
		onclick,
		orientation = 'vertical',
	}: Props = $props();

	function fmtTime(d: Date): string {
		const h = d.getHours();
		const m = d.getMinutes();
		const suffix = h >= 12 ? 'p' : 'a';
		const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
		return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, '0')}${suffix}`;
	}

	const dur = $derived(() => {
		const mins = Math.round((end.getTime() - start.getTime()) / 60_000);
		if (mins < 60) return `${mins}m free`;
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return m > 0 ? `${h}h ${m}m free` : `${h}h free`;
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onclick?.({ start, end });
		}
	}
</script>

<div
	class="es"
	class:es-v={orientation === 'vertical'}
	class:es-h={orientation === 'horizontal'}
	role="button"
	tabindex="0"
	aria-label="Create event, {fmtTime(start)} to {fmtTime(end)}, {dur()}"
	onclick={() => onclick?.({ start, end })}
	onkeydown={handleKeydown}
>
	<div class="es-hint" aria-hidden="true">
		<span class="es-plus">+</span>
		<span class="es-range">{fmtTime(start)} – {fmtTime(end)}</span>
	</div>
</div>

<style>
	.es {
		position: relative;
		cursor: pointer;
		border: 1px dashed transparent;
		border-radius: 6px;
		transition: border-color 150ms, background 150ms;
		min-height: 24px;
	}
	.es:hover {
		border-color: var(--dt-accent-dim, rgba(239, 68, 68, 0.18));
		background: var(--dt-accent-dim, rgba(239, 68, 68, 0.05));
	}
	.es:focus-visible {
		outline: 2px solid var(--dt-accent, #ef4444);
		outline-offset: 2px;
		border-color: var(--dt-accent-dim, rgba(239, 68, 68, 0.18));
	}

	.es-hint {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		opacity: 0;
		transition: opacity 150ms;
	}
	.es:hover .es-hint {
		opacity: 1;
	}

	.es-plus {
		font: 500 14px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-accent, #ef4444);
	}
	.es-range {
		font: 400 10px / 1 var(--dt-mono, 'SF Mono', monospace);
		color: var(--dt-text-2, rgba(148, 163, 184, 0.55));
	}

	.es-v {
		width: 100%;
	}
	.es-h {
		height: 100%;
	}
</style>
