// import Cookies from 'js-cookie';

// export const csrftoken = Cookies.get('csrftoken');

const get_auth_token = () => `Token ${sessionStorage.getItem('auth_token')}`;

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

export async function list_resume() {
    try {
        const auth_token = get_auth_token();
        const response = await fetch("http://127.0.0.1:8000/resumes/", {
            method: 'GET',
            headers: {'Authorization': auth_token}
        });
        const data = await response.json();
        console.log(data['message'])
        return data['content']
    } catch(error) {
        alert(error);
    }
}

export async function load_resume(resume_id) {
    try {
        const auth_token = get_auth_token();
        const response = await fetch(`http://127.0.0.1:8000/resume/${resume_id}/`, {
            method: 'GET',
            headers: {'Authorization': auth_token},
        })
        const data = await response.json();
        return data
    } catch(error) {
        alert(error)
    }
}

export async function save_resume(fileName, content) {
    try {
        const auth_token = get_auth_token();
        const response = await fetch('http://127.0.0.1:8000/save_resume/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth_token,
            },
            body: JSON.stringify({
                name: fileName,
                content: content
            })
        });
        const data = await response.json();
        console.log(data['message'])
        return data
    } catch(error) {
        alert(error);
    }
}

export async function delete_resume(resume_id) {
    try {
        const auth_token = get_auth_token();
        const response = await fetch(`http://127.0.0.1:8000/resume/${resume_id}/delete/`, {
            method: 'DELETE',
            headers: {'Authorization': auth_token}
        });
        const data = await response.json();
        console.log(data['message']);
        return data['message']
    } catch(error) {
        alert(error);
    }
}
