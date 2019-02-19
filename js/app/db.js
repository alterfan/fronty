"use strict";
var _db = {};
_db.db; // буфер для e.target.result
_db.name = "fronty"; //  название базы данных;
_db.storeName = "projects"; //  название хранилища данных objectStore;
_db.data =[];
_db.version = 1;
_db.empty = true;
var dbData = [{
  id: "1",
  name: "test 1",
  lastupdate: "1.1.2019",
  html: "<h1>test 1</h1>",
  css: "h1{color:blue}",
  js: "console.log('test 1')",
  csslibs: "",
  jslibs: ""
}];
var db;
class DataBase {
  run() {
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
    // Make db
    var request = indexedDB.open(_db.name, _db.version);
    //handle setup
    request.onupgradeneeded = function (e) {
      var getDB = e.target.result;
      //Create Note
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
        ui.message("Обновление завершено");
        console.log("Обновление завершено");
      }
    };
    request.onsuccess = function (e) {
      var now = new Date(Date.now());
      db = _db.db = e.target.result;
      for (var i = 0; i < 4; i++) {
        db.transaction([_db.storeName], "readwrite").objectStore(_db.storeName).add({
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
    db = _db.db;
    var transaction = db.transaction([_db.storeName], "readwrite");
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
        content += ui.$li(cursor.value.id, cursor.value.name, cursor.value.updated_at, cursor.value.description);
        cursor.continue();
      } else {
        content += " ";
      }
    };
  }
  openProjects(id) {
    db = _db.db;
    var transaction = db.transaction([_db.storeName], "readwrite");
    transaction.oncomplete = function (e) {
      return content;
    };
    transaction.onerror = function (e) {
      ui.message(e);
      console.dir(e);
    };
    var store = transaction.objectStore(_db.storeName);
    store.get(id).onsuccess = function (e) {
      db = _db.db = e.target.result;
      alert(db.cout)
      _db.data.push()
    };
  }
  add() {
    var self = this;
    db = _db.db;
    var transaction = db.transaction([_db.storeName], "readwrite");
    transaction.oncomplete = function (event) {
      console.log("transaction Success");
    };
    transaction.onerror = function (event) {
      console.log("Error");
    };
    var objectStore = db
      .transaction([_db.storeName], "readwrite")
      .objectStore(_db.storeName)
      .add({});
    self.viewAll();
    ui.message("new data added");
    console.log("new data added");
  }
  delete(id) {
    var self = this;
    db = _db.db;
    var key = Number(id.attr('data-id'));
    db.transaction([_db.storeName], "readwrite").objectStore(_db.storeName).delete(key);
    $('#' + id).remove();
  }
  deleteDB() {
    var req = indexedDB.deleteDatabase(_db.name);
    req.onsuccess = function () {
      ui.message("Deleted database(" + _db.name + ") successfully");
      console.log("Deleted database(" + _db.name + ") successfully");
    };
    req.onerror = function () {
      ui.message("Couldn't delete database(" + _db.name + ")");
      console.log("Couldn't delete database(" + _db.name + ")");
    };
    req.onblocked = function () {
      ui.message(
        "Couldn't delete database(" +
        _db.name +
        ") due to the operation being blocked"
      );
      console.log(
        "Couldn't delete database(" +
        _db.name +
        ") due to the operation being blocked"
      );
    };
  }
}
var database = new DataBase();
$(document).ready(function () {
  database.deleteDB();
  database.run();
});
function formatDate(d) {
  var dd = d.getDate();
  if (dd < 10) dd = '0' + dd;
  var mm = d.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  var yy = d.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;
  return dd + '.' + mm + '.' + yy;
}