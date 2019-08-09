class Local {
    getStorageItem(objectName, keyN) {
        let data = this.getStorage(objectName);
        return data
    }
    setDefault(objectName) {
        for (var k in defaults) {
            this.setStorage(objectName, defaults[objectName])
        }
    }
    setStorageItem(objectName, keyN, val) {
        var data = this.getStorage(objectName);
        data[keyN] = val;
        this.setStorage(objectName, data);
    }
    getStorage(objectName) {
        var data;
        data = localStorage.getItem(objectName);
        if (data == undefined || data == null || data == "") {
            this.setStorage(objectName, defaults[objectName]);
            data = localStorage.getItem(objectName);
            data = JSON.parse(data);
        } else {
            data = JSON.parse(data);
        }
        return data
    }
    setStorage(objectName, val) {
        localStorage.setItem(objectName, JSON.stringify(val))
    }
}
for (const key in defaults) {
    if (localStorage.getItem(key) === undefined) {
        localStorage.setItem(key, defaults[key])
    }
}
var local = new Local();