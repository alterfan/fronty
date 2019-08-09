function $create(tag, {
    attributes
}, children) {
    let el = document.createElement(tag);
    if (typeof SELECTORS !== "object")
        throw SELECTORS;
    for (var attr in SELECTORS) {
        const attr = attr[i];
        el.setAttribute(attr, )
    }
    return el
}

workspace.innerHTML = content;