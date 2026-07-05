# Contributing

Thanks for your interest in improving `@nomideusz/svelte-calendar`!

## How this repo works

This repository is synced from a private monorepo, where primary development happens. Issues and pull requests here are very welcome — accepted PRs are applied upstream by the maintainer and flow back with the next sync, so your commit may land squashed or slightly rearranged (you'll be credited in the changelog).

## Getting started

```bash
pnpm install
pnpm dev          # demo site at localhost:5173
pnpm check        # svelte-check (types)
pnpm test         # vitest
pnpm run package  # build the library into dist/
```

Requires Node >= 20 and pnpm.

## Guidelines

- **Bugs**: open an issue with a minimal reproduction (a REPL link or a short adapter + props snippet is perfect).
- **Features**: open an issue first so we can agree on the API before you invest time.
- **PRs**: keep them focused; include a test when the change has testable logic; run `pnpm check` and `pnpm test` before submitting; add a line to `CHANGELOG.md` under an "Unreleased" heading.
- **Styling**: components must only use `--dt-*` design tokens (with neutral light fallbacks) — no hardcoded brand colors.
- **Types**: `TimelineEvent`, `CalendarAdapter`, and `DateRange` are stable public contracts — flag any change to them explicitly in your PR description.

## Code of Conduct

By participating you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).
