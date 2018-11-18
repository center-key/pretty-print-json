# pretty-print-json
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_JavaScript library to pretty-print JSON data to HTML for formatted color display_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/pretty-print-json/blob/master/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/pretty-print-json.svg)](https://www.npmjs.com/package/pretty-print-json)
[![Dependencies](https://david-dm.org/center-key/pretty-print-json/status.svg)](https://david-dm.org/center-key/pretty-print-json)
[![Vulnerabilities](https://snyk.io/test/github/center-key/pretty-print-json/badge.svg)](https://snyk.io/test/github/center-key/pretty-print-json)
[![Build](https://travis-ci.org/center-key/pretty-print-json.svg)](https://travis-ci.org/center-key/pretty-print-json)

## Setup
From the [jsdelivr.com CDN](https://www.jsdelivr.com/package/npm/pretty-print-json):
```html
<link rel=stylesheet href=https://cdn.jsdelivr.net/npm/pretty-print-json@0.0/dist/pretty-print-json.css>
...
<script src=https://cdn.jsdelivr.net/npm/pretty-print-json@0.0/dist/pretty-print-json.min.js></script>
```

In a Node.js project:
```shell
$ npm install pretty-print-json
```
```javascript
const prettyPrintJson = require('pretty-print-json');
```

## Usage
```javascript
const data = { active: true, codes: [48348, 28923, 39080], city: 'London' };
$('#account code').html(prettyPrintJson.toHtml(data));
```

---
[MIT License](LICENSE.txt)
