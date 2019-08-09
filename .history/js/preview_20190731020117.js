
var initPreview = {
    updatePreview: () => {
        let htmlCode = htmlEditor.cm.getValue(),
            linksHtml = libs.linksHtml(),
            scriptsHtml = libs.scriptsHtml(),
            scriptTag = "<script>" + jsEditor.cm.getValue() + "</script>",
            styleTag = "<style>" + cssEditor.cm.getValue() + "</style>",
            titleTag = "<title>" + $("#title").val() + "</title>",
            headHtml = "<head>" + titleTag + linksHtml + styleTag + "</head>",
            bodyHtml = "<body>" + htmlCode + scriptsHtml + scriptTag + "</body>";
        preview.open();
        preview.write(headHtml + bodyHtml);
        preview.close();
    },
    frameResolution: () => {
        $("#iframeWidth").html(Math.round($('#iframe').width()));
        $("#iframeHeight").html(Math.round($('#iframe').height()));
    }
}