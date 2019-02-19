class Storage {
  init() {
    let msg = "Fronty REPORT >>> ";
    if (!this.local() || !this.session()) {
      localStorage.setItem("fronty", JSON.stringify(frontyData));
      sessionStorage.setItem("fronty", JSON.stringify(autosaveDefault));
      console.log(msg + "loaded default data");
    } else {
      console.log(msg + "loaded user data")
    }
    return true;
  }
  getItem() {
    return JSON.parse(localStorage.getItem("fronty"));
  }
  getKey(type, objN, keyN) {
    var self=this;
    if (type == "local") {
      let parsed = JSON.parse(self.local());
      return parsed[objN][keyN];
    } else if (type == "session") {
      let parsed = JSON.parse(self.session());
      return parsed[objN][keyN];
    }
  }
  setKey(type, objName, keyN, val) {
    if (type == "local") {
      let parsed = JSON.parse(this.local());
      parsed[objName][keyN] = val;
      localStorage.setItem("fronty", JSON.stringify(parsed));
    } else if (type == "session") {
      let parsed = JSON.parse(this.session());
      parsed[objName][keyN] = val;
      sessionStorage.setItem("fronty", JSON.stringify(parsed));
    }
  }
  local() {
    return localStorage.getItem("fronty")
  }
  session() {
    return sessionStorage.getItem("fronty")
  }
}
var storage = new Storage();