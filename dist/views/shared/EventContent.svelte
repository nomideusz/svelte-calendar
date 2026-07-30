<!--
	EventContent — renders the host's `event` snippet when provided, else the
	view's default markup (passed as children). Views keep their interactive
	shell (click/keyboard/selection/drag); only the content is swappable.
-->
<script lang="ts">import { useCalendarContext } from "./context.svelte.js";
let { event, children } = $props();
const ctx = useCalendarContext();
const eventSnippet = $derived(ctx.eventSnippet);
</script>

{#if eventSnippet}
	{@render eventSnippet(event)}
{:else}
	{@render children()}
{/if}
