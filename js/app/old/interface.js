var $modal = $("#modal"),
    $livecode_input = $(".livecode_input"),
    $wrapper = $("#wrapper"),
    $wrapper_block = $(".wrapper_block"),
    $overlay = $('#overlay');
class UserInterface {
    /* Изменение Макета  */
    changeLayout(newNum) {
        var wl = "wrapper-layout",
            wbl = "wrapper_block-layout";
        var activeNum = $wrapper.attr("data-layout");
        if (activeNum == newNum) {
            alert("active layout")
        } else if (newNum == "") {
            newNum = 1;
            $wrapper.fadeOut("fast");
            $wrapper.removeClass(wl + activeNum).addClass(wl + newNum).attr("data-layout", newNum);
            $wrapper_block.removeClass(wbl + activeNum).addClass(wbl + newNum);
            setTimeout(function() {
                storage.setKey("local", frontyOptions, "layout", newNum);
                $wrapper.fadeIn("fast");
            }, 300);
        } else {
            $wrapper_block.fadeOut(300);
            setTimeout(function() {
                $wrapper.removeClass(wl + activeNum).addClass(wl + newNum).attr("data-layout", newNum);
                $wrapper_block.removeClass(wbl + activeNum).addClass(wbl + newNum);
                storage.setKey("local", frontyOptions, "layout", newNum);
            }, 300);
            $wrapper_block.fadeIn(300);
        }
    }
    /* полноэкранный режим */
    toggleFullScreen(el) {
        num = el.attr('data-editor');
        if (!$("#wrapper_block" + num).hasClass('full')) {
            $(this).addClass('active');
            $(".wrapper_block").addClass('minifed');
            $("#wrapper_block" + num).addClass('full').removeClass('minifed');
        } else {
            $(this).removeClass('active');
            $("#wrapper_block" + num).removeClass('full');
            $(".wrapper_block").removeClass('minifed');
        }
    }
    /* modal */
    openModal(el) {
        var view = el.attr('data-view');
        $overlay.fadeIn(150);
        $wrapper.addClass("wrapper-blur");
        setTimeout(function() {
            $modal.removeClass('closed').fadeIn(300).find('.fronty_modal_content').load('views/' + view + '.html ');
        }, 300);
    }
    closeModal() {
        $modal.fadeOut(150);
        setTimeout(function() {
            $overlay.fadeOut(150);
            $wrapper.removeClass("wrapper-blur");
            $modal.addClass('closed').find('.fronty_modal_content').html("");
        }, 300)
    }
    modalToggle(el) {
        if ($modal.hasClass('closed')) {
            this.openModal(el);
        }
        if (!$modal.hasClass('closed')) {
            this.closeModal(el);
        }
    }
    close() {
        var self = this;
        let a = $('.aside_left');
        if (!a.hasClass('closed')) {
            setTimeout(function() {
                $overlay.fadeOut(150);
                $wrapper.removeClass("wrapper-blur");
                a.addClass('closed').find(".aside_content").html('');
            }, 300)
        }
        if (!$modal.hasClass('closed')) {
            self.closeModal()
        }
    }
    asideToggle($el) {
        var self = this,
            view = $el.attr('data-view');
        let side = $el.attr('data-block');
        let a = $('.' + side);
        if (a.hasClass('closed')) {
            $overlay.fadeIn(150);
            $wrapper.addClass("wrapper-blur");
            a.removeClass('closed').find(".aside_content").load('views/' + view + '.html ');
        } else {
            $overlay.fadeOut(150);
            $wrapper.removeClass("wrapper-blur");
            a.addClass('closed').find(".aside_content").html("");
        }
    }
    inputAction(el) {
        if (el.hasClass('isBlured')) {
            el.removeClass('isBlured').addClass('isFocused');
        } else if (el.hasClass('isFocused')) {
            el.addClass('isBlured').removeClass('isFocused');
        }
    }
    deleteLib(el) {
        el.parents('.externalUrl').remove();
    }
    addExternalInput(type, val) {
        if (!val) {
            $('#' + type + 'Urls').append(this._input(type, ''));
        } else {
            $('#' + type + 'Urls').append(this._input(type, val));
        }
    }
    consoleToggle() {
        if ($(".console").hasClass('closed')) {
            $(".console").removeClass('closed')
        }
        if ($(".console").hasClass('opened')) {
            $(".console").addClass('closed')
        }
    }
    rotateToggle($el) {
        if (!$el.hasClass('rotated')) {
            $el.addClass('rotated')
        } else {
            $el.removeClass('rotated')
        }
    }
    message(mtype, mtext) {
        let $not = $("#notification");
        if ($not.hasClass('closed')) {
            $('[data-action="messageText"]').html('<span class="group_text message_type">' + mtype + ':</span><span class="group_text message_text">' + mtext + '</span>');
            $not.removeClass("closed");
            setTimeout(function() {
                $not.addClass("closed")
            }, 5000)
        }
    }
    _input(type, val) {
        let _move = '<a class="group_btn material-icons" placeholder="move" data-type="' + type + '">unfold_more</a>';
        let _input = '<input type="text" class="group_input ' + type + 'Input" placeholder="Add External Stylesheet URL" value="' + val + '">';
        let _delete = '<a class="group_btn material-icons" placeholder="delete"  data-action="deleteLib" data-type="' + type + '">clear</a>';
        return '<div class="externalUrl group_form group_form-start draggble">' + _move + _input + _delete + '</div>';
    }
    $li(id, name, updated_at, description) {
        var self = this;
        return "<li id='" + id + "' data-action='openProject' class='group_list_li animated fadeIn'>" + self.$card(id, name, updated_at, description) + "</li>";
    }
    $icon(id, icon) {
        return "<a class='group_btn' data-id='" +
            id + "'data-action='deleteProject'><i class='material-icons'>" + icon + "</i></a>"
    }
    $card(id, name, updated_at, description) {
        var self = this;
        return self.$icon(id, "drag_handle") +
            "<div class='group_card'><h2>" +
            name +
            "</h2><span>" +
            updated_at +
            "</span><p>" + description +
            "</p></div>" +
            self.$icon(id, "clear");
    }
};
var ui = new UserInterface();
// Load config, set defaults, align UI
var config = {};
if (typeof(Storage) !== "undefined") {
    // Set default Web Storage values
    if (localStorage.getItem("layout") === null) localStorage.setItem("layout", "horizontal");
    if (localStorage.getItem("styleActiveLine") === null) localStorage.setItem("styleActiveLine", "false");
    if (localStorage.getItem("matchSets") === null) localStorage.setItem("matchSets", "true");
    if (localStorage.getItem("lineNumbers") === null) localStorage.setItem("lineNumbers", "true");
    if (localStorage.getItem("theme") === null) localStorage.setItem("theme", "default");
    if (localStorage.getItem("smartIndent") === null) localStorage.setItem("smartIndent", "false");
    if (localStorage.getItem("showInfoBox") === null) localStorage.setItem("showInfoBox", "false");
    if (localStorage.getItem("codeFold") === null) localStorage.setItem("codeFold", "false");
    // Load Web store values into UI
    document.getElementById("chkActiveLine").checked = JSON.parse(localStorage.getItem("styleActiveLine"));
    document.getElementById("chkSmartIndent").checked = JSON.parse(localStorage.getItem("smartIndent"));
    document.getElementById("chkMatchSets").checked = JSON.parse(localStorage.getItem("matchSets"));
    document.getElementById("chkLineNumbers").checked = JSON.parse(localStorage.getItem("lineNumbers"));
    document.getElementById("chkInfoBox").checked = JSON.parse(localStorage.getItem("showInfoBox"));
    if (JSON.parse(localStorage.getItem("showInfoBox"))) document.getElementById("info-box").style.display = "flex";
    document.getElementById("chkCodeFold").checked = JSON.parse(localStorage.getItem("codeFold"));
    document.getElementById("theme").value = localStorage.getItem("theme");
}
// Editor Pane
window.editor = CodeMirror.fromTextArea(document.getElementById("taCode1"), {
    addModeClass: true,
    autoRefresh: true,
    cursorScrollMargin: 2,
    extraKeys: {
        //"Ctrl-Space": "autocomplete",
        "Ctrl-J": "toMatchingTag",
        "Ctrl-Q": function(cm) {
            cm.foldCode(cm.getCursor());
        },
        "F11": function(cm) {
            toggleFullScreen(document.getElementById("container"));
        },
        "Alt-F": "findPersistent"
    },
    fixedGutter: false,
    foldGutter: JSON.parse(localStorage.getItem("codeFold")),
    gutters: ["CodeMirror-lint-markers", "CodeMirror-foldgutter", "CodeMirror-linenumbers"],
    highlightSelectionMatches: {
        showToken: /\w/,
        annotateScrollbar: true
    },
    htmlMode: true,
    lineNumbers: JSON.parse(localStorage.getItem("lineNumbers")),
    lineWrapping: true,
    lint: true,
    matchBrackets: JSON.parse(localStorage.getItem("matchSets")),
    matchTags: JSON.parse(localStorage.getItem("matchSets")) ? {
        bothTags: true
    } : false,
    // mode: "javascript",
    mode: "htmlmixed",
    scrollbarStyle: "overlay",
    smartIndent: JSON.parse(localStorage.getItem("smartIndent")),
    styleActiveLine: JSON.parse(localStorage.getItem("styleActiveLine"))
});
// Preview Pane
var delay;
window.editor.on("change", function() {
    clearTimeout(delay);
    sessionStorage.setItem('history', JSON.stringify(window.editor.doc.getHistory()));
    delay = setTimeout(updatePreview, 300);
});
document.getElementById("preview").addEventListener("resize", updateInfoBox);
function updatePreview() {
    var frame = document.getElementById("preview-frame");
    var iframeDoc = frame.contentDocument || frame.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(window.editor.getValue());
    iframeDoc.close();
    sessionStorage.setItem('editedText', window.editor.getValue());
    if (true) updateInfoBox(); // update with config once ready
}
function updateInfoBox() {
    var frame = document.getElementById("preview");
    var title = frame.contentDocument.title;
    var width = frame.clientWidth;
    var height = frame.clientHeight;
    var s = "";
    s += "<span>Title: " + title + "</span>";
    s += "<span>" + width + "x" + height + "</span>";
    var infoBox = document.getElementById("info-box")
    infoBox.innerHTML = s;
    // if (infoBox.clientWidth < frame.clientWidth) infoBox.style.width = frame.clientWidth - 5;
}
// Theme Selection
var selTheme = document.getElementById("theme");
selTheme.addEventListener("input", selectTheme);
function selectTheme() {
    var theme = selTheme.options[selTheme.selectedIndex].textContent;
    localStorage.setItem("theme", theme);
    editor.setOption("theme", theme);
    // location.hash = "#" + theme;
}
// Toolbar
document.getElementById("toolbar").addEventListener("click", toolbarCallback);
function toolbarCallback(e) {
    var sw;
    if (e.target.nodeName == "LABEL") {
        return;
    } else if (e.target.nodeName == "INPUT" || e.target.nodeName == "SELECT") {
        sw = e.target.id;
    } else {
        sw = e.target.parentNode.id;
    }
    switch (sw) {
        case 'cmdRevert':
            window.editor.setValue(sessionStorage.getItem('originalText'));
            break;
        case 'cmdUndo':
            window.editor.execCommand('undo');
            break;
        case 'cmdRedo':
            window.editor.execCommand('redo');
            break;
        case 'cmdClear':
            window.editor.setValue("");
            break;
        case 'cmdDownload':
            saveToFile(e.target.parentNode);
            break;
        case 'cmdSearch':
            window.editor.execCommand('find');
            break;
        case 'cmdOrient':
            setLayout(true);
            break;
        case 'cmdFullscreen':
            toggleFullScreen(document.getElementById("container"));
            break;
        case 'cmdHelp':
            modal.style.display = "block";
            break;
        case 'chkActiveLine':
            localStorage.setItem("styleActiveLine", e.target.checked);
            window.editor.setOption("styleActiveLine", e.target.checked);
            break;
        case 'chkMatchSets':
            localStorage.setItem("matchSets", e.target.checked);
            window.editor.setOption("matchBrackets", e.target.checked);
            window.editor.setOption("matchTags", (e.target.checked) ? {
                bothTags: true
            } : false);
            break;
        case 'chkLineNumbers':
            localStorage.setItem("lineNumbers", e.target.checked);
            window.editor.setOption("lineNumbers", e.target.checked);
            window.editor.refresh();
            // window.editor.setOption("gutters", gutters);
            break;
        case 'chkSmartIndent':
            localStorage.setItem("smartIndent", e.target.checked);
            window.editor.setOption("smartIndent", e.target.checked);
            break;
        case 'chkCodeFold':
            localStorage.setItem("codeFold", e.target.checked);
            // var gutters = window.editor.getOption("gutters");
            // var index = gutters.indexOf("CodeMirror-foldgutter");
            // if (e.target.checked) { // Add if not found
            //   if (index < 0) gutters.push("CodeMirror-foldgutter");
            // } else {  // Remove if found
            //   if (index > -1) gutters.splice(index, 1);
            // }
            // window.editor.setOption("gutters", gutters);
            window.editor.setOption("foldGutter", e.target.checked);
            break;
        case 'chkInfoBox':
            localStorage.setItem("showInfoBox", e.target.checked);
            if (e.target.checked) {
                document.getElementById("info-box").style.display = "flex";
            } else {
                document.getElementById("info-box").style.display = "none";
            }
            break;
        default:
            console.log(sw + " not found in toolbar configuration.");
    }
}
var modal = document.getElementById('modal');
document.getElementsByClassName("close")[0].addEventListener("click", function() {
    modal.style.display = "none";
});
window.addEventListener("click", function(event) { // When the user clicks anywhere outside of the modal, close it
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
/// Save Button
var textFile = null;
function saveToFile(e) {
    var ext = ".txt";
    var type = "text/plain";
    switch (window.editor.options.mode) {
        case "html":
        case "text/html":
            ext = "html";
            break;
        case "javascript":
            ext = "js";
            break;
        case "css":
            ext = "css";
            break;
        default:
    }
    var data = new Blob([window.editor.getValue()], {
        type: type
    });
    saveAs(data, "download." + ext);
}
/// Fullscreen Button
function toggleFullScreen(e) {
    e.requestFullScreen = e.requestFullScreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullScreen;
    if (document.fullScreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            document.fullScreenElement = null;
            document.exitFullscreen = null;
            document.getElementById("cmdFullscreen").children["0"].classList.remove("fa-compress");
            document.getElementById("cmdFullscreen").children["0"].classList.add("fa-expand");
            document.getElementById("cmdFullscreen").children["1"].innerText = "Fullscreen";
        }
    } else {
        if (e.requestFullScreen) { // Native full screen.
            e.requestFullScreen.call(e);
            document.fullScreenElement = document.fullScreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || document.msFullscreenElement;
            document.exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozExitFullscreen || document.msExitFullscreen;
            var test = document.getElementById("cmdFullscreen");
            document.getElementById("cmdFullscreen").children["0"].classList.remove("fa-expand");
            document.getElementById("cmdFullscreen").children["0"].classList.add("fa-compress");
            document.getElementById("cmdFullscreen").children["1"].innerText = "Exit Fullscreen (F11 or ESC)";
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }
}
// Split and Layout
var split;
function setLayout(toggle) {
    var layout = localStorage.getItem("layout");
    if (toggle) {
        if (layout == 'horizontal') {
            layout = 'vertical';
        } else {
            layout = 'horizontal';
        }
    }
    if (split) {
        split.destroy();
        split = null;
    }
    var sizes = localStorage.getItem('split-sizes')
    if (sizes) {
        sizes = JSON.parse(sizes)
    } else {
        sizes = [50, 50] // default sizes
    }
    split = Split(["#editor", "#preview"], {
        sizes: sizes,
        minSize: 200,
        direction: layout,
        onDrag: function() {
            updateInfoBox();
        },
        onDragEnd: function() {
            window.editor.setSize();
            // window.editor.refresh();
            updateInfoBox();
            localStorage.setItem('split-sizes', JSON.stringify(split.getSizes()));
        }
    });
    if (layout == 'horizontal') {
        document.getElementById("panel").classList.remove("vertical");
        document.getElementById("panel").classList.add("horizontal");
        localStorage.setItem("layout", "horizontal");
    } else {
        document.getElementById("panel").classList.remove("horizontal");
        document.getElementById("panel").classList.add("vertical");
        localStorage.setItem("layout", "vertical");
    }
    config.layout = !config.layout;
    window.editor.setSize();
    updateInfoBox();
}
// Store original text for Revert and load any edits stored in Session Storage
var origText = document.getElementById("taCode1").value;
if (sessionStorage.getItem('originalText') != document.getElementById("taCode1").value) { // If new Original Text loaded, then clear things up
    sessionStorage.setItem('originalText', document.getElementById("taCode1").value);
    sessionStorage.removeItem('editedText');
    sessionStorage.removeItem('history');
} else {
    window.editor.setValue(sessionStorage.getItem('editedText'));
    if (sessionStorage.getItem('history') != null) {
        window.editor.doc.setHistory(JSON.parse(sessionStorage.getItem('history')));
    }
}
// Init
setTimeout(function() {
    setLayout();
    selectTheme();
    updatePreview();
}, 300);