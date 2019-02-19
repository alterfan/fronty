const editorDefaults = {
	theme: "night",
	styleActiveLine: false,
	autoCloseBrackets: true,
	lineNumbers: true,
	lineWrapping: true,
	autoCloseTags: true,
	matchBrackets: true,
	showCursorWhenSelecting: true,
	scrollbarStyle: "simple",
	matchTags: true,
	foldGutter: true,
	gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
	matchTags: {
		bothTags: true
	},
	extraKeys: {
		"Ctrl-Q": "toMatchingTag",
		'Ctrl-K': function (cm, event) {
			cm.state.colorpicker.popup_color_picker();
		}
	},
	beautify: {
		initialBeautify: true,
		autoBeautify: false
	},
	colorpicker : {
		mode : 'edit',
	}
};
const frontyDefaults = {
	fontSize: "16px",
	fontFamily: "Consolas",
	layout: "1",
};
const editorOptions = 'editorOptions';
const frontyOptions = 'frontyOptions';
const frontyData = {
	editorOptions: editorDefaults, //editorOptions
	frontyOptions: frontyDefaults //styleOptions
};
const autosave = 'autosave';
const fronty = 'fronty';
const projects = 'projects';
const stylesheetArr = ['https://use.fontawesome.com/releases/v5.6.3/css/all.css'];
const javascriptArr = ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'];
const autosaveDefault = {
	autosave: ['<h1>Console Test</h1>', 'h1{color:#fff;background:#372963;border:none;border-radius:3px}', 'console.log("test");console.error("test");console.warn("test");console.info("test");console.debug("test");', stylesheetArr, javascriptArr]
};
const externalUrl = '<div class="externalUrl group_form group_form-start"><a class="group_btn material-icons" placeholder="delete">unfold_more</a><input type="text" class="group_input js-lib" placeholder="Add External Stylesheet URL"><a class="group_btn material-icons" onclick="$(this).parent().remove()" placeholder="delete">clear</a></div>';