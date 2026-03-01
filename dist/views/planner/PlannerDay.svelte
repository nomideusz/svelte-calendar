<script lang="ts">
	import PlannerDayVertical from './_internal/PlannerDayVertical.svelte';
	import PlannerDayHorizontal from './_internal/PlannerDayHorizontal.svelte';

	type PlannerDayLayout = 'vertical' | 'horizontal';

	interface Props {
		layout?: PlannerDayLayout;
		[key: string]: unknown;
	}

	let { layout = 'vertical', ...rest }: Props = $props();
</script>

{#if layout === 'horizontal'}
	<PlannerDayHorizontal {...rest} />
{:else}
	<PlannerDayVertical {...rest} />
{/if}
