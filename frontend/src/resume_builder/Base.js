// import Cookies from 'js-cookie';

// export const csrftoken = Cookies.get('csrftoken');

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

export async function fetch_resume() {
    console.log('FETCH_RESUME');
    try {
        const response = await fetch("http://127.0.0.1:8000/resumes/", {
            method: 'GET',
            headers: {'Authorization': 'Token ac8351a89f512010e0b36591e522cfa095e39f81'}
        });
        const data = await response.json();
        return data['content']
    } catch(error) {
        alert(error);
    }
}

export async function save_resume(fileName, content) {
    console.log('--------------------SAVE_RESUME');
    const response = await fetch('http://localhost:8000/save_resume/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ac8351a89f512010e0b36591e522cfa095e39f81',
        },
        body: JSON.stringify({
            name: fileName,
            content: content
        })
    });
    const data = await response.json();
    return data
}
