var db_, _db = {};
_db.db; // буфер для e.target.result
_db.name = "fronty"; //  название базы данных;
_db.storeName = "projects"; //  название хранилища данных objectStore;
_db.data = [];
_db.version = 1;
_db.empty = true;
var ls = localStorage,
	localDB = ["configuration", "options", "autosaved"],
	localDB_OK = "StorageDB OK";
class LocalStorageDB {
	constructor() {
		if (!ls) {
			console.log("Sorry localStorage not have support");
		}
		for (var i = 0; i < localDB.length; i++) {
			if (!ls.getItem(localDB[i])) {
				for (var i = 0; i < localDB.length; i++) {
					if (localDB[i] == "options") {
						this.setStorage(localDB[i], options.defaults);
						console.log('localDB[i]: ', localDB[i], options.defaults);
					} else if (localDB[i] == "configuration") {
						console.log('localDB[i]: ', localDB[i], config.defaults);
						this.setStorage(localDB[i], config.defaults);
					} else if (localDB[i] == "autosaved") {
						console.log('localDB[i]: ', localDB[i], project.defaults);
						this.setStorage(localDB[i], project.autosaveData);
					}
				}
			}
		}
		this.buffer;
	}
	getStorageItem(objectName, keyN) {
		this.buffer = this.getStorage(objectName);
		if (!this.buffer[keyN] && this.buffer[keyN] == null && this.buffer[keyN] == undefined) {
			return options.defaults[keyN];
		} else {
			return this.buffer[keyN]
		}
	}
	setStorageItem(objectName, keyN, val) {
		this.buffer = this.getStorage(objectName);
		this.buffer[keyN] = val;
		localStorage.setItem(objectName, JSON.stringify(this.buffer));
	}
	getStorage(objectName) {
		var request = JSON.parse(ls.getItem(objectName));
		/* 	if (!request && request == null && request == undefined) {
				return this.buffer = options.defaults
			} */
		return this.buffer = request
	}
	setStorage(objectName, val) {
		ls.setItem(objectName, JSON.stringify(val))
	}
}
class LocalDB {
	constructor() {
		this._openDb(); // init database
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
		request.onupgradeneeded = function (e) {
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
				console.log("db updated");
			}
		};
		request.onsuccess = function (e) {
			var now = new Date(Date.now());
			db_ = _db.db = e.target.result;
			for (var i = 0; i < 4; i++) {
				db_.transaction([_db.storeName], "readwrite").objectStore(_db.storeName).add({
					id: i,
					name: "test " + i,
					html: "<h1>test " + i + "</h1>",
					css: "h1{color:blue}",
					js: "console.log('test " + i + "')",
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
		transaction.oncomplete = function (e) {
			$("#projectlist").html(content);
		};
		transaction.onerror = function (e) {
			console.dir(e);
		};
		var store = transaction.objectStore(_db.storeName);
		store.openCursor().onsuccess = function (e) {
			var cursor = e.target.result;
			if (cursor) {
				content += "<span>" + cursor.value.id + "</span><span>" + cursor.value.name + "</span><span>" + cursor.value.updated_at + "</span>";
				cursor.continue();
			} else {
				content += " ";
			}
		};
	}
	openProjects(id) {
		db_ = _db.db;
		var transaction = localStorageDB.transaction([_db.storeName], "readwrite");
		transaction.oncomplete = function (e) {
			return content;
		};
		transaction.onerror = function (e) {
			console.dir(e);
		};
		var store = transaction.objectStore(_db.storeName);
		store.get(id).onsuccess = function (e) {
			db_ = _db.db = e.target.result;
			alert(localStorageDB.cout)
			_db.data.push()
		};
	}
	add() {
		var self = this;
		db_ = _db.db;
		var transaction = localStorageDB.transaction([_db.storeName], "readwrite");
		transaction.oncomplete = function (event) {
			console.log("transaction Success");
		};
		transaction.onerror = function (event) {
			console.log("Error");
		};
		var objectStore = localStorageDB
			.transaction([_db.storeName], "readwrite")
			.objectStore(_db.storeName)
			.add({});
		self.viewAll();
		console.log("new data added");
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
		req.onsuccess = function () {
			console.log("Deleted database(" + _db.name + ") successfully");
		};
		req.onerror = function () {
			console.log("Couldn't delete database(" + _db.name + ")");
		};
		req.onblocked = function () {
			console.log(
				"Couldn't delete database(" +
				_db.name +
				") due to the operation being blocked"
			);
		};
	}
}
var localStorageDB = new LocalStorageDB();
var localDB = new LocalDB();
function formatDate(d) {
	var dd = d.getDate();
	if (dd < 10) dd = '0' + dd;
	var mm = d.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;
	var yy = d.getFullYear() % 100;
	if (yy < 10) yy = '0' + yy;
	return dd + '.' + mm + '.' + yy;
}