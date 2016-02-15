function getLocalStorage() {
    if (typeof localStorage == "object") {
        return localStorage;
    } else if (typeof globalStorage == "object") {
        return globalStorage[location.host];
    } else {
        throw new Error("Local storage not available.");
    }
}
