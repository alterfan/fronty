const local_data = ["workspace-config", "app.ui", "codemirror.options", "project.name", "project.libraries", "project.htmlmixed", "project.css", "project.javascript"];
const defaults = {
    "workspace": {
        "delay": 500,
        "font-size": "12px",
        "font-family": "Consolas",
        "autoupdate": true,
        "sidebar-left-splited": false,
        "sidebar-right-splited": false,
        direction: "vertical",
        "editors": {
            direction: "horizontal",
            instances: [{
                    id: "1",
                    mode: "htmlmixed"
                },
                {
                    id: "2",
                    mode: "css"
                },
                {
                    id: "3",
                    mode: "javascript",
                }
            ]
        },
    },
    "app.ui": {
        "layout": "horizontal",
        "direction": "horizontal"
    },
    "codemirror.options": {
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
        "toolBar": true,
        "matchBrackets": true
    },
    "project.name": "Demo Project",
    "project.libraries": {
        link: [
            ["lib/twitter-bootstrap/4.3.1/css/bootstrap.css", "Bootstrap", "4.3.1", "0"]
        ],
        script: [
            ["lib/jquery/3.4.1/jquery.min.js", "jQuery", "3.4.1", "0"]
        ]
    },
    "htmlmixed__1": "<a class=\"btn\"> \n alert \n </a>",
    "css__2": ".btn{ \n background:cyan; \n }",
    "javascript__3": "$(\".btn\").on(\"click\",()=>{ \n alert(); \n })",
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