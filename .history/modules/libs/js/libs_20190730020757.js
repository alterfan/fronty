const cdnjs = "https://cdnjs.cloudflare.com/ajax/";
const libraries = {
    "link": [
        ["./lib/normalize/8.0.1/normalize.min.css", "Normalize", "8.0.1"],
        ["./lib/twitter-bootstrap/4.3.1/css/bootstrap.css", "Bootstrap", "4.3.1"],
        ["./lib/font-awesome/4.7.0/css/font-awesome.css", "Font Awesome", "4.7.0"],
        ["./lib/animate.css/3.7.2/animate.min.css", "Animate.css", "3.7.2"],
        ["./lib/material-design-icons/3.0.1/iconfont/material-icons.min.css", "Material design icons", "3.0.1"]
    ],
    "script": [
        ["./lib/jquery/3.4.1/jquery.min.js", "jQuery", "3.4.1"],
        ["./lib/jqueryui/1.12.1/jquery-ui.min.js", "jQuery UI", "1.12.1"],
        ["./lib/twitter-bootstrap/4.2.1/bootstrap.min.js", "Bootstrap", "4.2.1"],
        ["./lib/react/16.8.6/umd/react.production.min.js", "React", "16.8.6"],
        ["./lib/react-dom/16.8.6/umd/react-dom.production.min.js", "React-DOM ", "16.8.6"]
    ]
};
class Libraries {
    get usedlib() {
        let used = ls.getStorage("project.libraries");
        if (!used || used !== "") {
            return used;
        } else {
            return {
                link: [],
                script: []
            };
        }
    }
    scriptsHtml() {
        let o = this.usedlib,
            lib = o.script,
            result = "";
        if (lib == "" || lib === undefined)
            return result;
        for (var i = 0; i < lib.length; i++) {
            var _script = lib[i],
                script = document.createElement("script");
            script.src = "./" + _script[0];
            script.type = "text/javascript";
            result += script.outerHTML;
        }
        return result;
    }
    linksHtml() {
        let o = this.usedlib,
            lib = o.link;
        var result = "";
        if (lib === "" || lib === undefined)
            return result;
        for (var i = 0; i < lib.length; i++) {
            var _link = lib[i],
                link = document.createElement("link");
            if (_link !== undefined) {
                link.href = "./" + _link[0];
                link.rel = "stylesheet";
                result += link.outerHTML;
            }
        }
        return result;
    }
    appendLib(tag, url, name, version) {
        name = name === undefined ? "noname" : name;
        version = version === undefined ? "1.0" : version;
        let alllib = this.usedlib,
            alllibTyped = alllib[tag],
            newLib = [url, name, version];
        if (alllibTyped.length + 1 >= 1) alllib[tag].push(newLib);
        ls.setStorage("project.libraries", alllib);
        updatePreview();
    }
    changeLib(url, name, version, ID) {
        name = name === undefined ? "noname" : name;
        version = version === undefined ? "1.0" : version;
        let alllib = this.usedlib,
            newLib = [url, name, version, ID];
        if (alllib[tag][ID] !== undefined) {
            alllib[tag][ID] = newLib;
        }
        ls.setStorageItem("project.libraries", tag, alllib);
        updatePreview();
    }
    removeLib(tag, ID) {
        let alllib = this.usedlib,
            alllibTyped = alllib[tag];
        alllibTyped.splice(ID, 1);
        ls.setStorage("project.libraries", alllib);
        updatePreview();
        return true
    }
};
var libs= new Libraries();
$(document).on("click", "[data-action=\"add-library\"]", (e) => {
    let type = $(e.target).attr("data-tag");
    switch (type) {
        case "script":
            $("#script-list").append(listItem(type, "", 0));
            break;
        case "link":
            $("#link-list").append(listItem(type, "", 0));
            break;
    }
});
$(document).on("click", "[data-action=\"delete-library\"]", (e) => {
    var $target = $(e.target);
    listItemRemove($target)
});
$(document).on("change", "[data-action=\"set-lib\"]", (e) => {
    let length;
    var tag = $(e.target).parent().attr("data-tag"),
        ID = $(e.target).attr("data-id"),
        url = $(e.target).val(),
        arr = $("[data-tag=\"" + tag + "\"]");
    for (const key in libraries) {
        if (libraries.hasOwnProperty(key)) {
            var arr = libraries[key];
            for (let i = 0; i < arr.length; i++) {
                if (url === arr[i][0]) url = url.replace(cdnjs, "./");
            }
        }
    }
    length = (arr.length);
    if (libs.usedlib[tag][ID] !== undefined) libs.changeLib(url, name || "", version || "", ID)
    for (let i = 0; i <= length; i++) {
        const element = arr[i];
    }
    libs.appendLib(tag, url, "", "");
});
function printList() {
    var LINK = lib.usedlib["link"];
    var SCRIPT = lib.usedlib["script"];
    for (let i = 0; i < LINK.length; i++) {
        var lib = LINK[i];
        if (lib !== undefined) {
            listItemAdd("link", lib[0], (i));
        }
    }
    for (let i = 0; i < SCRIPT.length; i++) {
        const lib = SCRIPT[i];
        if (lib !== undefined) {
            if (lib[0] == libraries.script[i][0]) lib[0].replace("./", cdnjs)
            listItemAdd("script", lib[0], i);
        }
    }
}
var listItemAdd = (type, value, id) => {
    var liLength = $("#script-list li").length,
        externallib = libraries[type],
        optionInnetHTML = "";
    value = value === undefined ? "" : value;
    for (let i = 0; i < externallib.length; i++) {
        const element = externallib[i];
        optionInnetHTML += "<option value=\"" + element[0] + "\">" + element[1] + " " + element[2] + "</option>"
    }
    switch (type) {
        case "script":
            $("#script-list").append(listItem(type, cdnjsUrl(value, libraries.script), id));
            break;
        case "link":
            $("#link-list").append(listItem(type, cdnjsUrl(value, libraries.link), id));
            break;
    }
};
var listItem = (type, value, id) => {
    let optionInnetHTML = null;
    for (let i = 0; i < libraries[type].length; i++) {
        var element = libraries[type][i];
        optionInnetHTML += "<option value=\"" + element[0] + "\">" + element[1] + " " + element[2] + "</option>"
    }
    var datalist = "<datalist id=\"libraries-" + type + "\">" + optionInnetHTML + "</datalist>",
        input = $("<input>", {
            "class": "group__input ",
            "list": "libraries-" + type,
            "data-action": "set-lib",
            "value": value === undefined ? "" : value,
            "placeholder": "type url, e.x.: http://anyurl.com/",
        });
    return "<li data-id=\"" + id + "\" data-tag=\"" + type + "\" class=\"group group__row group__control\">" +
        input.get(0).outerHTML + datalist +
        "<button data-action=\"delete-library\" class=\"group__btn material-icons\">delete</button></li>"
};
var listItemRemove = (elem) => {
    elem = elem.parent();
    let ID = elem.attr("data-id"),
        tag = elem.attr("data-tag");
    libs.removeLib(tag, ID)
    elem.remove();
};
function cdnjsUrl(value, Arr) {
    for (let i = 0; i < Arr.length; i++) {
        var check = Arr[i][0].localeCompare(value);
        if (check === 0) value = Arr[i][0].replace("./", cdnjs)
    }
    return value
}