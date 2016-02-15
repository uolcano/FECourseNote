if (typeof HTMLElement != 'undefined' && !HTMLElement.prototype.insertAdjacentElement) {
    HTMLElement.prototype.insertAdjacentElement = function(where, parseNode) {
        switch (where) {
            case 'beforeBegin':
                this.parentNode.insertBefore(parseNode, this);
                break;
            case 'afterBegin':
                this.insertBefore(parseNode, this.firstChild);
                break;
            case 'beforeEnd':
                this.appendChild(parseNode);
                break;
            case 'afterEnd':
                if (this.nextSibling) {
                    this.parentNode.insertBefore(parseNode, this.nextSibling);
                } else {
                    this.parentNode.appendChild(parseNode);
                }
                break;
        }
    }
}
