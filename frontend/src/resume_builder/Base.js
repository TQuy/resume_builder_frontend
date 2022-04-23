// import Cookies from 'js-cookie';

// export const csrftoken = Cookies.get('csrftoken');

const get_auth_token = () => `Token ${sessionStorage.getItem("auth_token")}`;
const hostName = "http://127.0.0.1:8000/";

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function str2bool(value) {
  // convert 'true' and 'false' to its boolean value
  switch (true) {
    case value === true || value === "true":
      return true;
    default:
      return false;
  }
}

export async function list_resume() {
  try {
    console.log("list_resume");
    const auth_token = get_auth_token();
    const response = await fetch(`${hostName}resumes/`, {
      method: "GET",
      headers: { Authorization: auth_token },
    });
    const data = await response.json();
    const content = data["content"];
    return content;
  } catch (error) {
    throw error;
  }
}

export async function load_resume(resume_id) {
  try {
    console.log("load_resume");
    const auth_token = get_auth_token();
    const response = await fetch(`${hostName}resume/${resume_id}/`, {
      method: "GET",
      headers: { Authorization: auth_token },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function save_resume(fileName, content) {
  try {
    console.log("save_resume");
    const auth_token = get_auth_token();
    const response = await fetch(`${hostName}save_resume/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth_token,
      },
      body: JSON.stringify({
        name: fileName,
        content: content,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function delete_resume(resume_id) {
  try {
    console.log("delete_resume");
    const auth_token = get_auth_token();
    const response = await fetch(
      `${hostName}resume/${resume_id}/delete/`,
      {
        method: "DELETE",
        headers: { Authorization: auth_token },
      }
    );
    const data = await response.json();
    const message = data["message"];
    return message;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    console.log("login");
    const response = await fetch(`${hostName}api-token-auth/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    const token = data.token;
    if (!token) throw new Error("Login unsuccessful.");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function register(username, password, confirm_password) {
  try {
    console.log("register");
    const response = await fetch(`${hostName}resume/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        confirm_password: confirm_password,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
}
