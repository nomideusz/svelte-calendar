/**
 * Tests for the smart auto-theme probe.
 *
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { probeHostTheme, observeHostTheme } from './auto.js';
describe('probeHostTheme', () => {
    it('returns a string containing --dt-bg', () => {
        const el = document.createElement('div');
        document.body.appendChild(el);
        // Body has white background by default in happy-dom
        const css = probeHostTheme(el);
        expect(css).toContain('--dt-bg');
        expect(css).toContain('--dt-text');
        expect(css).toContain('--dt-accent');
        expect(css).toContain('--dt-sans');
        expect(css).toContain('--dt-mono');
        document.body.removeChild(el);
    });
    it('respects mode override', () => {
        const el = document.createElement('div');
        document.body.appendChild(el);
        const dark = probeHostTheme(el, { mode: 'dark' });
        // Dark accent fallback is red (#ef4444), light is blue (#2563eb)
        expect(dark).toContain('--dt-accent');
        const light = probeHostTheme(el, { mode: 'light' });
        expect(light).toContain('--dt-accent');
        expect(light).not.toBe(dark);
        document.body.removeChild(el);
    });
    it('uses custom accent when provided', () => {
        const el = document.createElement('div');
        document.body.appendChild(el);
        const css = probeHostTheme(el, { accent: '#10b981' });
        // The accent should influence --dt-accent (though exact value may differ
        // due to lightness adjustment)
        expect(css).toContain('--dt-accent: #');
        document.body.removeChild(el);
    });
    it('probes the host page across a shadow boundary', () => {
        const host = document.createElement('div');
        host.style.backgroundColor = 'rgb(20, 20, 30)';
        document.body.appendChild(host);
        const shadow = host.attachShadow({ mode: 'open' });
        const el = document.createElement('div');
        shadow.appendChild(el);
        // The dark inline background lives on the shadow host — only reachable
        // by hopping from the shadow root to its host element.
        const css = probeHostTheme(el);
        expect(css).toContain('--dt-stage-bg: #14141e');
        document.body.removeChild(host);
    });
    it('uses custom font when provided', () => {
        const el = document.createElement('div');
        document.body.appendChild(el);
        const css = probeHostTheme(el, { font: '"Poppins", sans-serif' });
        expect(css).toContain('--dt-sans: "Poppins", sans-serif');
        document.body.removeChild(el);
    });
    it('adopts the host font as --dt-sans', () => {
        const wrap = document.createElement('div');
        wrap.style.fontFamily = 'Georgia, serif';
        const el = document.createElement('div');
        wrap.appendChild(el);
        document.body.appendChild(wrap);
        const css = probeHostTheme(el);
        expect(css).toContain('--dt-sans: Georgia, serif');
        document.body.removeChild(wrap);
    });
    it('adopts a host --font-mono variable as --dt-mono', () => {
        document.documentElement.style.setProperty('--font-mono', '"JetBrains Mono", monospace');
        const el = document.createElement('div');
        document.body.appendChild(el);
        const css = probeHostTheme(el);
        expect(css).toContain('--dt-mono: "JetBrains Mono", monospace');
        document.body.removeChild(el);
        document.documentElement.style.removeProperty('--font-mono');
    });
});
describe('observeHostTheme', () => {
    it('returns a cleanup function', () => {
        const el = document.createElement('div');
        document.body.appendChild(el);
        let called = false;
        const cleanup = observeHostTheme(el, () => { called = true; });
        expect(typeof cleanup).toBe('function');
        // Should have been called immediately with initial probe
        expect(called).toBe(true);
        cleanup();
        document.body.removeChild(el);
    });
});
