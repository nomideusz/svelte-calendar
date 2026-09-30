import type { Snippet } from 'svelte';
/** What a FloatingPanel opens beside: a viewport rect (a clicked block's `getBoundingClientRect()`), or a bare point. */
export type FloatingPanelAnchor = {
    x: number;
    y: number;
    width?: number;
    height?: number;
};
export interface FloatingPanelProps {
    title?: string;
    /** What to open beside: the clicked block's viewport rect, or a bare point. */
    anchor?: FloatingPanelAnchor;
    /** Panel width in px (default 440). Below 640px viewport width it is a bottom sheet. */
    width?: number;
    /** The same `--dt-*` theme string a Calendar takes. */
    theme?: string;
    closeLabel?: string;
    /** A pointerdown outside closes the panel and goes no further. */
    closeOnOutside?: boolean;
    onclose?: () => void;
    children: Snippet;
}
declare const FloatingPanel: import("svelte").Component<FloatingPanelProps, {}, "">;
type FloatingPanel = ReturnType<typeof FloatingPanel>;
export default FloatingPanel;
