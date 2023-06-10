import { Modal } from "bootstrap";
import _set from "lodash/fp/set";
import _update from "lodash/fp/update";

export function handleShowHideModal(type, modalRef) {
  // show or hide modal
  if (modalRef.current) {
    const modalController = Modal.getOrCreateInstance(modalRef.current);
    type === "show" ? modalController.show() : modalController.hide();
  }
}

export function removeRedundantSubsection(obj) {
  const compactObj = {};
  Object.entries(obj).forEach(([key, section]) => {
    compactObj[key] = {
      ...section,
      payload: section.payload.slice(0, section.number_subsection),
    };
  });

  return compactObj;
}

/**
 * Check if the initial value exists in sessionStorage. If yes then get it else create a new one
 * @param {String} preservedKey
 * @returns
 */
export function getInitialValue(preservedKey) {
  if (Boolean(preservedKey)) {
    const preservedValue = sessionStorage.getItem(preservedKey);

    if (preservedValue) {
      return JSON.parse(preservedValue);
    }
  }

  let returnValue = {};

  switch (preservedKey) {
    case "currentResume": {
      returnValue = { name: "blank" };
      break;
    }
    case "resumeList": {
      returnValue = [];
      break;
    }
    default:
      returnValue = {
        "basic-info": { checked: false, number_subsection: 1, payload: [] },
        education: { checked: false, number_subsection: 1, payload: [] },
        employment: { checked: false, number_subsection: 1, payload: [] },
        projects: { checked: false, number_subsection: 1, payload: [] },
        certificates: { checked: false, number_subsection: 1, payload: [] },
        skills: { checked: false, number_subsection: 1, payload: [] },
      };
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
