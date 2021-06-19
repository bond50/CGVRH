exports.dataFromLocalStorage = (itemName) => {
    if (typeof window === 'undefined') {
        return false;
    }
    if (localStorage.getItem(itemName)) {
        return JSON.parse(localStorage.getItem(itemName));
    } else {
        return false;
    }
};

exports.setDataToLocalStorage = (itemName, event) => {
    if (typeof window !== 'undefined') {
        return localStorage.setItem(itemName, JSON.stringify(event));
    }
}