# Repository Guidelines

## Project Structure

`app.js`, `app.json`, and `app.wxss` define the app shell. `pages/feed/` contains the learning screen; `pages/sources/` contains attribution. `lib/feed.js` builds cards, `content/` holds sample questions and glosses, and `test/` holds Node tests. Requirements and editorial checks are in root Markdown files and `content/EDITORIAL_REVIEW.md`.

## Task Isolation

Use one task, one `feature/<name>`, `fix/<name>`, `refactor/<name>`, or `experiment/<name>` branch, one isolated worktree, one Codex thread, and one pull request. Start from `main`; create a new worktree and branch before editing. Do not reuse worktrees or edit outside them. Read this file before coding. Treat `main` as the stable integration target: never edit, commit, or merge into it directly.

## Development and Validation

- `npm test` runs all automated tests with `node:test`; no package install is needed.
- Import the directory in WeChat Developer Tools and select **Compile** for the Mini Program build and simulator checks.

No `build`, `lint`, integration, or E2E script exists; report only checks run. For UI changes, check swipes, feedback, source navigation, and restored progress in the simulator. Add `test/*.test.js` cases for changed card, storage, or content rules. Content must retain four distinct options, one target word per example, and complete glossary coverage; run `validateContent()` through the tests and review wording and attribution manually. A failed check blocks completion.

## Coding Style

Follow nearby JavaScript: two-space indentation, single quotes, no semicolons, `camelCase` names, and `UPPER_SNAKE_CASE` constants. Shared modules use CommonJS. Keep each page's `.js`, `.json`, `.wxml`, and `.wxss` names aligned. No formatter or linter is configured.

## Commits and Pull Requests

Commit one logical change after validation, using `<type>: <description>` with `feat`, `fix`, `refactor`, `test`, `docs`, or `chore`; for example, `docs: define task workflow`. Push the task branch and open a PR to `main`. Include **Summary**, **Testing**, and **Risk** sections, link relevant issues, and attach screenshots for visible UI changes. Mention changes to storage keys, content version, privacy, or attribution. Do not merge while CI fails.

For coordinated releases, merge task branches into `integration/<name>` through PRs, validate each merge, then open an integration PR to `main`. Require passing checks and review before merging. Configure GitHub branch protection for `main` when the remote baseline exists; this document alone does not enforce protection.

## Configuration and Release

Keep `project.private.config.json`, personal AppIDs, and local settings out of commits. The prototype stores progress and recent events on device; review privacy text and the editorial checklist before public release.
