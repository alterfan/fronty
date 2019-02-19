var delay, obj, data, i, num, val;
var arr = [],
  json = {};
//-----------------------------------
class Editor {
  constructor() {
    let _editor;
    this._autoupdate = true;
    /* init code editors */
    $('.code').each(function (index) {
      $(this).attr('id', 'code-' + index);
      $(this).val(storage.getKey("session", autosave, index));
      if (!storage.getItem()) {
        _editor = CodeMirror.fromTextArea(document.getElementById('code-' + index), editorDefaults);
      } else {
        _editor = CodeMirror.fromTextArea(document.getElementById('code-' + index), storage.getItem()[editorOptions]);
      }
      _editor.setOption("mode", $(this).attr('mode'));
      _editor.on("focus", function (cm) {
        cm.setOption("styleActiveLine", true);
      });
      _editor.on("blur", function (cm) {
        cm.setOption("styleActiveLine", false);
      });
      /* update preview on change */
      _editor.on("keydown", function (cm, event) {
        if (!(event.ctrlKey) && !(event.ctrlKey) && (event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode >= 46 && event.keyCode <= 57) {
          CodeMirror.commands.autocomplete(cm, null, {
            completeSingle: false,
            closeOnUnfocus: true,
            alignWithWord: true
          });
        }
        if (event.keyCode == 27 && event.keyCode == 32 && event.ctrlKey && (event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode == 27 && event.keyCode == 32) {
          cm.closeHint();
        }
      });
      _editor.on('gutterClick', function (cm, line, gutter) {
        if (gutter === 'CodeMirror-linenumbers') {
          return cm.setSelection(CodeMirror.Pos(line, 0), CodeMirror.Pos(line + 1, 0));
        }
      });
      _editor.on("changes", function (cm) {
        if (ed._autoupdate == true) {
          setTimeout(function () {
            updatePreview();
          }, 100);
          cm.save();
          cm.refresh();
        }
      });
    });
    /* init external Libs */
    $('.externalLibs').each(function (index, element) {
      let _val = storage.getKey("session", autosave, (3 + index));
      $(this).val(_val);
    });
    /* add theme css */
    $('head').prepend('<link id="' + _editor.getOption("theme") + '"rel="stylesheet" type="text/css" href="./codemirror/theme/' + _editor.getOption("theme") + '.css">');
    /* CodeMirror updatePreview */
    setTimeout(updatePreview(), 1000);
  }
  autoUpdate() {
    let $w_b3 = $("#wrapper_block3");
    if (ed._autoupdate == true) {
      $w_b3.find('[data-action="autoUpdate"] .material-icons').html("toggle_off");
      $w_b3.find('[data-action="updatePreview"]').fadeIn(300);
      $w_b3.removeClass("active");
      this._autoupdate = false;
      return
    } else {
      $w_b3.find('[data-action="autoUpdate"] .material-icons').html("toggle_on");
      $w_b3.find('[data-action="updatePreview"]').fadeOut(300);
      $w_b3.toggleClass("active");
      this._autoupdate = true;
      return
    }
  }
  changeTheme(val) {
    $('#' + storage.getKey("local", editorOptions, 'theme')).remove();
    $('head').append('<link rel="stylesheet" type="text/css" href="./codemirror/theme/' + val + '.css">');
    storage.setKey("local", editorOptions, "theme", val);
    $('.CodeMirror').each(function (index, el) {
      $('.CodeMirror')[index].CodeMirror.setOption("theme", val);
    });
  }
  changeFontSize(val) {
    $('.CodeMirror').css("font-size", val);
    storage.setKey("local", frontyOptions, "fontSize", val);
  }
  changeFontFamily(val) {
    $('.CodeMirror').css("font-family", val);
    storage.setKey("local", frontyOptions, "fontFamily", val);
  }
  format(el) {
    var data_type = el.attr('data-type');
    if (data_type == 'html') {
      let _style_html = html_beautify($('#code-0').val());
      $('.CodeMirror')[0].CodeMirror.setValue(_style_html);
    }
    if (data_type == 'javascript') {
      let _js_beautify = js_beautify($('#code-2').val());
      $('.CodeMirror')[2].CodeMirror.setValue(_js_beautify);
    }
    if (data_type == 'css') {
      let _css_beautify = css_beautify($('#code-1').val());
      $('.CodeMirror')[1].CodeMirror.setValue(_css_beautify);
    }
  }
  redo(el) {
    var editor = el.attr('data-editor');
    $('.CodeMirror')[editor].CodeMirror.redo()
  }
  undo(el) {
    var editor = el.attr('data-editor');
    $('.CodeMirror')[editor].CodeMirror.undo()
  }
  empty() {
    $('.CodeMirror').each(function (index) {
      $('.CodeMirror')[index].CodeMirror.setValue("");
    })
  }
  getOpt(optName) {
    $('.CodeMirror').doc.CodeMirror.getOption(optName);
  }
  saveLibs() {
    $('.externalLibs').each(function (index) {
      var array = [];
      $("." + $(this).attr('data-type') + "Input").each(function (index, element) {
        array.push($(this).val());
      });
      $(this).val(array.join(','));
    });
    updatePreview();
    ui.closeModal()
  }
  deleteLib(elem) {
    arr = elem.parent().parent().find(elem.attr('data-type') + 'Input');
    ui.deleteLib(elem);
  }
  _getLibs(input) {
    return input.split(',');
  }
}
var ed = new Editor();
/* обновление предварительного просмотра */
function updatePreview() {
  var preview = document.getElementById('preview'),
    _scriptsLibrary = scriptsLibrary($('#code-' + 4).val()),
    _stylesheetsLibrary = stylesheetsLibrary($('#code-' + 3).val(), $('.CodeMirror')[1].CodeMirror.getValue()),
    _bodyCode = bodyCode($('.CodeMirror')[0].CodeMirror.getValue(), $('.CodeMirror')[2].CodeMirror.getValue()),
    _preview = preview.contentDocument || preview.contentWindow.document;
  _preview.open();
  _preview.write(_stylesheetsLibrary + _scriptsLibrary + _bodyCode);
  _preview.close();
  $('.code').each(function (index) {
    storage.setKey("session", autosave, index, $('#code-' + index).val());
  });
  $('.externalLibs').each(function (index) {
    storage.setKey("session", autosave, (index + 3), $('#code-' + (index + 3)).val());
  });
  initConsole();
}
function bodyCode(htmlCode, jsCode) {
  return "</body>" + htmlCode + "</body><script>" + jsCode + "</script>";
};
/* prepare for preview */
function stylesheetsLibrary(cssLibs, cssStyle) {
  let cssLibsArr = cssLibs.split(',');
  let cssLibsArrCode = [];
  $.each(cssLibsArr, function (indexInArray, valueOfElement) {
    cssLibsArrCode.push('<link rel="stylesheet" type="text/css" href="' + valueOfElement + '">');
  })
  return cssLibsArrCode.join('') + "<style>" + cssStyle + "</style>";
};
function scriptsLibrary(jsLibs) {
  let jsLibsArr = jsLibs.split(',');
  let jsLibsArrCode = [];
  $.each(jsLibsArr, function (indexInArray, valueOfElement) {
    jsLibsArrCode.push('<script type="text/javascript" src="' + valueOfElement + '"></script>');
  });
  return jsLibsArrCode.join('');
};
/* $('button.replaceAll').on('click', function (e) {
    e.preventDefault();
    var query = $('input.find').val();
    var text = $('input.replace').val();
    var options = {
        'ignoreCase': $('input.ignoreCase').prop("checked"),
        'regexp': $('input.regexp').prop("checked")
    };
    editor.replaceAll(query, text, options);
});
$('button.replace').on('click', function (e) {
    e.preventDefault();
    var query = $('input.find').val();
    var text = $('input.replace').val();
    var options = {
        'ignoreCase': $('input.ignoreCase').prop("checked"),
        'regexp': $('input.regexp').prop("checked")
    };
    editor.replace(query, text, options);
});
$('button.replaceFind').on('click', function (e) {
    e.preventDefault();
    var query = $('input.find').val();
    var text = $('input.replace').val();
    var options = {
        'ignoreCase': $('input.ignoreCase').prop("checked"),
        'regexp': $('input.regexp').prop("checked")
    };
    editor.findReplace(query, text, options);
});
$('button.previous').on('click', function (e) {
    e.preventDefault();
    var query = $('input.find').val();
    var options = {
        'ignoreCase': $('input.ignoreCase').prop("checked"),
        'regexp': $('input.regexp').prop("checked")
    };
    editor.findPrev(query, options);
});
$('button.next').on('click', function (e) {
    e.preventDefault();
    var query = $('input.find').val();
    var options = {
        'ignoreCase': $('input.ignoreCase').prop("checked"),
        'regexp': $('input.regexp').prop("checked")
    };
    editor.findNext(query, options);
}); */