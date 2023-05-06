// import Cookies from 'js-cookie';
import axios from "axios";
import _set from "lodash/fp/set";
import _update from "lodash/fp/update";

// export const csrftoken = Cookies.get('csrftoken');

function get_auth_token() {
  return `Bearer ${sessionStorage.getItem("auth_token")}`;
}

// mode local or cloud
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

/**
 * List all resumes of the current user
 * @returns {Array<object>|error} resumes
 */
export async function list_resume() {
  console.log("list_resume");
  try {
    const response = await axios({
      url: `${hostName}/resumes/`,
      method: "get",
      headers: { Authorization: get_auth_token() },
    });
    const resumes = response.data.resumes;
    console.log({ resumes });

    return resumes;
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
    return response.data.resume;
  } catch (error) {
    throw error;
  }
}

export async function delete_resume(resume_name) {
  console.log("delete_resume");
  try {
    const response = await axios({
      url: `${hostName}/resumes/`,
      method: "delete",
      headers: { Authorization: get_auth_token() },
      params: {
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
  if (Boolean(preservedKey)) {
    const preservedValue = sessionStorage.getItem(preservedKey);
    if (preservedValue) return JSON.parse(preservedValue);
  }

  let returnValue = {};

  switch (preservedKey) {
    case "currentResume": {
      Object.assign(returnValue, {
        name: "blank",
      });
      break;
    }
    default:
      Object.assign(returnValue, {
        "basic-info": { checked: false, number_subsection: 1, payload: [] },
        education: { checked: false, number_subsection: 1, payload: [] },
        employment: { checked: false, number_subsection: 1, payload: [] },
        projects: { checked: false, number_subsection: 1, payload: [] },
        certificates: { checked: false, number_subsection: 1, payload: [] },
        skills: { checked: false, number_subsection: 1, payload: [] },
      });
  }
  return returnValue;
}

/**
 * There are three cases: blank, load and default.
 * In blank mode, initialize the state.
 * In load mode, set the state to action.value
 * In default mode, modify the section states
 * @param {object} state
 * @param {object} action
 * @returns {object} newState
 */
export function reducer(state, action) {
  switch (action.name) {
    case "reset":
      const initState = getInitialValue();
      return initState;
    case "load":
      return action.value;
    default:
      if (action.key === "payload") {
        return _update([action.name], (sectionState) => ({
          ...sectionState,
          number_subsection: Math.max(1, action.value.length),
          payload: action.value,
        }))(state);
      }
      return _set([action.name, action.key], action.value)(state);
  }
}
