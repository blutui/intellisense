# Change Log

## [0.2.0]

- Replaced the syntax grammar with the current Canvas TextMate grammar (adds `.canvas` file support, and correct highlighting for Canvas-specific filters/functions/tags like `image_url`, `canopy`, `reading_time`, etc.)
- Rewrote function, filter, and tag snippets to match the current Canvas language (added `agent`, `attribute`, `canopy.blocks`/`canopy.render`/`canopy.head`/`canopy.scripts`, `recaptcha`, `honeypot_field`, `image_url`, `image_tag`, `group_by`, `reading_time`, and more)
- Added a `{% canopy %}` block-template snippet and a `tests.code-snippets` file for Canvas tests (`is defined`, `is empty`, `is even`, etc.)
- Added JSON highlighting inside `{% canopy config %}...{% endcanopy %}` blocks, and scoped `canopy`/`endcanopy` as keywords
- Renamed the `{%`/`%}`/`{{`/`}}` delimiter scopes from `punctuation.section.tag.canvas` to the conventional `punctuation.definition.tag.begin/end.canvas` (matching how HTML's own tag brackets are scoped), since most color themes have no rule for `punctuation.section.tag` and were rendering those delimiters as plain text
- Marked legacy Canopy element functions (`cms_button`, `cms_text`, etc.) and the `sort_by` filter as deprecated in their snippet descriptions, in favor of Canopy Blocks and `sort`
- Removed the `entry.`/`item.`/`form.` field autocomplete and its `courier.json`-token-based Admin API integration — it relied on an unofficial `token` field the Courier CLI no longer writes to `courier.json`
- Removed `src/extension.ts` and the whole build/lint/test toolchain it existed for (webpack, ts-loader, TypeScript, ESLint, Prettier, Mocha/`@vscode/test-electron`, and every related dependency). The extension is now purely declarative — a TextMate grammar and snippet files, contributed directly from `package.json` — so there's nothing to compile, lint, or bundle, and no `node_modules`/lockfile at all
- Fixed `.vscodeignore`, which excluded `src/**` and would have shipped a broken package missing every grammar/snippet file once `dist/` (the old build output) stopped being produced; verified with `vsce package` that the `.vsix` now actually includes `src/snippets/**`, `src/syntaxes/**`, and `language-configuration.json`
- Removed the now-unused `main`/`activationEvents`/`contributes.commands` from `package.json`, deleted `.vscode/tasks.json` (no more build task), and simplified `.vscode/launch.json`, `settings.json`, and `extensions.json` to match (no more TS/ESLint/Prettier tooling recommendations)

## [0.1.0]

- Initial release
