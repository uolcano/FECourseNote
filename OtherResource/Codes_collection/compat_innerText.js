HTMLElement.prototype.__defineGetter__("innerText", function() {
    return this.textContent;
});
HTMLElement.prototype.__defineSetter__("innerText", function(str) {
    this.textContent = str;
});

// compatible function
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}
