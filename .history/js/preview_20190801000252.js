class LivePreview extends WorkSpace {
    constructor() {
        super();
    }
    updatePreview() {
        var previewFrame = document.getElementById('iframe') || shadow.getElementById('iframe');
        var previewNode = previewFrame.contentDocument || previewFrame.contentWindow.document;
        let htmlCode = workspace.editors["htmlmixed__1"].cm.getValue(),
            linksHtml = libs.linksHtml(),
            scriptsHtml = libs.scriptsHtml(),
            scriptTag = "<script>" + workspace.editors["javascript__3"].cm.getValue() + "</script>",
            styleTag = "<style>" + workspace.editors["css__2"].cm.getValue() + "</style>",
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