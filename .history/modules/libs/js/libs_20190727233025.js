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
        let length, cdnjs = "https://cdnjs.cloudflare.com/ajax/";
        var tag = $(e.target).parent().attr("data-tag"),
            ID = $(e.target).attr("data-id"),
            url = $(e.target).val(),
            arr = $("[data-tag=\"" + tag + "\"]");
        url = url.replace("https://cdnjs.cloudflare.com/ajax/", tag == "script" ? "./" : "");
        length = (arr.length);
        if (libs.usedLibs[tag][ID] !== undefined) libs.changeLib(url, name || "", version || "", ID)
        for (let i = 0; i <= length; i++) {
            const element = arr[i];
        }
        libs.appendLib(tag, url, "", "");
    });

    function printList() {
        var LINK = libs.usedLibs["link"];
        var SCRIPT = libs.usedLibs["script"];
        for (let i = 0; i < LINK.length; i++) {
            const lib = LINK[i];
            if (lib !== undefined) listItemAdd("link", "https://cdnjs.cloudflare.com/ajax/" + lib[0], (i));
        }
        for (let i = 0; i < SCRIPT.length; i++) {
            const lib = SCRIPT[i];
            if (lib !== undefined) listItemAdd("script", "https://cdnjs.cloudflare.com/ajax/" + lib[0], i);
        }
    }
    var listItemAdd = (type, value, id) => {
        var liLength = $("#script-list li").length,
            externalLibs = libraries[type],
            optionInnetHTML = "";
        value = value === undefined ? "" : value;
        for (let i = 0; i < externalLibs.length; i++) {
            const element = externalLibs[i];
            optionInnetHTML += "<option value=\"" + element[0] + "\">" + element[1] + " " + element[2] + "</option>"
        }
        switch (type) {
            case "script":
                $("#script-list").append(listItem(type, value, id));
                break;
            case "link":
                $("#link-list").append(listItem(type, value, id));
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
                "value": value === undefined ? "" : value.replace("./", "https://cdnjs.cloudflare.com/ajax/"),
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