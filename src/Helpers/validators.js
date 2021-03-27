export function isRequired(value) {
    return !!value ? undefined : `This field is required`
}

export function maxLength (length){
    return function (value) {
        return value.length<=length ? undefined : `Max length of this field is ${length}`
    }
}


export function minLength(length) {
    return function (value) {
        return value.length >= length ? undefined : `Min length of this field :${length}`;
    }
}


export function emailValidation(email) {
    if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email,
        )
    ) {
        return undefined;
    }

    return 'Please enter a valid email';
}


export function isAllValid(contactData) {
    console.log(contactData)
    for (let key in contactData) {
        if (typeof contactData[key] === "object" && !contactData[key].valid)
            return false;
    }
    return true;

}
