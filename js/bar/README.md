﻿# cm-toolbar-addon

CodeMirror action toollbar
-Visible on focus.
-Works whith multiple editor


###Install:
# cm-minimap-addon

# MiniMap

MiniMap is addon for CodeMirror.

# About

--Variable width.
--Show MiniMAp on "focus".

# Usage

you will need to paste:
`<link rel="stylesheet" href="cm-addon-minimap.css">`
and
`<script type="text/javascript" src="cm-addon-minimap.js"></script>`
Then set CodeMirror option "toolBar" : `true/false`

```javascript
var editor = CodeMirror("#editor", {
	mode: html,
	toolBar:true
});
```

!!Need jquery library