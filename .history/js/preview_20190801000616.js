class LivePreview extends WorkSpace {
    constructor() {
        super();
    }
    updatePreview() {
        var previewFrame = document.getElementById('iframe') || shadow.getElementById('iframe');
        var previewNode = previewFrame.contentDocument || previewFrame.contentWindow.document;
        let htmlCode = ls.getStorage("htmlmixed__1"),
            linksHtml = libs.linksHtml(),
            scriptsHtml = libs.scriptsHtml(),
            scriptTag = "<script>" + ls.getStorage("javascript__3") + "</script>",
            styleTag = "<style>" + ls.getStorage("css__2") + "</style>",
            titleTag = "<title>" + $("#title").val() + "</title>",
            headHtml = "<head>" + titleTag + linksHtml + styleTag + "</head>",
            bodyHtml = "<body>" + htmlCode + scriptsHtml + scriptTag + "</body>";
        if (previewNode) {
            previewNode.open();
            previewNode.write(headHtml + bodyHtml);
            previewNode.close();
        }
    }
    frameResolution() {
        $("#iframeWidth").html(Math.round($('#iframe').width()));
        $("#iframeHeight").html(Math.round($('#iframe').height()));
    }
}