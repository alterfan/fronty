class Libraries {
    get usedLibs() {
        let used = local.getStorage("project.libraries");
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
        let o = this.usedLibs,
            libs = o.script,
            result = "";
        if (libs == "" || libs === undefined)
            return result;
        for (var i = 0; i < libs.length; i++) {
            var _script = libs[i],
                script = document.createElement("script");
            script.src = _script[0];
            script.type = "text/javascript";
            result += script.outerHTML;
        }
        return result;
    }
    linksHtml() {
        let o = this.usedLibs,
            libs = o.link;
        var result = "";
        if (libs === "" || libs === undefined)
            return result;
        for (var i = 0; i < libs.length; i++) {
            var _link = libs[i],
                link = document.createElement("link");
            if (_link !== undefined) {
                link.href = _link[0];
                link.rel = "stylesheet";
                result += link.outerHTML;
            }
        }
        return result;
    }
    appendLib(tag, url, name, version) {
        name = name === undefined ? "noname" : name;
        version = version === undefined ? "1.0" : version;
        let allLibs = this.usedLibs,
            allLibsTyped = allLibs[tag],
            newLib = [url, name, version];
        if (allLibsTyped.length + 1 >= 1) allLibs[tag].push(newLib);
        local.setStorage("project.libraries", allLibs);
        updatePreview();
    }
    changeLib(url,name,version,ID) {
        name = name === undefined ? "noname" : name;
        version = version === undefined ? "1.0" : version;
        let allLibs = this.usedLibs,
            newLib = [url, name, version, ID];
        if (allLibs[tag][ID] !== undefined) {
            allLibs[tag][ID] = newLib;
        }
        local.setStorageItem("project.libraries", tag, allLibs);
        updatePreview();
    }
    removeLib(tag, ID) {
        let allLibs = this.usedLibs,
            allLibsTyped = allLibs[tag];
        console.log(tag, ID, allLibs);
        allLibsTyped.splice(ID, 1);
        local.setStorage("project.libraries", allLibs);
        updatePreview();
        return true
    }
};
var libs = new Libraries();