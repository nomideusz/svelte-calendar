declare global {
    /**
     * The widget's bundled CSS, assigned at the top of widget.js by the
     * inlineCss build plugin (vite.config.widget.ts). Undefined when this
     * module is consumed through the normal library path (dev, SvelteKit),
     * where styles ship through the regular Svelte CSS pipeline instead.
     */
    var __DAY_CALENDAR_CSS__: string | undefined;
}
export {};
