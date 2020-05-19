class Utility {

    static updateObject = (oldObject, newProps) => {
        return {
            ...oldObject,
            ...newProps
        }
    }

    static setInLocalStorage = (key, value) => {
        localStorage.setItem(key, value);
    }

    static getFromLocalStorage = (key) => {
        return localStorage.getItem(key);
    }

    static removeFromLocalStorage = (key) => {
        localStorage.removeItem(key);
    }

    static  checkValidity = (value, rules)  => {
        var isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.minLength) {
                isValid = value.trim().length >= rules.minLength && isValid;
            }
            if (rules.maxLength) {
                isValid = value.trim().length <= rules.maxLength && isValid;
            }
        }
        return isValid;
    }
}

export default Utility; 