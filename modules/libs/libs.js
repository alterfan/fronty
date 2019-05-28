class Libraries {
 constructor(stylesheets, scripts) {
     this.externalStylesheets = $(stylesheets).val().split(',');
     this.externalScripts = $(scripts).val().split(',');
     this.previewFrame = document.getElementById('iframe');
     this.preview = this.previewFrame.contentDocument || this.previewFrame.contentWindow.document
 }
 append() {
     var externalStylesheets = JSON.parse($('#code-3').val()),
         externalScripts = JSON.parse($('#code-4').val());
     for (var key in externalStylesheets) {
         let l = externalStylesheets,
             _l = l[key];
         this.preview.querySelector("head").innerHTML += "<link rel='stylesheet' href='" + _l['link'] + "'>";
     }
     for (var key in externalScripts) {
         let l = externalScripts,
             _l = l[key];
         this.preview.querySelector("head").innerHTML += "<script type='text/javascript' src='" + _l['link'] + "'></script>";
     }
 }
 view(elementStylesheets, elementScripts) {
     var externalStylesheets = JSON.parse($('#code-3').val()),
         externalScripts = JSON.parse($('#code-4').val()),
         item = (_l) => {
             return "<li class=\"group__item w100 \">" +
                 "<div class='group group--row group--basis4'><input type='button' class='group__btn group__btn--default material-icons' value='menu'>" +
                 "<div class='group group--column group--basis3 group--flex-start'>" +
                 "<input type='url' class='group__input w100' value='" + _l["link"] + "'>" +
                 "</div>" +
                 "<div class='group group--basis1 group--flex-end '><input type='button' class='group__btn group__btn--default material-icons' value='delete'></div>" +
                 "<div>" +
                 "</li>"
         };
     for (var key in externalStylesheets) {
         let l = externalStylesheets,
             _l = l[key];
         document.querySelector(elementStylesheets).innerHTML += item(_l)
     }
     for (var key in externalScripts) {
         let l = externalScripts,
             _l = l[key];
         document.querySelector(elementScripts).innerHTML += item(_l)
     }
 }
}
var lib = new Libraries('#code-3', '#code-4');