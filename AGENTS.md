# Repository Guidelines

## Project Structure & Module Organization

This repository is a native WeChat Mini Program. `app.js`, `app.json`, and `app.wxss` define the app shell. Each route lives under `pages/` with matching `.js`, `.json`, `.wxml`, and `.wxss` files; `pages/feed/` is the learning flow and `pages/sources/` shows content attribution. `lib/feed.js` builds and validates cards. `content/deck.js` holds sample questions, `content/glossary.js` holds tap-to-define text, and `content/SOURCES.md` records source checks. Tests are in `test/`. Product and editorial notes live in the root Markdown files and `content/EDITORIAL_REVIEW.md`.

## Build, Test, and Development Commands

- `npm test` (or `node --test`) runs all automated tests; no package install is required.
- Import this directory into WeChat Developer Tools and select **Compile** to run the Mini Program locally. Use a personal AppID for upload or release; the checked-in configuration is for local testing.

There is no separate build script or backend. Check UI changes in the simulator, including card swipes, answer feedback, source navigation, and progress after reopening.

## Coding Style & Naming Conventions

Follow the existing JavaScript style: two-space indentation, single quotes, no semicolons, and `camelCase` for variables and functions. Use `UPPER_SNAKE_CASE` for constants such as storage keys. Keep page files named after their route (`feed.js`, `feed.wxml`, and so on). Use CommonJS `require` and `module.exports` in shared logic. No formatter or linter is configured; keep changes consistent with nearby code.

## Testing Guidelines

Tests use `node:test` and `node:assert/strict`; name files `*.test.js` under `test/`. Add focused tests for card ordering, answer restoration, storage behavior, or content validation when changing those rules. Run `npm test` before submitting. Content edits must preserve four distinct options, one target word per example, and glossary coverage; `validateContent()` checks these constraints. Also review wording and source attribution manually.

## Commits & Pull Requests

This checkout contains no Git history, so no established commit format can be verified. Use short, imperative subjects that describe the change, such as `Add glossary coverage for new cards`. In pull requests, summarize behavior and content changes, report test and simulator results, link relevant issues, and include screenshots for visible UI changes. Note any changes to local storage keys, content version, or attribution.

## Configuration & Release

Keep personal AppIDs and local settings out of shared commits. The prototype stores progress and recent events on device; review privacy text and the editorial checklist before public release.
