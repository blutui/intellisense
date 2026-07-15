# Contributing

# Running locally

This extension is purely declarative (a TextMate grammar and snippet files) — there's no code to install or build.

1. Open this folder in VS Code and press `F5` (or **Run and Debug → Run Extension**). This launches an Extension Development Host window with the extension loaded directly from source.

2. In that new window, open a Blutui project (a folder containing `.html`/`.canvas` views) and open one of its view files to see syntax highlighting and snippets.

3. Edit a file under `src/snippets/` or `src/syntaxes/`, then reload the Extension Development Host window (`Cmd+R` / `Ctrl+R`) to pick up the change — no rebuild step needed.

If a token like `{%` doesn't look highlighted, put your cursor on it and run **Developer: Inspect Editor Tokens and Scopes** (`Cmd+Shift+P`) to see which TextMate scopes it resolved to and whether your color theme has a rule for them — that tells you whether it's a grammar bug or just a theme with no matching color rule.
