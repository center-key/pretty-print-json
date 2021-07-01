# pretty-print-json
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_Pretty-print JSON data into HTML to indent and colorize (written in TypeScript)_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/pretty-print-json/blob/main/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/pretty-print-json.svg)](https://www.npmjs.com/package/pretty-print-json)
[![Size](https://badgen.net/bundlephobia/minzip/pretty-print-json)](https://bundlephobia.com/result?p=pretty-print-json)
[![Vulnerabilities](https://snyk.io/test/github/center-key/pretty-print-json/badge.svg)](https://snyk.io/test/github/center-key/pretty-print-json)
[![Hits](https://data.jsdelivr.com/v1/package/npm/pretty-print-json/badge?style=rounded)](https://www.jsdelivr.com/package/npm/pretty-print-json)
[![Build](https://github.com/center-key/pretty-print-json/workflows/build/badge.svg)](https://github.com/center-key/pretty-print-json/actions?query=workflow%3Abuild)

<img width=350 alt=screenshot
   src=https://3.bp.blogspot.com/-M13HQRG7cqQ/XaQvF0Q_KyI/AAAAAAAAJeg/3_CTIgPAh5Yqa29aYPvB1aTO9VsUlksLACNcBGAsYHQ/s1600/pretty-print-json.png>

## 1) Try It Out
Interactive online tool to format JSON:<br>
https://pretty-print-json.js.org

## 2) Setup
### Web browser
Load from the [jsdelivr.com CDN](https://www.jsdelivr.com/package/npm/pretty-print-json):
```html
<link rel=stylesheet href=https://cdn.jsdelivr.net/npm/pretty-print-json@1.0/dist/pretty-print-json.css>
...
<script src=https://cdn.jsdelivr.net/npm/pretty-print-json@1.0/dist/pretty-print-json.min.js></script>
```
For **dark mode**, replace `pretty-print-json.css` with `pretty-print-json.dark-mode.css` in the `<link>` tag.
### Node.js server
Install package for node:
```shell
$ npm install pretty-print-json
```
Import into your application:
```javascript
import { prettyPrintJson } from 'pretty-print-json';
```
Or for older CommonJS/UMD environments:
```javascript
const { prettyPrintJson } = require('pretty-print-json');  //deprecated
```

## 3) Usage
### API
```javascript
const html = prettyPrintJson.toHtml(data, options?);
```
### Example
##### HTML:
```html
<pre id=account></pre>
```
##### JavaScript:
Pass data into `prettyPrintJson.toHtml()` and display the results.
```javascript
const data = { active: true, mode: '🚃', codes: [48348, 28923, 39080], city: 'London' };
const elem = document.getElementById('account');
elem.innerHTML = prettyPrintJson.toHtml(data);
```
### Options
| Name (key)  | Type        | Default | Description                       |
| :---------- | :---------- | :------ | :-------------------------------- |
| `indent`    | **integer** | `3`     | Number of spaces for indentation. |
| `linkUrls`  | **boolean** | `true`  | Create anchor tags for URLs.      |
| `quoteKeys` | **boolean** | `false` | Always double quote key names.    |

## 4) TypeScript Declarations
The **TypeScript Declaration File** file is [pretty-print-json.d.ts](dist/pretty-print-json.d.ts)
in the **dist** folder.

The output of the `prettyPrintJson.toHtml(thing: unknown, options?: FormatOptions)` function is
configured with a `FormatOptions` object:
```typescript
type FormatOptions = {
   indent?:    number,
   linkUrls?:  boolean,
   quoteKeys?: boolean;
   };
```

Example TypeScript usage with explicit types:
```typescript
import { prettyPrintJson, FormatOptions } from 'pretty-print-json';

const data = { active: true, mode: '🚃', codes: [48348, 28923, 39080], city: 'London' };
const options: FormatOptions = { linkUrls: true };
const html: string = prettyPrintJson.toHtml(data, options);
```

## 5) Contributor Notes
To be a contributor, **fork** the project and run the commands `npm install` and `npm test` on your
local clone.&nbsp; Make your edits and rerun the tests.&nbsp; Pull requests welcome.

<br>

---
Feel free to submit questions at:<br>
[github.com/center-key/pretty-print-json/issues](https://github.com/center-key/pretty-print-json/issues)

[MIT License](LICENSE.txt) | [Blog post](https://blog.centerkey.com/2013/05/javascript-colorized-pretty-print-json.html)
