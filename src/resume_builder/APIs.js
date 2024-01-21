// import Cookies from 'js-cookie';
import axios from "axios";

// export const csrftoken = Cookies.get('csrftoken');

function get_auth_token() {
  return `Bearer ${sessionStorage.getItem("auth_token")}`;
}

// mode local or cloud
const hostName = process.env.REACT_APP_BACKEND_HOST || "http://localhost:8000";

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function str2bool(value) {
  /* 
  convert 'true' and 'false' to its boolean value
  */
  switch (true) {
    case value === true || value === "true":
      return true;
    default:
      return false;
  }
}

/**
 * List all resumes of the current user
 * @returns {Array<object>|error} resumes
 */
export async function list_resume() {
  console.log("list_resume");
  try {
    const response = await axios({
      url: `${hostName}/resumes`,
      method: "get",
      headers: { Authorization: get_auth_token() },
    });
    const resumes = response.data.resumes.map((res) => {
      if (typeof res.content === "string") {
        return {
          ...res,
          content: JSON.parse(res.content),
        };
      }

      return res;
    });

    return resumes;
  } catch (error) {
    throw error;
  }
}

export async function put_resume(fileName, content) {
  try {
    const response = await axios({
      url: `${hostName}/resumes`,
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: get_auth_token(),
      },
      data: {
        name: fileName,
        content: JSON.stringify(content),
      },
    });
    return response.data.message;
  } catch (error) {
    throw error;
  }
}

export async function delete_resume(resume_name) {
  console.log("delete_resume");
  try {
    const response = await axios({
      url: `${hostName}/resumes`,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: get_auth_token(),
      },
      data: {
        name: resume_name,
      },
    });
    return response.data.message;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  console.log("login");
  try {
    const response = await axios({
      url: `${hostName}/auth/login`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        password: password,
      },
    });
    return response.data.token;
  } catch (error) {
    throw error;
  }
}

export async function register(username, password, passwordConfirmation) {
  console.log("register");
  if (password !== passwordConfirmation) {
    const errorContent = "The password and confirm password are not the same.";
    // if you close the alert dialog, the program will run the next line of code/
    alert(errorContent);
    throw new Error(errorContent);
  }
  try {
    await axios({
      url: `${hostName}/auth/register`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        username: username,
        password: password,
      },
    });
  } catch (error) {
    throw error;
  }
}
