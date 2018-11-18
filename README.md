# pretty-print-json
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_JavaScript library to pretty-print JSON data to HTML for formatted color display_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/pretty-print-json/blob/master/LICENSE.txt)

## Usage
```javascript
const data = { active: true, codes: [48348, 28923, 39080], city: 'London' };
$('#account code').html(prettyPrintJson.toHtml(data));
```

---
[MIT License](LICENSE.txt)
