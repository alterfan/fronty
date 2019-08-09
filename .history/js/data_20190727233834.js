const local_data = ["app.config", "app.ui", "editor.options", "project.name", "project.libraries", "project.htmlmixed", "project.css", "project.javascript"];
const defaults = {
    "app.config": {
        "delay": 500,
        "font-size": "12px",
        "font-family": "Consolas",
        "dev-mode": false,
        "autoupdate": true
    },
    "app.ui": {
        "layout": "horizontal",
        "direction": "horizontal"
    },
    "editor.options": {
        "tabMode": "indent",
        "theme": "dracula",
        "lineNumbers": true,
        "lineWrapping": false,
        "autoCloseTags": true,
        "smartIndent": true,
        "lineWrapping": false,
        foldGutter: true,
        "gutters": ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        "miniMap": true,
        "matchBrackets": true
    },
    "project.name": "Demo Project",
    "project.libraries": {
        link: [
            ["libs/twitter-bootstrap/4.3.1/css/bootstrap.css", "Bootstrap", "4.2.1", "0"]
        ],
        script: [
            ["libs/jquery/3.4.1/jquery.min.js", "jQuery", "3.4.1", "0"]
        ]
    },
    "project.htmlmixed": "<a class=\"btn\"> \n alert \n </a>",
    "project.css": ".btn{ \n background:cyan; \n }",
    "project.javascript": "$(\".btn\").on(\"click\",()=>{ \n alert(); \n })"
};
const project_data_template = {
    name: "",
    editors: [],
    libraries: {
        link: [],
        script: []
    }
}
const bindings = {
    "Ctrl-H": "replace",
    "Shift-Ctrl-]": "unfold",
    "Shift-Ctrl-[": "fold",
    "Shift-Ctrl-F3": "findUnderPrevious",
    "Ctrl-F3": "findUnder",
    "Ctrl-Alt-Down": "addCursorToNextLine",
    "Ctrl-Alt-Up": "addCursorToPrevLine",
    "Ctrl-K Ctrl-J": "unfoldAll",
    "Ctrl-K Ctrl-0": "unfoldAll",
    "Ctrl-K Ctrl-Backspace": "delLineLeft",
    "Ctrl-K Ctrl-G": "clearBookmarks",
    "Ctrl-K Ctrl-C": "showInCenter",
    "Ctrl-K Ctrl-Y": "sublimeYank",
    "Ctrl-K Ctrl-X": "swapWithSublimeMark",
    "Ctrl-K Ctrl-W": "deleteToSublimeMark",
    "Ctrl-K Ctrl-A": "selectToSublimeMark",
    "Ctrl-K Ctrl-Space": "setSublimeMark",
    "Ctrl-K Ctrl-L": "downcaseAtCursor",
    "Ctrl-K Ctrl-U": "upcaseAtCursor",
    "Ctrl-K Ctrl-K": "delLineRight",
    "Backspace": "smartBackspace",
    "Alt-F2": "selectBookmarks",
    "Shift-Ctrl-F2": "clearBookmarks",
    "Ctrl-F2": "toggleBookmark",
    "Shift-F2": "prevBookmark",
    "F2": "nextBookmark",
    "Ctrl-F9": "sortLinesInsensitive",
    "F9": "sortLines",
    "Shift-Ctrl-D": "duplicateLine",
    "Ctrl-J": "joinLines",
    "Ctrl-/": "toggleCommentIndented",
    "Shift-Ctrl-Down": "swapLineDown",
    "Shift-Ctrl-Up": "swapLineUp",
    "Ctrl-M": "goToBracket",
    "Shift-Ctrl-M": "selectBetweenBrackets",
    "Shift-Ctrl-Space": "selectScope",
    "Ctrl-D": "selectNextOccurrence",
    "Shift-Ctrl-Enter": "insertLineBefore",
    "Ctrl-Enter": "insertLineAfter",
    "Esc": "singleSelectionTop",
    "Shift-Ctrl-L": "splitSelectionByLine",
    "Ctrl-L": "selectLine",
    "Ctrl-Down": "scrollLineDown",
    "Ctrl-Up": "scrollLineUp",
    "Alt-Right": "goSubwordRight",
    "Alt-Left": "goSubwordLeft",
    "Ctrl-T": "transposeChars",
    "Alt-Q": "wrapLines",
    "Shift-Ctrl-K": "deleteLine",
    "Shift-Tab": "indentLess",
    'Ctrl-=': () => console.log('ctrl +'), // now working
    'Ctrl--': () => console.log('ctrl -')
}
const libraries = {
    "link": [
        ["https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css", "Normalize", "8.0.1"],
        ["https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/css/bootstrap.css", "Bootstrap", "4.2.1"],
        ["https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css", "Font Awesome", "4.7.0"],
        ["https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css", "Animate.css", "3.7.2"],
        ["https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css", "Material design icons", "3.0.1"]
    ],
    "script": [
        ["https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", "jQuery", "3.4.1"],
        ["https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js", "jQuery UI", "1.12.1"],
        ["https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/bootstrap.min.js", "Bootstrap", "4.2.1"],
        ["https://cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.production.min.js", "React", "16.8.6"],
        ["https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.production.min.js", "React-DOM ", "16.8.6"]
    ]
};
const themes = ["3024-day.css",
    "3024-night.css",
    "ambiance.css",
    "base16-dark.css",
    "base16-light.css",
    "blackboard.css",
    "cobalt.css",
    "eclipse.css",
    "elegant.css",
    "erlang-dark.css",
    "myFront.css",
    "lesser-dark.css",
    "mbo.css",
    "mdn-like.css",
    "midnight.css",
    "monokai.css",
    "neat.css",
    "neo.css",
    "night.css",
    "paraiso-dark.css",
    "paraiso-light.css",
    "pastel-on-dark.css",
    "rubyblue.css",
    "solarized.css",
    "the-matrix.css",
    "tomorrow-night-bright.css",
    "tomorrow-night-eighties.css",
    "twilight.css",
    "vibrant-ink.css",
    "xq-dark.css",
    "xq-light.css"
];