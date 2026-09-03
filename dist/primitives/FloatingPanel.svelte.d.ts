import type { Snippet } from 'svelte';
type Anchor = {
    x: number;
    y: number;
    width?: number;
    height?: number;
};
type $$ComponentProps = {
    title?: string;
    /** What to open beside: the clicked block's viewport rect, or a bare point. */
    anchor?: Anchor;
    width?: number;
    /** The same `--dt-*` theme string a Calendar takes. */
    theme?: string;
    closeLabel?: string;
    /** A pointerdown outside closes the panel and goes no further. */
    closeOnOutside?: boolean;
    onclose?: () => void;
    children: Snippet;
};
declare const FloatingPanel: import("svelte").Component<$$ComponentProps, {}, "">;
type FloatingPanel = ReturnType<typeof FloatingPanel>;
export default FloatingPanel;
