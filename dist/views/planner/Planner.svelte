<script lang="ts">import PlannerWeek from "./PlannerWeek.svelte";
let { mode = "week", ...rest } = $props();
</script>

<!-- Both planner modes are the same vertical time grid; day is one column. -->
<PlannerWeek {mode} {...rest} />
