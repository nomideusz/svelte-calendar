# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.7.x   | ✅        |
| < 0.7   | ❌        |

Only the latest minor release receives security fixes.

## Reporting a Vulnerability

Please **do not** open a public issue for security problems.

- Preferred: use GitHub's [private vulnerability reporting](https://github.com/nomideusz/svelte-calendar/security/advisories/new) on this repository.
- Alternatively, email **b.dymet@gmail.com** with a description and reproduction steps.

You can expect an acknowledgement within a few days. Once a fix is released, the vulnerability will be disclosed in the changelog. Please give us a reasonable window to ship a fix before public disclosure.

## Scope notes

This is a client-side UI library. Reports most likely to qualify: XSS via event data rendering (titles, subtitles, locations, tags), the embeddable widget's handling of `api` / `events` / `headers` attributes, and the REST/JMAP adapters' request construction.
