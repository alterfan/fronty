class LivePreview extends Workspace {
    constructor() {}
    updatePreview() {
        var previewFrame = document.getElementById('iframe') || shadow.getElementById('iframe');
        var previewNode = previewFrame.contentDocument || previewFrame.contentWindow.document;
        $("selector").each(function(index, element) {
            // element == this
        });
        let htmlCode = htmlEditor.cm.getValue(),
            linksHtml = libs.linksHtml(),
            scriptsHtml = libs.scriptsHtml(),
            scriptTag = "<script>" + jsEditor.cm.getValue() + "</script>",
            styleTag = "<style>" + cssEditor.cm.getValue() + "</style>",
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