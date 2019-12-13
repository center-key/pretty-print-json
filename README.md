# pretty-print-json
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_JavaScript library to pretty-print JSON data to HTML for formatted color display_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/pretty-print-json/blob/master/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/pretty-print-json.svg)](https://www.npmjs.com/package/pretty-print-json)
[![Dependencies](https://david-dm.org/center-key/pretty-print-json/status.svg)](https://david-dm.org/center-key/pretty-print-json)
[![Vulnerabilities](https://snyk.io/test/github/center-key/pretty-print-json/badge.svg)](https://snyk.io/test/github/center-key/pretty-print-json)
[![Hits](https://data.jsdelivr.com/v1/package/npm/pretty-print-json/badge?style=rounded)](https://www.jsdelivr.com/package/npm/pretty-print-json)
[![Build](https://travis-ci.org/center-key/pretty-print-json.svg)](https://travis-ci.org/center-key/pretty-print-json)

<img width=350 alt=screenshot
   src=https://3.bp.blogspot.com/-M13HQRG7cqQ/XaQvF0Q_KyI/AAAAAAAAJeg/3_CTIgPAh5Yqa29aYPvB1aTO9VsUlksLACNcBGAsYHQ/s1600/pretty-print-json.png>

## 1) Try it out
Interactive online tool to format JSON:<br>
https://pretty-print-json.js.org

## 2) Setup
### Browser
Load from the [jsdelivr.com CDN](https://www.jsdelivr.com/package/npm/pretty-print-json):
```html
<link rel=stylesheet href=https://cdn.jsdelivr.net/npm/pretty-print-json@0.2/dist/pretty-print-json.css>
...
<script src=https://cdn.jsdelivr.net/npm/pretty-print-json@0.2/dist/pretty-print-json.min.js></script>
```
### node
Install package from npm:
```shell
$ npm install pretty-print-json
```
Import into your application:
```javascript
const prettyPrintJson = require('pretty-print-json');
```

## 3) Usage
### API
```javascript
const html = prettyPrintJson.toHtml(data[, options]);
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
| `quoteKeys` | **boolean** | `false` | Always double quote key names.    |

<br>

---
[MIT License](LICENSE.txt) | [Blog post](https://blog.centerkey.com/2013/05/javascript-colorized-pretty-print-json.html)
