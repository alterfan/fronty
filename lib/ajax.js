/**
 * Load text content from a url.
 *
 * @param {string} url Resource url.
 * @param {boolean} binary True if the file might be binary.
 * @param {function(string|ArrayBuffer)} onSuccess Success callback.
 * @param {function()} onError Error callback.
 */
 function loadContent(url, binary, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    if (binary)
        xhr.responseType = 'arraybuffer';
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status != 200)
            onError();
        else if (binary)
            convertBinaryToText(new Uint8Array(xhr.response), [], onSuccess);
        else
            onSuccess(xhr.responseText);
    };
    xhr.send();
}
/**
 * Load the file content and display it in a CodeMirror control.
 */
function onLoad() {
    var sourceUrl = document.location.search.substr(1);
    if (!sourceUrl) {
        displayMessage('Missing source file URL');
        return;
    }
    var plainText = document.location.hash == '#text';
    var config;
    if (plainText)
        config = Configuration.createDefault();
    else
        config = Configuration.fromExtension(
            sourceUrl.split('.').pop().toLowerCase());
    loadContent(sourceUrl,
        plainText,
        config.createCodeMirror.bind(config),
        displayMessage.bind(null, 'Failed to load ' + sourceUrl)
    );
}
document.addEventListener('DOMContentLoaded', onLoad);