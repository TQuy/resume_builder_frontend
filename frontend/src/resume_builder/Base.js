import Cookies from 'js-cookie';

export const csrftoken = Cookies.get('csrftoken');

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function str2bool(value) {
    // convert 'true' and 'false' to its boolean value
    switch (true) {
        case value === true || value === 'true':
            return true;
        default:
            return false;
    }
}