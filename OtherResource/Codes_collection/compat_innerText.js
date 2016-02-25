HTMLElement.prototype.__defineGetter__("innerText", function() {
    return this.textContent;
});
HTMLElement.prototype.__defineSetter__("innerText", function(str) {
    this.textContent = str;
});

if (HTMLElement.prototype) {
	Object.defineProperty(HTMLElement.prototype, 'innerText', {
		get:function () {
			return this.textContent;
		},
		set:function (text) {
			this.textContent = text;
		}
	});
}

// compatible function
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}
