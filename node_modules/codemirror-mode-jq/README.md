# codemirror-mode-jq

> CodeMirror mode for [jq](https://stedolan.github.io/jq/) filters and scripts.

## how to use

This is a [Simple Mode](https://codemirror.net/demo/simplemode.html), so you must register it as a simple mode, it is not sufficient to just import it.

```
npm install --save codemirror-mode-jq
```

```js
CodeMirror.defineSimpleMode('jq', require('codemirror-mode-jq'))

// then, later
let cm = CodeMirror.fromTextArea(textarea, {
  mode: 'jq'
})
```

Or do it the way you want. You get the idea.

## license

ISC
