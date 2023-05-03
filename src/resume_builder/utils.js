// import Cookies from 'js-cookie';
import axios from "axios";
import _set from "lodash/fp/set";

// export const csrftoken = Cookies.get('csrftoken');

const get_auth_token = () => `Bearer ${sessionStorage.getItem("auth_token")}`;

const hostName = process.env.REACT_APP_BACKEND_HOST || "http://localhost:8000";
console.log({ hostName });

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

export async function list_resume() {
  /*
  List all resume of the current user.
  */
  console.log("list_resume");
  try {
    const response = await axios({
      url: `${hostName}/resumes/`,
      method: "get",
      headers: { Authorization: get_auth_token() },
    });
    const data = response.data;
    const resumes = data.resumes;
    return resumes;
  } catch (error) {
    throw error;
  }
}

export async function load_resume(resume_id) {
  console.log("load_resume");
  try {
    const response = await axios({
      url: `${hostName}/resumes/${resume_id}`,
      method: "get",
      headers: { Authorization: get_auth_token() },
    });
    const resume = response.data.resume;
    return resume;
  } catch (error) {
    throw error;
  }
}

export async function save_resume(fileName, content) {
  try {
    const response = await axios({
      url: `${hostName}/resumes/`,
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
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function delete_resume(resume_id) {
  console.log("delete_resume");
  try {
    const response = await axios({
      url: `${hostName}/resumes/${resume_id}`,
      method: "delete",
      headers: { Authorization: get_auth_token() },
    });
    return response.data.data;
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
      headers: { "Content-Type": "application/json" },
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

/**
 *
 * @param {String} preservedKey
 * @returns
 */
export function getInitialValue(preservedKey) {
  switch (preservedKey) {
    case "currentResume": {
      const preservedState = sessionStorage.getItem(preservedKey);
      if (preservedState) return JSON.parse(preservedState);
      // if there is no state in sessionStorage, return blank identity
      return { name: "blank", id: 0 };
    }
    case "state": {
      const preservedState = sessionStorage.getItem(preservedKey);
      if (preservedState) return JSON.parse(preservedState);
      // falls through if there is no state in sessionStorage
    }
    default: {
      return {
        "basic-info": { checked: false, number_subsection: 1, payload: [] },
        education: { checked: false, number_subsection: 1, payload: [] },
        employment: { checked: false, number_subsection: 1, payload: [] },
        projects: { checked: false, number_subsection: 1, payload: [] },
        certificates: { checked: false, number_subsection: 1, payload: [] },
        skills: { checked: false, number_subsection: 1, payload: [] },
      };
    }
  }
}

export function reducer(state, action) {
  switch (action.name) {
    case "blank":
      const initState = getInitialValue();
      return initState;
    case "load":
      return action.value;
    default:
      if (action.key === "payload") {
        const oldSectionState = state[action.name];
        const newSectionState = {
          ...oldSectionState,
          number_subsection: Math.max(1, action.value.length),
          payload: action.value,
        };
        return {
          ...state,
          [action.name]: newSectionState,
        };
      }
      return _set([action.name, action.key], action.value)(state);
  }
}
