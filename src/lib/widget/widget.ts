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
import { asClassComponent } from 'svelte/legacy';
import CalendarWidget from './CalendarWidget.svelte';

declare global {
	/**
	 * The widget's bundled CSS, assigned at the top of widget.js by the
	 * inlineCss build plugin (vite.config.widget.ts). Undefined when this
	 * module is consumed through the normal library path (dev, SvelteKit),
	 * where styles ship through the regular Svelte CSS pipeline instead.
	 */
	// A `var` declaration is required for `globalThis` typing.
	var __DAY_CALENDAR_CSS__: string | undefined;
}

const CalendarWidgetClass = asClassComponent(CalendarWidget);

/**
 * Shared constructable stylesheet — parsed once, adopted by every
 * <day-calendar> shadow root on the page.
 */
let sharedSheet: CSSStyleSheet | null = null;

/**
 * Add the bundled widget CSS to a shadow root.
 *
 * Prefers `adoptedStyleSheets` (one parse for N widgets); falls back to a
 * <style> element where constructable stylesheets are unavailable. No-op
 * when the CSS global is undefined (dev / library usage).
 */
function injectStyles(root: ShadowRoot): void {
	const css = globalThis.__DAY_CALENDAR_CSS__;
	if (!css) return;

	if ('adoptedStyleSheets' in root && typeof CSSStyleSheet !== 'undefined') {
		try {
			if (!sharedSheet) {
				sharedSheet = new CSSStyleSheet();
				sharedSheet.replaceSync(css);
			}
			root.adoptedStyleSheets = [...root.adoptedStyleSheets, sharedSheet];
			return;
		} catch {
			// Constructable stylesheets unsupported (older engines) — fall through.
		}
	}

	const style = document.createElement('style');
	style.setAttribute('data-day-calendar', '');
	style.textContent = css;
	root.appendChild(style);
}

type WidgetProps = {
	api?: string;
	events?: string;
	theme?: string;
	view?: string;
	height?: string;
	locale?: string;
	dir?: string;
	mondaystart?: string;
	headers?: string;
	readonly?: string;
	pills?: string;
	nav?: string;
	mobile?: string;
	days?: string;
	compact?: string;
	timezone?: string;
};

const WIDGET_ATTRS = [
	'api', 'events', 'theme', 'view', 'height', 'locale', 'dir', 'mondaystart',
	'headers', 'readonly', 'pills', 'nav', 'mobile', 'days', 'compact', 'timezone',
] as const;

type WidgetInstance = {
	$set: (props: Partial<WidgetProps>) => void;
	$destroy: () => void;
};

class DayCalendarElement extends HTMLElement {
	private instance: WidgetInstance | null = null;
	private stylesInjected = false;

	static get observedAttributes(): string[] {
		return [...WIDGET_ATTRS];
	}

	connectedCallback(): void {
		if (this.instance) return;
		// The shadow root survives disconnect/reconnect — attach only once.
		const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
		if (!this.stylesInjected) {
			injectStyles(root);
			this.stylesInjected = true;
		}
		this.instance = new CalendarWidgetClass({
			target: root,
			props: this.readProps(),
		}) as unknown as WidgetInstance;
	}

	disconnectedCallback(): void {
		this.instance?.$destroy();
		this.instance = null;
	}

	attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
		if (!this.instance) return;
		this.instance.$set({
			[name]: newValue ?? undefined,
		} as Partial<WidgetProps>);
	}

	private readProps(): WidgetProps {
		const props: WidgetProps = {};
		for (const attr of WIDGET_ATTRS) {
			const value = this.getAttribute(attr);
			if (value !== null) props[attr] = value;
		}
		return props;
	}
}

if (!customElements.get('day-calendar')) {
	customElements.define('day-calendar', DayCalendarElement);
}
