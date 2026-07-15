# Blutui Intellisense

Blutui IntelliSense enhances the Blutui development experience.
This is by providing Visual Studio Code users with advanced features like syntax highlighting and snippets for Blutui's **Canvas** templating language.

# Features

## Syntax highlighting

Syntax highlighting for `.html` and `.canvas` view files, covering Canvas tags, filters, functions, tests, strings, and embedded CSS/JS/SCSS.

## Snippets

This gives access to the main tags, functions, filters, and tests of Canvas, Blutui's templating language, including Canopy Blocks. This allows users quick and easy writing with autocomplete of snippets.

### Tags (`src/snippets/snippets.code-snippets`)

Most tags can be triggered by their bare name, `{% name %}`, or a `!name` shorthand (e.g. `if`, `{% if %}`, or `!if` all expand the same snippet).

| Prefix             | Expands to                                           |
| ------------------ | ---------------------------------------------------- |
| `apply`            | `{% apply %}` block                                  |
| `autoescape`       | `{% autoescape %}` block                             |
| `block`            | `{% block %}` block                                  |
| `canopy`           | Canopy Block template (`config`/`template` sections) |
| `deprecated`       | `{% deprecated '...' %}` notice                      |
| `do`               | `{% do %}` expression                                |
| `embed`            | `{% embed %}` block                                  |
| `extends`          | `{% extends %}`                                      |
| `for`              | `{% for %}` loop                                     |
| `!for-collections` | `{% for %}` loop over a collection, sorted           |
| `form`             | `{% form %}` block                                   |
| `from`             | `{% from %}` macro import                            |
| `if`               | `{% if %}` block                                     |
| `import`           | `{% import %}` macro import                          |
| `include`          | `{% include %}`                                      |
| `macro`            | `{% macro %}` definition                             |
| `set`              | `{% set %}` assignment                               |
| `use`              | `{% use %}` (horizontal reuse)                       |
| `verbatim`         | `{% verbatim %}` block                               |
| `with`             | `{% with %}` block                                   |

### Functions (`src/snippets/functions.code-snippets`)

| Prefix                       | Expands to                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `agent`                      | `agent().is('...')`                                                                 |
| `asset`                      | `asset('...')`                                                                      |
| `attribute`                  | `attribute(object, method)`                                                         |
| `block`                      | `block('...')`                                                                      |
| `canopy.blocks`              | `canopy.blocks('...')` — render a group in its stored order                         |
| `canopy.blocks.seed`         | `canopy.blocks('...', ['...', '...'])` — seed a zone with an explicit template list |
| `canopy.blocks.locked`       | `canopy.blocks('...', ['...'], { locked: true })` — seeded zone, structure locked   |
| `canopy.blocks.shared`       | `canopy.blocks('...', { shared: true })` — group shared across the whole site       |
| `canopy.blocks.limit`        | `canopy.blocks('...', { limit: ... })` — cap the number of blocks a zone accepts    |
| `canopy.render`              | `canopy.render('...')`                                                              |
| `canopy.head`                | `canopy.head('...')`                                                                |
| `canopy.scripts`             | `canopy.scripts('...')`                                                             |
| `cms.blog`                   | `cms.blog('...')`                                                                   |
| `cms.collection`             | `cms.collection('...')`                                                             |
| `cms.form`                   | `cms.form('...')`                                                                   |
| `cms.menu`                   | `cms.menu('...')`                                                                   |
| `constant`                   | `constant('...')`                                                                   |
| `cycle`                      | `cycle([...], position)`                                                            |
| `date`                       | `date('now')`                                                                       |
| `dump`                       | `dump(var)`                                                                         |
| `honeypot_field`             | `honeypot_field()`                                                                  |
| `include`                    | `include('...')`                                                                    |
| `max`                        | `max(...)`                                                                          |
| `min`                        | `min(...)`                                                                          |
| `parent`                     | `parent()`                                                                          |
| `random`                     | `random([...])`                                                                     |
| `range`                      | `{% for %}` over `range(...)`                                                       |
| `recaptcha`                  | `recaptcha()`                                                                       |
| `source`                     | `source('...')`                                                                     |
| `cms_button` _(deprecated)_  | legacy Canopy button element — use Canopy Blocks                                    |
| `cms_code` _(deprecated)_    | legacy Canopy code element — use Canopy Blocks                                      |
| `cms_heading` _(deprecated)_ | legacy Canopy heading element — use Canopy Blocks                                   |
| `cms_image` _(deprecated)_   | legacy Canopy image element — use Canopy Blocks                                     |
| `cms_list` _(deprecated)_    | legacy Canopy list element — use Canopy Blocks                                      |
| `cms_quote` _(deprecated)_   | legacy Canopy quote element — use Canopy Blocks                                     |
| `cms_text` _(deprecated)_    | legacy Canopy text element — use Canopy Blocks                                      |

### Filters (`src/snippets/filters.code-snippets`)

