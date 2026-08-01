<script lang="ts">
	import PlannerWeek from './PlannerWeek.svelte';

	interface Props {
		mode?: 'day' | 'week';
		[key: string]: unknown;
	}

	let { mode = 'week', ...rest }: Props = $props();
</script>

<!-- Both planner modes are the same vertical time grid; day is one column. -->
<PlannerWeek {mode} {...rest} />
