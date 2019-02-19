var $console = $("#console");
var log = function () {
    document.getElementById("preview").contentWindow.console.log = function (val) {
        var span = "<p class='console_row'><span style='color:grey'>LOG >>>:: </span>" + val + "</p>";
        $console.append(span);
    }
};
var error = function () {
    document.getElementById("preview").contentWindow.console.error = function (val) {
        var span = "<p class='console_row'><span style='color:red'>ERROR >>>::  </span>" + val + "</p>";
        $console.append(span);
    }
}
var warn = function () {
    document.getElementById("preview").contentWindow.console.warn = function (val) {
        var span = "<p class='console_row'><span style='color:yellow'>WARN >>>::  </span>" + val + "</p>";
        $console.append(span);
    }
};
var debug = function () {
    document.getElementById("preview").contentWindow.console.debug = function (val) {
        var span = "<p class='console_row'><span style='color:green'>DEBUG >>>::  </span>" + val + "</p>";
        $console.append(span);
    }
};
var info = function () {
    document.getElementById("preview").contentWindow.console.info = function (val) {
        var span = "<p class='console_row'><span style='color:#28a9ff'>INFO >>>::  </span>" + val + "</p>";
        $console.append(span);
    }
};
var onerror = function () {
    document.getElementById("preview").contentWindow.onerror = function (val) {
        $console.append("<p class='console_row'><span style='color:red'>" + val.toString() + "</span></p>");
    }
}
function initConsole() {
    log();
    error();
    warn();
    debug();
    info();
    onerror();
}