Trigger with the filter name or `|name` (e.g. `slug` or `|slug`).

| Prefix                   | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `abs`                    | Absolute value                                                 |
| `batch`                  | Batch items into a list of lists                               |
| `capitalize`             | Capitalize the first character                                 |
| `column`                 | Pluck a column from an array                                   |
| `convert_encoding`       | Convert string encoding                                        |
| `date`                   | Format a date                                                  |
| `date_modify`            | Modify a date with a modifier string                           |
| `default`                | Fallback value if undefined/empty                              |
| `escape` / `e`           | Escape a string for the given context                          |
| `filter`                 | Filter a sequence/mapping with an arrow function               |
| `first`                  | First element of a sequence/mapping/string                     |
| `format`                 | Replace `%s`-style placeholders                                |
| `group_by`               | Group array items by a key                                     |
| `image_tag`              | Generate an `<img>` tag                                        |
| `image_url`              | Generate a CDN URL for an image                                |
| `join`                   | Join a sequence into a string                                  |
| `json_encode`            | JSON representation of a value                                 |
| `keys`                   | Keys of an array                                               |
| `last`                   | Last element of a sequence/mapping/string                      |
| `length`                 | Number of items / string length                                |
| `lower`                  | Lowercase                                                      |
| `map`                    | Map a sequence/mapping with an arrow function                  |
| `merge`                  | Merge two arrays/hashes                                        |
| `nl2br`                  | Insert `<br>` before newlines                                  |
| `number_format`          | Format a number                                                |
| `raw`                    | Mark a value as safe (skip escaping)                           |
| `reading_time`           | Estimate reading time                                          |
| `reduce`                 | Reduce a sequence/mapping to a single value                    |
| `replace`                | Replace placeholders in a string                               |
| `reverse`                | Reverse a sequence/mapping/string                              |
| `round`                  | Round a number to a precision                                  |
| `slice`                  | Extract a slice of a sequence/mapping/string                   |
| `slug`                   | URL-friendly slug                                              |
| `sort`                   | Sort an array                                                  |
| `spaceless`              | Remove whitespace between HTML tags                            |
| `split`                  | Split a string into a list                                     |
| `striptags`              | Strip SGML/XML tags                                            |
| `title`                  | Titlecase a string                                             |
| `trim`                   | Strip whitespace/characters                                    |
| `upper`                  | Uppercase                                                      |
| `url_encode`             | Percent-encode a string/array as a URL segment or query string |
| `sort_by` _(deprecated)_ | Sort by key — use `sort` instead                               |

### Tests (`src/snippets/tests.code-snippets`)

Used after `is` in expressions, e.g. `{% if foo is defined %}`.

| Prefix            | Checks                                      |
| ----------------- | ------------------------------------------- |
| `is constant`     | Value equals a given constant               |
| `is defined`      | Variable is defined                         |
| `is not defined`  | Variable is not defined                     |
| `is divisible by` | Number is divisible by another              |
| `is empty`        | Empty string/array/hash, `false`, or `null` |
| `is even`         | Number is even                              |
| `is odd`          | Number is odd                               |
| `is iterable`     | Value is an array or traversable object     |
| `is null`         | Value is `null` (or `none`)                 |
| `is same as`      | Strict comparison to another value          |

### Templates & misc (`src/snippets/auto.code-snippets`)

| Prefix                  | Expands to                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `!form-macro`           | A full set of form input macros (input/checkbox/radio/select/errors/field)            |
| `!map`                  | Google Maps embed boilerplate                                                         |
| `collection` _(legacy)_ | Renders a collection via the legacy `collection()` function — prefer `cms.collection` |
| `form` _(legacy)_       | Renders a form via the legacy `form()` function — prefer `cms.form`                   |
| `!page`                 | New page skeleton extending a layout                                                  |
| `!layout`               | Layout skeleton wired to Canopy Blocks (`canopy.head`/`.blocks`/`.scripts`)           |

# Running locally

This extension is purely declarative (a TextMate grammar and snippet files) — there's no code to install or build.

1. Open this folder in VS Code and press `F5` (or **Run and Debug → Run Extension**). This launches an Extension Development Host window with the extension loaded directly from source.

2. In that new window, open a Blutui project (a folder containing `.html`/`.canvas` views) and open one of its view files to see syntax highlighting and snippets.

3. Edit a file under `src/snippets/` or `src/syntaxes/`, then reload the Extension Development Host window (`Cmd+R` / `Ctrl+R`) to pick up the change — no rebuild step needed.

If a token like `{%` doesn't look highlighted, put your cursor on it and run **Developer: Inspect Editor Tokens and Scopes** (`Cmd+Shift+P`) to see which TextMate scopes it resolved to and whether your color theme has a rule for them — that tells you whether it's a grammar bug or just a theme with no matching color rule.

## Packaging

To build a `.vsix` for local install or publishing, use [`vsce`](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) (no need to install it as a dependency):

```bash
npx @vscode/vsce package
```
