# Change Log

## [0.2.0]

- Replaced the syntax grammar with the current Canvas TextMate grammar (adds `.canvas` file support, and correct highlighting for Canvas-specific filters/functions/tags like `image_url`, `canopy`, `reading_time`, etc.)
- Rewrote function, filter, and tag snippets to match the current Canvas language (added `agent`, `attribute`, `canopy.blocks`/`canopy.render`/`canopy.head`/`canopy.scripts`, `recaptcha`, `honeypot_field`, `image_url`, `image_tag`, `group_by`, `reading_time`, and more)
- Added a `{% canopy %}` block-template snippet and a `tests.code-snippets` file for Canvas tests (`is defined`, `is empty`, `is even`, etc.)
- Marked legacy Canopy element functions (`cms_button`, `cms_text`, etc.) and the `sort_by` filter as deprecated in their snippet descriptions, in favor of Canopy Blocks and `sort`
- Fixed the collection/form autocomplete API integration for the current Admin API (`/admin/api/...` endpoints, `Bearer` auth, paginated `{ data: [...] }` responses) and the current `courier.json` shape (`handle`/`site`/`cassette`, no `token`)
- Fixed a broken ESLint config (`prettier/@typescript-eslint` no longer exists in eslint-config-prettier 8+)
- Updated all dependencies to their current stable releases (TypeScript 6, ESLint 10 with flat config, webpack 5.108, ts-loader 9, prettier 3, mocha 11, etc.); bumped `engines.vscode` to `^1.85.0` and `@types/vscode` to match
- Migrated off the deprecated `vscode-test` package to `@vscode/test-electron`, and modernized the test runner's `glob`/`mocha` usage for their current async APIs
- Dropped the `node-fetch`, `bent`, and `vscode-uri` runtime dependencies — `node-fetch`'s latest release pulled in `whatwg-url` and quadrupled the bundle size, `bent` and `vscode-uri` were unused; the extension now uses the Node 18+ global `fetch` already available in VS Code's extension host, shrinking the packaged bundle from ~21 KB to ~4 KB
- Pinned `typescript` to the 6.x line rather than the new TypeScript 7 (native/Go port), since `@typescript-eslint` doesn't support it yet
- Updated `glob` to v13 and its own shipped types (dropping `@types/glob`), rewriting the test runner's file discovery to the current async `glob()` API
- Added an `overrides` entry pinning the transitive `loader-utils` peer dependency to `^3.3.1` to clear a critical prototype-pollution advisory pulled in by `ts-loader`

## [0.1.0]

- Initial release
