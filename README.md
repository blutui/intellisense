# Blutui Intellisense

Blutui IntelliSense enhances the Blutui development experience.
This is by providing Visual Studio Code users with advanced features like, autocomplete, syntax highlighting and snippets for Blutui's **Canvas** templating language.

# Features

## Syntax highlighting

Syntax highlighting for `.html` and `.canvas` view files, covering Canvas tags, filters, functions, tests, strings, and embedded CSS/JS/SCSS.

![Syntax highlighting](https://cdn.blutui.com/uploads/assets/Intellisense/syntax-highlighting.png 'Syntax highlighting')

## Autocomplete

This is a system that uses your courier.json file to access the project you are working on and get the variable while you are editing.
To use this make sure the collection variable is entry the just type `entry.` in vscode and get all the handles that you created.

Because the Courier CLI keeps your access token in your OS keychain rather than in `courier.json`, this extension can't read it automatically. To enable `entry.` / `item.` / `form.` field autocomplete locally, add a `token` field with a [Courier access token](https://dev.blutui.com/docs/courier/installation/create-courier-token) to your project's `courier.json` and keep that file out of version control:

```json
{
  "handle": "your-project-handle",
  "cassette": "default",
  "token": "your-access-token"
}
```

![Autocomplete](https://cdn.blutui.com/uploads/assets/Intellisense/varible-getting.png 'Autocomplete')

## Snippets

This gives access to the main tags, functions, filters, and tests of Canvas, Blutui's templating language, including Canopy Blocks. This allows users quick and easy writing with autocomplete of snippets.

![Snippets](https://cdn.blutui.com/uploads/assets/Intellisense/autocomplete.png 'Snippets')

# Running locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the extension

   ```bash
   npm run compile
   ```

3. Open this folder in VS Code and press `F5` (or **Run and Debug → Run Extension**). This launches an Extension Development Host window with the extension loaded.

4. In that new window, open a Blutui project (a folder containing `.html`/`.canvas` views and, optionally, a `courier.json`) and open one of its view files to see syntax highlighting and snippets.

Use `npm watch` while developing to rebuild on save; reload the Extension Development Host window (`Cmd+R` / `Ctrl+R`) to pick up changes.

Requires Node 20+ (matches the `eslint`/`webpack-cli` toolchain).
