var options = {
		theme: fronty,
		inputStyle: contenteditable,
		extraKeys: {
			"Ctrl-J": "toMatchingTag"
		},
		addModeClass: true,
		styleActiveLine: false,
		autoCloseBrackets: true,
		autoCloseTags: true,
		lineNumbers: true,
		lineWrapping: false,
		foldGutter: true,
		selectionsMayTouch: true,
		showCursorWhenSelecting: true,
		scrollbarStyle: null,
		cursorScrollMargin: 2,
		matchTags: true,
		matchBrackets: true,
		smartIndent: true
	},
	configuration = {
		delay: 500,
		fontSize: "12px",
		fontFamily: "Consolas",
		layout: "horizontal",
		direction: "default",
		miniMapWidth: "50px"
	};
var defaults = {
	"autosaved": ["<div class=\"container\">\n  <div class=\"bg\">\n<div class=\"img\">11111</div>\n    <div class=\"overlay\">\n      <h2>Check This <span>Out!</span></h2>\n      <p>this is some text.</p>\n    </div>\n  </div>\n  <div class=\"bg\">\n    <img src=\"\" alt=\"\">\n    <div class=\"overlay\">\n      <h2>Check This <span>Out!</span></h2>\n      <p>this is some text.</p>\n    </div>\n  </div>\n  <div class=\"bg\">\n    <img src=\"https://unsplash.it/400/200\" alt=\"\">\n    <div class=\"overlay\">\n      <h2>Check This Out!</h2>\n      <p>this is some text.</p>\n    </div>\n  </div>\n</div>", "*,\n*:before,\n*:after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.container {\n  width: 85vw;\n  margin: 1rem auto;\n}\n\n.bg,\n.overlay {\n  text-align: center;\n}\n\nimg,\n.overlay {\n  transition: .3s all;\n  border-radius: 3px;\n}\n\n.bg {\n  float: left;\n  max-width: 31%;\n  position: relative;\n  margin: .5%;\n}\n.bg .img {\n\n  width: 100%;\n  margin-bottom: -4px; -webkit-filter: blur(2px);\n  filter: blur(2px);\n}\n.bg .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.2);\n  color: #fff;\n  opacity: 0;\n}\n.bg .overlay h2 {\n  padding-top: 20%;\n  font-family: 'Droid Serif', serif;\n}\n.bg .overlay p {\n  font-family: 'Julius Sans One', sans-serif;\n}\n.bg:hover .overlay {\n  opacity: 1;\n}\n.bg:hover .img {\n  -webkit-filter: blur(2px);\n  filter: blur(2px);\n}\n\n@media screen and (max-width: 1148px) {\n  .bg {\n    max-width: 48%;\n    margin: 1%;\n  }\n}\n@media screen and (max-width: 768px) {\n  .bg {\n    float: none;\n    max-width: 80%;\n    margin: 1% auto;\n  }\n}\n", "console.log(\"test 1\")"],
	"data": {
		"id": "",
		"html": "",
		"css": "",
		"js": "",
		"csslibs": "",
		"jslibs": "",
		"name": "",
		"lastupdate": ""
	},
	"project": {
		"id": "1",
		"html": "<div class=\"container\">\n  <div class=\"bg\">\n<div class=\"img\">11111</div>\n    <div class=\"overlay\">\n      <h2>Check This <span>Out!</span></h2>\n      <p>this is some text.</p>\n    </div>\n  </div>\n  <div class=\"bg\">\n    <img src=\"\" alt=\"\">\n    <div class=\"overlay\">\n      <h2>Check This <span>Out!</span></h2>\n      <p>this is some text.</p>\n    </div>\n  </div>\n  <div class=\"bg\">\n    <img src=\"https://unsplash.it/400/200\" alt=\"\">\n    <div class=\"overlay\">\n      <h2>Check This Out!</h2>\n      <p>this is some text.</p>\n    </div>\n  </div>\n</div>",
		"css": "*,\n*:before,\n*:after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.container {\n  width: 85vw;\n  margin: 1rem auto;\n}\n\n.bg,\n.overlay {\n  text-align: center;\n}\n\nimg,\n.overlay {\n  transition: .3s all;\n  border-radius: 3px;\n}\n\n.bg {\n  float: left;\n  max-width: 31%;\n  position: relative;\n  margin: .5%;\n}\n.bg .img {\n\n  width: 100%;\n  margin-bottom: -4px; -webkit-filter: blur(2px);\n  filter: blur(2px);\n}\n.bg .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.2);\n  color: #fff;\n  opacity: 0;\n}\n.bg .overlay h2 {\n  padding-top: 20%;\n  font-family: 'Droid Serif', serif;\n}\n.bg .overlay p {\n  font-family: 'Julius Sans One', sans-serif;\n}\n.bg:hover .overlay {\n  opacity: 1;\n}\n.bg:hover .img {\n  -webkit-filter: blur(2px);\n  filter: blur(2px);\n}\n\n@media screen and (max-width: 1148px) {\n  .bg {\n    max-width: 48%;\n    margin: 1%;\n  }\n}\n@media screen and (max-width: 768px) {\n  .bg {\n    float: none;\n    max-width: 80%;\n    margin: 1% auto;\n  }\n}\n",
		"js": "console.log(\"/test 1\"/)",
		"csslibs": "",
		"jslibs": "",
		"name": "test 1",
		"lastupdate": "1.1.2019"
	}
}