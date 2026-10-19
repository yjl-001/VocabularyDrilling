# Repository Guidelines

## Project Structure

`app.*` defines the app shell; `pages/feed/` and `pages/sources/` contain the screens. `lib/feed.js` builds cards, `content/` holds questions and glosses, and `test/` holds Node tests.

## Task Isolation

Use one branch, worktree, Codex thread, and pull request per task. Branch from `main` with a `feature/`, `fix/`, `refactor/`, or `experiment/` prefix. Read this file before editing; keep changes inside the task worktree. Never edit or commit directly on `main`.

## Worktree Cleanup

Keep worktrees while PRs or review fixes are pending. After merge or explicit abandonment, confirm changes are preserved, review is complete, and no follow-up remains. Then remove the checkout to save disk space: archive Codex-managed worktrees or use `git worktree remove` for plain Git worktrees. Check dirty and ignored files first; decide branch deletion separately.

## Development and Validation

- `npm test` runs all automated tests with `node:test`; no package install is needed.
- Import the directory in WeChat Developer Tools and select **Compile** for the Mini Program build and simulator checks.

Only `npm test` is automated here. For UI changes, check swipes, feedback, navigation, and resume in the simulator. Add `test/*.test.js` cases for changed behavior. Content needs four distinct options, one target word per example, and glossary coverage; the tests call `validateContent()`. Review wording and attribution manually. Failed checks block completion.

## Coding Style

Follow nearby JavaScript: two-space indentation, single quotes, no semicolons, `camelCase` names, and `UPPER_SNAKE_CASE` constants. Keep each page's `.js`, `.json`, `.wxml`, and `.wxss` names aligned. No formatter or linter is configured.

## Commits and Pull Requests

Commit one logical change after validation, using `<type>: <description>` with `feat`, `fix`, `refactor`, `test`, `docs`, or `chore`; for example, `docs: define task workflow`. Push the task branch and open a PR to `main`. Include **Summary**, **Testing**, and **Risk** sections, link relevant issues, and attach screenshots for visible UI changes. Mention changes to storage keys, content version, privacy, or attribution. Do not merge while CI fails.

For coordinated releases, merge task branches into `integration/<name>` through PRs, validate each merge, then open an integration PR to `main`. Require passing checks and review before merging. Configure GitHub branch protection for `main` when the remote baseline exists; this document alone does not enforce protection.

## Configuration and Release

Keep `project.private.config.json`, personal AppIDs, and local settings out of commits. The prototype stores progress and recent events on device; review privacy text and the editorial checklist before public release.
