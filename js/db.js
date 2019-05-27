var db_, _db = {};
_db.db; // буфер для e.target.result
_db.name = "fronty"; //  название базы данных;
_db.storeName = "projects"; //  название хранилища данных objectStore;
_db.data = [];
_db.version = 1;
_db.empty = true;
class LocalStorageDB {
    constructor(data, _this) {
        this.ready = false;
        this.init(data, this)
    }
    init(data, _this) {
        for (var key in data) {
            var storeDefaults = data[key];
            localStorage.setItem(key, JSON.stringify(storeDefaults));

        }
        this.ready = true;
    }
    getStorageItem(objectName, keyN) {
        let data = localStorage.getItem(objectName);
        return JSON.parse(data)[keyN]
    }
    setStorageItem(objectName, keyN, val) {
        var data = this.getStorage(objectName);
        data[keyN] = val;
        localStorage.setItem(objectName, JSON.stringify(data));
    }
    getStorage(objectName) {
        var data = localStorage.getItem(objectName)
        if (data == undefined) {} else {
            return JSON.parse(data)
        }
    }
    setStorage(objectName, val) {
        localStorage.setItem(objectName, JSON.stringify(val))
    }
}
class LocalDB extends LocalStorageDB {
    constructor(json) {
        super()
        this._openDb();
    }
    _openDb() {
        var self = this;
        var indexedDB =
            window.indexedDB ||
            window.webkitIndexedDB ||
            window.mozIndexedDB ||
            window.msIndexedDB;
        var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
        if (!indexedDB) {
            alert("Sorry indexedDB not have support");
        }
        var request = indexedDB.open(_db.name, _db.version);
        request.onupgradeneeded = function(e) {
            var getDB = e.target.result;
            if (!getDB.objectStoreNames.contains(_db.storeName)) {
                var objectStore = getDB.createObjectStore(_db.storeName, {
                    keyPath: "id",
                    autoIncrement: true
                });
                objectStore.createIndex("name", "name", {
                    unique: false
                });
                objectStore.createIndex("html", "html", {
                    unique: false
                });
                objectStore.createIndex("css", "css", {
                    unique: false
                });
                objectStore.createIndex("js", "js", {
                    unique: false
                });
                objectStore.createIndex("csslibs", "csslibs", {
                    unique: false
                });
                objectStore.createIndex("jslibs", "cslibs", {
                    unique: false
                });
                objectStore.createIndex("created_at", "created_at", {
                    unique: false
                });
                objectStore.createIndex("updated_at", "updated_at", {
                    unique: false
                });
                objectStore.createIndex("description", "description", {
                    unique: false
                });
            }
        };
        request.onsuccess = function(e) {
            var now = new Date(Date.now());
            db_ = _db.db = e.target.result;
            for (var i = 0; i < 4; i++) {
                db_.transaction([_db.storeName], "readwrite").objectStore(_db.storeName).add({
                    id: i,
                    name: "test " + i,
                    html: "<h1>test " + i + "</h1>",
                    css: "h1{color:blue}",
                    js: "",
                    cssLibs: "",
                    jsLibs: "",
                    created_at: (new Date(Date.UTC(2012, 11, 12, 3, 0, 0))).toLocaleString(),
                    updated_at: now.toLocaleString(),
                    description: "Project description text. Any text"
                });
            }
        };
    }
    viewAll() {
        var self = this;
        db_ = _db.db;
        var transaction = db_.transaction([_db.storeName], "readwrite");
        var content = "";
        transaction.oncomplete = function(e) {
            $("#projectlist").html(content);
        };
        transaction.onerror = function(e) {};
        var store = transaction.objectStore(_db.storeName);
        store.openCursor().onsuccess = function(e) {
            var cursor = e.target.result;
            if (cursor) {
                content += li(cursor.value.id, cursor.value.name, cursor.value.updated_at, cursor.value.description)
                cursor.continue();
            } else {
                content += " ";
            }
        };
    }
    openProjects(id) {
        db_ = _db.db;
        var transaction = localStorageDB.transaction([_db.storeName], "readwrite");
        transaction.oncomplete = function(e) {
            return content;
        };
        transaction.onerror = function(e) {};
        var store = transaction.objectStore(_db.storeName);
        store.get(id).onsuccess = function(e) {
            db_ = _db.db = e.target.result;
            alert(localStorageDB.cout)
            _db.data.push()
        };
    }
    add() {
        var self = this;
        db_ = _db.db;
        var transaction = localStorageDB.transaction([_db.storeName], "readwrite");
        transaction.oncomplete = function(event) {};
        transaction.onerror = function(event) {};
        var objectStore = localStorageDB
            .transaction([_db.storeName], "readwrite")
            .objectStore(_db.storeName)
            .add({});
        self.viewAll();
    }
    delete(id) {
        var self = this;
        db_ = _db.db;
        var key = Number(id.attr('data-id'));
        localStorageDB.transaction([_db.storeName], "readwrite").objectStore(_db.storeName).delete(key);
        $('#' + id).remove();
    }
    deleteDB() {
        var req = indexedDB.deleteDatabase(_db.name);
        req.onsuccess = function() {};
        req.onerror = function() {};
        req.onblocked = function() {
            console.log(
                "Couldn't delete database(" +
                _db.name +
                ") due to the operation being blocked"
            );
        };
    }
}
/*======  Helper functions  ======*/
function li(id, name, updated_at, description) {
    return "<li id='" + id + "' data-action='openProject' class='group_list_li'>" + card(id, name, updated_at, description) + "</li>";
}

function icon(id, icon) {
    return "<a class='group_btn' data-id='" +
        id + "'data-action='deleteProject'><i class='material-icons'>" + icon + "</i></a>"
}

function card(id, name, updated_at, description) {
    return icon(id, "drag_handle") +
        "<div class='group_card'><h2>" +
        name +
        "</h2><span>" +
        updated_at +
        "</span><p>" + description +
        "</p></div>" +
        icon(id, "clear");
}

function formatDate(d) {
    var dd = d.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = d.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yy = d.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
    return dd + '.' + mm + '.' + yy;
}