# Repository Guidelines

## Project Structure & Product Docs

This is a native WeChat Mini Program. `app.js`, `app.json`, and `app.wxss` define its shell; each route in `pages/` has matching `.js`, `.json`, `.wxml`, and `.wxss` files. `pages/feed/` is the learning flow, `pages/sources/` shows attribution, and `lib/feed.js` contains card logic. Sample questions and tap-to-define text live in `content/`, alongside source and editorial review records. `test/` holds unit, integration, and E2E tests; `scripts/build.js` produces `dist/miniprogram/`.

`docs/PRD/PRD.md` is the single source of truth for product goals, requirements, acceptance criteria, and implementation order. Keep `README.md` focused on the current runnable version and developer setup. Update the PRD when changing product scope or acceptance rules; do not recreate the former root-level product, requirements, or roadmap documents.

## Task Isolation and Worktree Cleanup

Use one branch, isolated worktree, Codex thread, and pull request per task. Branch from `main` with a `feature/`, `fix/`, `refactor/`, or `experiment/` prefix. Read this file before coding; keep edits in the task worktree. Never edit or commit directly on `main`.

Keep worktrees while PRs or review fixes are pending. After merge or explicit abandonment, confirm changes are preserved, review is complete, and no follow-up remains. Then remove the checkout to save disk space: archive Codex-managed worktrees or use `git worktree remove` for plain Git worktrees. Check dirty and ignored files first; decide branch deletion separately.

## Build, Lint, and Tests

Use Node.js 22.13+ or 24+ and run `npm ci`. `npm run lint` checks JavaScript. `npm run build` validates content, page files, JSON, and JS syntax, then creates `dist/miniprogram/`; it does not replace a WeChat Developer Tools compile. `npm test` runs unit tests; `npm run test:integration` checks the built project. Run `npm run check` before committing. For UI changes, compile in Developer Tools and run `npm run test:e2e` with its Service Port enabled.

Tests use `node:test` and `node:assert/strict`. Add focused `test/*.test.js` cases for changed behavior. Content needs four distinct options, one target word per example, and glossary coverage; tests call `validateContent()`. Review wording and attribution manually. Failed checks block completion.

## Coding Style

Use two-space indentation, single quotes, no semicolons, `camelCase` names, and `UPPER_SNAKE_CASE` constants. Keep each page's `.js`, `.json`, `.wxml`, and `.wxss` names aligned. Shared logic uses CommonJS; `eslint.config.js` defines lint rules.

## Commits and Pull Requests

Commit one logical change using `<type>: <description>` with `feat`, `fix`, `refactor`, `test`, `docs`, or `chore`. Push the task branch and open a PR with **Summary**, **Testing**, and **Risk** sections; link issues and attach screenshots for UI changes. Mention storage, content version, privacy, or attribution changes. Do not merge with failed CI.

For coordinated releases, merge task branches into `integration/<name>` through PRs, validate each merge, then open an integration PR to `main`. Require passing checks and review. Configure `main` branch protection when the remote baseline exists.

## Configuration and Release

Keep `project.private.config.json`, personal AppIDs, and local settings out of commits. Review privacy text and the editorial checklist before public release.
