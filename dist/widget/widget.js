/**
 * Widget entry point — registers <day-calendar> as a custom element.
 *
 * This file is the entry point for the standalone widget bundle (widget.js).
 * Import it via a <script> tag on any HTML page.
 */
import './CalendarWidget.svelte';
// The Svelte custom element is auto-registered via <svelte:options customElement="day-calendar" />
// Nothing else needed — the component self-registers when this module is loaded.
