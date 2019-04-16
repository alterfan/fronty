(function( $ ) {

  /*
  CodeMirror.registerHelper("hint", "anyword", function(editor, options) {
    var word = options && options.word || WORD;
    var range = options && options.range || RANGE;
    var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
    var start = cur.ch, end = start;
    while (end < curLine.length && word.test(curLine.charAt(end))) ++end;
    while (start && word.test(curLine.charAt(start - 1))) --start;
    var curWord = start != end && curLine.slice(start, end);

    var list = [], seen = {},
        scan = function(dir) {
          var line = cur.line, end = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
          for (; line != end; line += dir) {
            var text = editor.getLine(line), m;
            word.lastIndex = 0;
            while (m = word.exec(text)) {
              if ((!curWord || m[0].indexOf(curWord) == 0) && !seen.hasOwnProperty(m[0])) {
                seen[m[0]] = true;
                list.push(m[0]);
              }
            }
          }
        };
    scan(-1);
    scan(1);
    appui.fn.log("HINTTT | " + curWord);
    return {list: list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end)};
  });

  var orig = CodeMirror.hint.javascript;
  CodeMirror.hint.javascript = function(cm) {
    appui.fn.log(cm, cm.getCursor());
    var inner = {
      from: cm.getCursor(),
      to: cm.getCursor(),
      list: [{
        text: "test1",
        displayText: "Dsiplay Test1",
        className: "adherent",
        hint: function(cm, self, data){
          appui.fn.log("hint", cm, self, data);
        }
      }, {
        text: "test2",
        displayText: "Dsiplay Test2",
        className: "adherent",
        hint: function(cm, self, data){
          appui.fn.log("hint", cm, self, data);
        }
      }, {
        text: "test3",
        displayText: "Dsiplay Test3",
        className: "adherent",
        hint: function(cm, self, data){
          appui.fn.log("hint", cm, self, data);
        },
        render: function(ele, self, data){
          $(ele).append('<div style="font-family: Arial, Helvetica, sans-serif; font-size: medium"><p>hint: function<br>A hinting function, as specified above. It is possible to set the async property on a hinting function to true, in which case it will be called with arguments (cm, callback, ?options), and the completion interface will only be popped up when the hinting function calls the callback, passing it the object holding the completions.</p><p><button class="k-button">Hey</button></p></div>');
        }
      }]
    };
    appui.fn.log(inner);
    return inner;
  };
  */
  CodeMirror.defineMode("html", function(config, parserConfig) {
    var mustacheOverlay = {
      token: function(stream, state) {
        var ch;
        if (stream.match("{{")) {
          while ((ch = stream.next()) != null)
            if (ch == "}" && stream.next() == "}") break;
          stream.eat("}");
          return "mustache";
        }
        while (stream.next() != null && !stream.match("{{", false)) {}
        return null;
      }
    };
    return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "htmlmixed"), mustacheOverlay);
  });

  CodeMirror.defineMode("js", function(config, parserConfig) {
    return CodeMirror.getMode(config, "javascript");
  });

  // private variables
	var
    path = "",

    $script = $("#codemirror_script");

  if ( $script.length === 1 ){
		path = $script.attr("src").substr(0, $script.attr("src").lastIndexOf("/")+1);
	}
	else{
		$script = $("script[src$='codemirror.js']");
		if ( $script.length === 1 ){
			path = $script.attr("src").substr(0, $script.attr("src").indexOf('lib/codemirror.js'));
		}
	}

  $.widget("ui.codemirror", {
		version: "@VERSION",
		cm: false,
    isInput: false,
		widgets: [],
    changed: false,
    lint: true,
    specifics:{
      js: {
        lint: true,
      	lintWith: CodeMirror.javascriptValidator,
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers"
        ],
        /*
        extraKeys: {
          "'.'": function(cm){
            cm.showHint();
          }
        }
        */
      },
      css: {
        lint: true,
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers"
        ]
      },
      json: {
        lint: true,
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers"
        ]
      },
      html: {
        autoCloseTags: true,
        extraKeys: {
          "Ctrl-J": "toMatchingTag"
        }
      }
    },
    options: {
			lineNumbers: true,
			tabSize: 2,
			value: "",
			lineWrapping: true,
			mode: "html",
      theme: "pastel-on-dark",
      readOnly: false,
      matchBrackets: true,
      autoCloseBrackets: true,
      showTrailingSpace: true,
      styleActiveLine: true,
      keydown: false,
      save: false,
      change: false,
      changeFromOriginal: false,
      foldGutter: true,
      selections: [],
      marks: [],
      gutters: [
        "CodeMirror-linenumbers",
        "CodeMirror-foldgutter"
      ],
      extraKeys: {
        F11: function(cm) {
          cm.widget.setFullScreen(cm, !cm.widget.isFullScreen(cm));
        },
        Esc: function(cm) {
          if ( cm.widget.isFullScreen(cm) ){
            cm.widget.setFullScreen(cm, false);
          }
        },
        "Ctrl-W": function(cm){
          window.event.preventDefault();
          window.event.stopPropagation();
          cm.widget.close();
        },
        "Ctrl-S": function(cm){
          cm.widget.save();
        },
        "Ctrl-T": function(){
          cm.widget.test();
        }
      },
      /*foldGutter: {
       rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
       },*/
    },

    _create: function(){
			var $$ = this,
          o = $$.options,
          tag = $$.element.get(0).tagName.toLowerCase(),
          h;
      if ( tag !== 'div' ){
        $$.element.before('<div></div>');
        $$.ele = this.element.prev().get(0);
        if ( $$.element.attr("style") ){
          $($$.ele).attr("style",$$.element.attr("style")).css("position","relative");
        }
        if ( $$.element.is("[readonly]") ){
          o.readOnly = true;
        }
        if ( (tag === 'input') || (tag === 'textarea') ){
          $$.isInput = 1;
        }
        $$.element.hide();
      }
      else{
        $$.ele = $$.element.get(0);
      }
      if ( !o.value ){
        if ( (tag === 'input') || (tag === 'textarea') ){
          o.value = $$.element.val();
        }
        else{
          o.value = $$.ele.innerHTML;
          $$.element.empty();
        }
      }
      /*if ( !o.height && (h = $(this.ele).height()) ){
        o.height = h;
      }*/
      $$.element.addClass($$.widgetFullName);
      $$.display(o.value, o.mode);
      if ( o.value ){
        $$.setState(o);
      }
		},

    isFullScreen: function(cm) {
      return /\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className);
    },

    save: function(){
			var $$ = this,
          o = $$.options;
      if ( o.save ){
        var v = $$.getValue(),
            hasChanged = (v !== o.value);
        if ( (hasChanged || (hasChanged !== $$.changed))
          && o.save
          && o.save($$) ){
          this.changeValue();
        }

      }
    },

    changeValue: function(){
      var $$ = this,
          o = $$.options;
      o.value = $$.getValue();
      $$.changed = false;
      if ( o.changeFromOriginal ){
        o.changeFromOriginal($$);
      }
    },

    setOption: function(oName, val){
      this.cm.setOption(oName, val);
    },

    getOption: function(oName){
      this.cm.getOption(oName);
    },

    setFullScreen: function(cm, full) {
      var wrap = cm.getWrapperElement(),
        $w = $(wrap);
      if (full) {
        $w.data("cmHeight", $w.height());
        wrap.className += " CodeMirror-fullscreen";
        $w.height($.ui.codemirror.winHeight());
        document.documentElement.style.overflow = "hidden";
        $('<div class="CodeMirror-replacer"></div>').insertAfter(wrap);
        $w.wrap("<div></div").parent().css({
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
        }).appendTo(document.body);
      }
      else {
        var $c = $w.parent();
        wrap.className = wrap.className.replace(" CodeMirror-fullscreen", "");
        $w.height($w.data("cmHeight"));
        document.documentElement.style.overflow = "";
        $(wrap).insertAfter("div.CodeMirror-replacer");
        $("div.CodeMirror-replacer").remove();
        $c.remove();
        $(window).trigger("resize");
      }
      cm.refresh();
      cm.focus();
    },

    isChanged: function(){
      return this.changed;
    },

    _setCM: function(val, mode){
			var $$ = this,
          o = this.options,
          doc,
          $ele = $($$.ele),
          cfg = {};
      if ( (typeof(val) === 'string') && (o.value !== val) ){
        o.value = val;
      }
      appui.fn.extend(cfg, this.options, {change: false, keydown: false, save: this.save});
      if ( $$.specifics[o.mode] !== undefined ){
        appui.fn.extend(cfg, $$.specifics[o.mode]);
      }
      if ( typeof(mode) === 'string' ){
        cfg.mode = $.ui.codemirror.modes[mode] !== undefined ? $.ui.codemirror.modes[mode].mode : mode;
        o.mode = mode;
      }
      $$.cm = CodeMirror($$.ele, cfg);
      $$.cm.widget = this;
      $$.cm.setSize(o.width ? o.width : "100%", o.height ? o.height : "100%");
      $$.cm.on("change", function(inst, e){
        var v = $$.getValue(),
            hasChanged = (v !== o.value);
        if ( hasChanged !== $$.changed ){
          $$.changed = hasChanged;
          if ( o.changeFromOriginal ){
            o.changeFromOriginal($$);
          }
        }
        if ( $$.isInput ){
          $$.element.val(v);
        }
        if ( o.change ){
          o.change($$, e);
        }
      });
      /*
      if ( o.keydown ){
        $$.cm.on("keydown", function(inst, e){
          o.keydown($$, e);
        });
      }
      $$.cm.on("mousedown", function(inst, e){
        appui.fn.log($$.cm);
      });
      $$.cm.on("inputRead", function(cm) {
        if ( $.ui.codemirror.timeout ){
          clearTimeout($.ui.codemirror.timeout);
        }
        $.ui.codemirror.timeout = setTimeout(function() {
          $$.cm.showHint();
        }, 150);
      });
      $$.cm.on("keyup", function(inst, e){
        if ( !e.ctrlKey && !e.altKey &&
          ($.inArray(e.keyCode, appui.var.keys.alt) === -1) &&
          ($.inArray(e.keyCode, appui.var.keys.confirm) === -1) &&
          ($.inArray(e.keyCode, appui.var.keys.dels) === -1) &&
          ($.inArray(e.keyCode, appui.var.keys.leftRight) === -1) &&
          ($.inArray(e.keyCode, appui.var.keys.upDown) === -1) &&
          (e.keyCode != 32) &&
          (e.keyCode != 59) &&
          (e.keyCode != 27)
        ){
        // Letters or dot
        //if ( ((e.keyCode >= 65) && (e.keyCode <= 90)) || (e.keyCode === 110) ){
          setTimeout(function() {
            $$.cm.showHint();
          }, 300);
        	return CodeMirror.Pass;
        }
      });
      */
    },

    getMode: function(mode){
      return this.options.mode;
    },

    display: function(val, mode){
      var $$ = this, o = this.options;
      if ( ($.ui.codemirror.modes[mode] !== undefined) ){
        if ( $.inArray($.ui.codemirror.modes[mode].file, $.ui.codemirror.loadedFiles) === -1 ){
          $("head").append('<script type="text/javascript" src="' + path + 'mode/' + $.ui.codemirror.modes[mode].file + '/' + $.ui.codemirror.modes[mode].file + '.js"></script>');
          $.ui.codemirror.loadedFiles.push($.ui.codemirror.modes[mode].file);
          appui.fn.wait_for_script("CodeMirror.modes." + $.ui.codemirror.modes[mode].file, function(){
            $$._setCM(val, mode);
          });
        }
        else{
          $$._setCM(val, mode);
        }
      }
    },

    setMode: function(mode){
			var $$ = this,
        o = this.options,
        old_mode = $$.cm.getOption("mode"),
        gutters = o.gutters;
			if ( ($.ui.codemirror.modes[mode] !== undefined) ){
        if ( $$.specifics[old_mode] !== undefined ){
          for ( var n in $$.specifics[old_mode] ){
            if ( ($$.specifics[old_mode] === undefined) || ($$.specifics[old_mode][n] === undefined) ){
              $$.cm.setOption(n, false);
            }
          }
        }
        o.mode = mode;
        appui.fn.log($.ui.codemirror.modes[mode].file, $.ui.codemirror.loadedFiles);
        if ( $.inArray($.ui.codemirror.modes[mode].file, $.ui.codemirror.loadedFiles) === -1 ){
  				$("head").append('<script type="text/javascript" src="' + path + 'mode/' + $.ui.codemirror.modes[mode].file + '/' + $.ui.codemirror.modes[mode].file + '.js"></script>');
          $.ui.codemirror.loadedFiles.push($.ui.codemirror.modes[mode].file);
          appui.fn.wait_for_script("CodeMirror.modes." + $.ui.codemirror.modes[mode].file, function(){
            $$.cm.setOption("mode", $.ui.codemirror.modes[mode].mode);
          });
        }
        else{
          $$.cm.setOption("mode", $.ui.codemirror.modes[mode].mode);
          if ( $$.specifics[mode] !== undefined ){
            for ( var n in $$.specifics[mode] ){
              $$.cm.setOption(n, $$.specifics[mode][n]);
            }
          }
        }
      }
	  },

    getValue: function(){
      return this.cm.getValue();
    },

    setValue: function(v){
      return this.cm.setValue(v);
    },

    getTheme: function(){
      return this.cm.getOption("theme");
    },

    setTheme: function(theme){
      if ( $.inArray(theme, $.ui.codemirror.themes) > -1 ){
        this.cm.setOption("theme", theme);
        this.options.theme = theme;
        return true;
      }
      return false;
    },

    changeTheme: function(theme){
      return this.setTheme(theme);
    },

    api: function(){
      var $$ = this;
      if ( arguments.length > 0 ){
        var f = arguments[0],
          a = [];
        for ( var i = 1; i < arguments.length; i++ ){
          a.push(arguments[i]);
        }
        return $$.cm[f].apply($$.cm, a);
      }
    },

    search: function(v){
      if ( !v ){
        v = '';
      }
      this.command("find");
      this.element.find("div.CodeMirror-dialog > input").val(v).focus();
    },

    replace: function(v){
      if ( !v ){
        v = '';
      }
      this.command("replace");
      this.element.find("div.CodeMirror-dialog > input").val(v).focus();
    },

    replaceAll: function(v){
      if ( !v ){
        v = '';
      }
      this.command("replaceAll");
      this.element.find("div.CodeMirror-dialog > input").val(v).focus();
    },

    findNext: function(){
      this.command("findNext");
      //this.element.find("div.CodeMirror-dialog > input").val(v).focus();
    },

    findPrev: function(){
      this.command("findPrev");
      //this.element.find("div.CodeMirror-dialog > input").val(v).focus();
    },

    getDoc: function(){
      return this.cm.getDoc();
    },

    getCodeMirror: function(){
      return this.cm;
    },

    mergeView: function(){
      var $$ = this;
      if ( (arguments.length > 0) &&
        $.isFunction(CodeMirror.MergeView)
      ){
        return CodeMirror.MergeView($$.cm.widget.ele, arguments[0]);
      }
      return false;
    },

    getState: function(){
      var $$ = this,
          doc = $$.getDoc(),
          selections = doc.listSelections(),
          marks = doc.getAllMarks(),
          res = {
            selections: [],
            marks: [],
            value: $$.getValue()
          };
      if ( marks ){
        // We reverse the array in order to start in the last folded parts in case of nesting
        for ( var i = marks.length - 1; i >= 0; i-- ){
          if ( marks[i].collapsed && (marks[i].type === 'range') ){
            res.marks.push(marks[i].find().from);
          }
        }
      }
      if ( selections ){
        $.each(selections, function(i, a){
          res.selections.push({anchor: a.anchor, head: a.head});
        });
      }
      return res;
    },

    link: function(ele){
      var $$ = this,
          srcDoc = ele.codemirror("getDoc"),
          newDoc = srcDoc.linkedDoc({sharedHist: true});
      $$.cm.swapDoc(newDoc);
    },

    setState: function(r){
      var $$ = this,
          doc = $$.cm.getDoc();
      if ( r.selections && r.selections.length ){
        for ( var i = 0; i < r.selections.length; i++ ){
          doc.setSelection(r.selections[i].anchor, r.selections[i].head);
        }
      }
      if ( r.marks && r.marks.length ){
        $.each(r.marks, function(i, a){
          $$.cm.foldCode(a);
        });
      }
    },

    command: function(){
      var $$ = this;
      if ( arguments.length > 0 ){
          var f = arguments[0],
            a = [];
          if ( $.isFunction(CodeMirror.commands[f]) ){
            for ( var i = 1; i < arguments.length; i++ ){
              a.push(arguments[i]);
            }
            return CodeMirror.commands[f]($$.cm);
          }
          return false;
        }
    },

    refresh: function(){
      this.cm.refresh();
    },

    enable: function(a){
      this.cm.setOption('readOnly', a ? false : true);
  	}
  });
  var mixedMode = {
    name: "htmlmixed",
    scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
                   mode: null},
                  {matches: /(text|application)\/(x-)?vb(a|script)/i,
                   mode: "vbscript"}]
  };
	$.extend($.ui.codemirror, {
		version: "4.1",

    modes: {
      clike: {
        file: 'clike',
        mode: 'text/x-clike'
      },
      coffee: {
        file: 'coffeescript',
        mode: 'text/x-coffeescript'
      },
      css: {
        file: 'css',
        mode: 'text/css'
      },
      less: {
        file: 'css',
        mode: 'text/x-less'
      },
      scss: {
        file: 'css',
        mode: 'text/x-scss'
      },
      diff: {
        file: 'diff',
        mode: 'text/x-diff'
      },
      html: {
        file: 'htmlmixed',
        mode: 'html'
      },
      http: {
        file: 'http',
        mode: 'message/http'
      },
      js: {
        file: 'javascript',
        mode: 'js'
      },
      gfm: {
        file: 'gfm',
        mode: 'gfm'
      },
      mysql: {
        file: 'sql',
        mode: 'text/x-mysql'
      },
      sql: {
        file: 'sql',
        mode: 'text/x-sql'
      },
      plsql: {
        file: 'sql',
        mode: 'text/x-plsql'
      },
      mssql: {
        file: 'sql',
        mode: 'text/x-mssql'
      },
      pl: {
        file: 'perl',
        mode: 'text/x-perl'
      },
      php: {
        file: 'php',
        mode: 'application/x-httpd-php'
      },
      py: {
        file: 'python',
        mode: 'text/x-python'
      },
      ruby: {
        file: 'ruby',
        mode: 'text/x-ruby'
      },
      sass: {
        file: 'sass',
        mode: 'text/x-sass'
      },
      shell: {
        file: 'shell',
        mode: 'text/x-shell'
      },
      smarty: {
        file: 'smarty',
        mode: 'text/x-smarty'
      },
      xml: {
        file: 'xml',
        mode: 'text/x-xml'
      }
    },
    timeout: false,
    loadedFiles: ['xml', 'javascript', 'css', 'htmlmixed', 'clike', 'php', 'ruby', 'less', 'scss', 'js', 'html', 'gfm'],
    winHeight: function() {
      return window.innerHeight || (document.documentElement || document.body).clientHeight;
    },
    themes: ["3024-day","3024-night","ambiance-mobile","ambiance","base16-dark","base16-light","blackboard","cobalt","eclipse","elegant","erlang-dark","lesser-dark","mbo","midnight","monokai","neat","night","paraiso-dark","paraiso-light","pastel-on-dark","rubyblue","solarized","the-matrix","tomorrow-night-eighties","twilight","vibrant-ink","xq-dark","xq-light"],
		activeEle: false,
    confirmation: "Are you sure you wanna leave the page?\nSome of your code is unsaved...",
    autocomplete_reg: CodeMirror.commands.autocomplete
	});

  /*
  CodeMirror.hint.javascript = function(cm) {
    //appui.fn.log("HINT", cm, CodeMirror.hint);
    return CodeMirror.showHint(cm, CodeMirror.ternHint, {async: true, completeSingle: false});
  };
  */

  CodeMirror.on(window, "resize", function() {
    var showing = document.body.getElementsByClassName("CodeMirror-fullscreen")[0];
    if (!showing) return;
    showing.CodeMirror.getWrapperElement().style.height = $.ui.codemirror.winHeight() + "px";
  });

  $(window).bind("beforeunload", function(){
    var conf = false;
    $(".ui-codemirror", document.body).each(function(){
      if ( $(this).codemirror("isChanged") && $.isFunction($(this).codemirror("option", "save")) ){
        conf = 1;
        return false;
      }
    });
    if ( conf ){
      return $.ui.codemirror.confirmation;
    }
  });

}( jQuery ) );
