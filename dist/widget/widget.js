/**
 * Widget entry point — registers <day-calendar> as a custom element.
 *
 * This file is the entry point for the standalone widget bundle (widget.js).
 * Import it via a <script> tag on any HTML page.
 *
 * The component mounts into an open shadow root so host-page CSS (resets,
 * theme stylesheets) cannot bleed into the calendar and calendar styles
 * cannot leak out. The bundled CSS is injected into each shadow root — see
 * `injectStyles` below and the inlineCss plugin in vite.config.widget.ts.
 */
import { mount, unmount } from 'svelte';
import { createSubscriber } from 'svelte/reactivity';
import CalendarWidget from './CalendarWidget.svelte';
/**
 * Shared constructable stylesheet — parsed once, adopted by every
 * <day-calendar> shadow root on the page.
 */
let sharedSheet = null;
/**
 * Add the bundled widget CSS to a shadow root.
 *
 * Prefers `adoptedStyleSheets` (one parse for N widgets); falls back to a
 * <style> element where constructable stylesheets are unavailable. No-op
 * when the CSS global is undefined (dev / library usage).
 */
function injectStyles(root) {
    const css = globalThis.__DAY_CALENDAR_CSS__;
    if (!css)
        return;
    if ('adoptedStyleSheets' in root && typeof CSSStyleSheet !== 'undefined') {
        try {
            if (!sharedSheet) {
                sharedSheet = new CSSStyleSheet();
                sharedSheet.replaceSync(css);
            }
            root.adoptedStyleSheets = [...root.adoptedStyleSheets, sharedSheet];
            return;
        }
        catch {
            // Constructable stylesheets unsupported (older engines) — fall through.
        }
    }
    const style = document.createElement('style');
    style.setAttribute('data-day-calendar', '');
    style.textContent = css;
    root.appendChild(style);
}
const WIDGET_ATTRS = [
    'api', 'events', 'theme', 'view', 'height', 'locale', 'dir', 'mondaystart',
    'headers', 'readonly', 'pills', 'nav', 'mobile', 'days', 'compact', 'timezone',
];
/**
 * Attribute values as reactive props for `mount()`. A plain .ts module has
 * no `$state`, so each getter reports a read through its own
 * `createSubscriber` and `set()` invalidates that attribute's readers only —
 * the component re-renders what changed without a remount (view, focus date
 * and loaded events survive; changing `view` does not rebuild the adapter).
 */
function createReactiveProps(initial) {
    const values = { ...initial };
    const invalidators = new Map();
    const props = {};
    for (const attr of WIDGET_ATTRS) {
        const track = createSubscriber((update) => {
            invalidators.set(attr, update);
            return () => invalidators.delete(attr);
        });
        Object.defineProperty(props, attr, {
            enumerable: true,
            get() {
                track();
                return values[attr];
            },
        });
    }
    return {
        props,
        set(name, value) {
            if (values[name] === value)
                return;
            values[name] = value;
            invalidators.get(name)?.();
        },
    };
}
function isWidgetAttr(name) {
    return WIDGET_ATTRS.includes(name);
}
class DayCalendarElement extends HTMLElement {
    instance = null;
    stylesInjected = false;
    static get observedAttributes() {
        return [...WIDGET_ATTRS];
    }
    connectedCallback() {
        if (this.instance)
            return;
        // The shadow root survives disconnect/reconnect — attach only once.
        const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
        if (!this.stylesInjected) {
            injectStyles(root);
            this.stylesInjected = true;
        }
        const attrs = createReactiveProps(this.readProps());
        const component = mount(CalendarWidget, { target: root, props: attrs.props });
        this.instance = { component, attrs };
    }
    disconnectedCallback() {
        if (this.instance)
            void unmount(this.instance.component);
        this.instance = null;
    }
    attributeChangedCallback(name, _oldValue, newValue) {
        if (!this.instance || !isWidgetAttr(name))
            return;
        this.instance.attrs.set(name, newValue ?? undefined);
    }
    readProps() {
        const props = {};
        for (const attr of WIDGET_ATTRS) {
            const value = this.getAttribute(attr);
            if (value !== null)
                props[attr] = value;
        }
        return props;
    }
}
if (!customElements.get('day-calendar')) {
    customElements.define('day-calendar', DayCalendarElement);
}
