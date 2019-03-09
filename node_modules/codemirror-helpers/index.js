module.exports = function(codemirror2) {
  var codemirror, doc;
  setCodemirror(codemirror2);
  function setCodemirror(codemirror3) {
    codemirror = codemirror3;
    doc = codemirror && codemirror.getDoc();
  }
  function setSizeByRows(rowCount, width) {
    return codemirror.setSize(width, codemirror.defaultTextHeight() * rowCount + 7);
  }
  function clientHeight() {
    return codemirror.getScrollInfo().clientHeight;
  }
  function isOnFirstCh() {
    return !(getChNum());
  }
  function isOnFirstLine() {
    return !(getLineNum());
  }
  function isOnLastLine() {
    return lastLineNum() == getLineNum();
  }
  function goLineUp() {
    return codemirror.execCommand('goLineUp');
  }
  function goLineDown() {
    return codemirror.execCommand('goLineDown');
  }
  function goCharLeft() {
    return codemirror.execCommand('goCharLeft');
  }
  function goCharRight() {
    return codemirror.execCommand('goCharRight');
  }
  function goToLine(lineNum) {
    return doc.setCursor({line: lineNum});
  }
  function goToFirstLine() {
    return codemirror.setCursor({line: 0});
  }
  function goToLastLine() {
    return codemirror.setCursor({line: lastLineNum()});
  }
  function lineCount() {
    return doc.lineCount();
  }
  function lastLineNum() {
    return lineCount() - 1;
  }
  function getChNum() {
    return getCursor().ch;
  }
  function getLineNum() {
    return getCursor().line;
  }
  function getCursor() {
    return doc.getCursor();
  }
  function replaceLine(text) {
    var lineNum = getLineNum()
      , lineText = doc.getLine(lineNum)
      ;
    return replaceRange(text, {line: lineNum, ch: 0}, {line: lineNum, ch: lineText.length});
  }
  function replaceRange() {
    return doc.replaceRange.apply(doc, arguments);
  }
  return {
    setCodemirror: setCodemirror,
    doc: doc,
    setSizeByRows: setSizeByRows,
    clientHeight: clientHeight,
    isOnFirstCh: isOnFirstCh,
    isOnFirstLine: isOnFirstLine,
    isOnLastLine: isOnLastLine,
    goLineUp: goLineUp,
    goLineDown: goLineDown,
    goCharLeft: goCharLeft,
    goCharRight: goCharRight,
    goToLine: goToLine,
    goToFirstLine: goToFirstLine,
    goToLastLine: goToLastLine,
    lineCount: lineCount,
    lastLineNum: lastLineNum,
    getLineNum: getLineNum,
    replaceLine: replaceLine,
    replaceRange: replaceRange
  };
};
