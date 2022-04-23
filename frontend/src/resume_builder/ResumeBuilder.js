/* eslint-disable no-fallthrough */
import "./ResumeBuilder.css";
import { useReducer, useEffect, useState, createContext } from "react";
import { list_resume } from "./Base";
import SectionSelector from "./section_selector/SectionSelector";
import BasicInfo from "./basic_info/BasicInfo";
import Education from "./education/Education";
import Employment from "./employment/Employment";
import Certificates from "./certificate/Certificates";
import Projects from "./projects/Projects";
import Skills from "./skills/Skills";
import ClearButton from "./clear_button/ClearButton";
import SaveButton from "./save_button/SaveButton";
import LoadButton from "./load_button/LoadButton";
import DeleteButton from "./delete_button/DeleteButton";
import PrintButton from "./print_button/PrintButton";
import Alert from "./alert/Alert";

const initControlState = (preservedKey) => {
  switch (preservedKey) {
    case "currentResume": {
      const preservedState = sessionStorage.getItem(preservedKey);
      if (preservedState) return JSON.parse(preservedState);
      return { name: "blank", id: 0 };
    }
    case "control_state": {
      const preservedState = sessionStorage.getItem(preservedKey);
      if (preservedState) return JSON.parse(preservedState);
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
};

function reducer(state, action) {
  switch (action.name) {
    case "blank":
      const initState = initControlState("init");
      return initState;
    case "load":
      return action.value;
    default:
      const newSectionState = {
        ...state[action.name],
        [action.key]: action.value,
      };
      const newState = { ...state, [action.name]: newSectionState };
      return newState;
  }
}

export const DispatchContext = createContext();

function ResumeBuilder({ authToken }) {
  const [resumeList, setResumeList] = useState([]);
  const [currentResume, setCurrentResume] = useState(() =>
    initControlState("currentResume")
  );
  const [control_state, dispatch] = useReducer(
    reducer,
    "control_state",
    initControlState
  );
  const [alertContent, setAlertContent] = useState("");

  useEffect(() => {
    // preserved currentResume identity in sessionStorage
    sessionStorage.setItem("currentResume", JSON.stringify(currentResume));
  });

  useEffect(() => {
    // preserve control_state in sessionStorage
    sessionStorage.setItem("control_state", JSON.stringify(control_state));
  }, [control_state]);

  useEffect(() => {
    if (authToken) {
      list_resume()
        .then((resume_list) => setResumeList(resume_list))
        .catch((error) => console.error(error));
    }
  }, [authToken]);

  useEffect(() => {
    let alertTimeout;
    if (alertContent) {
      alertTimeout = setTimeout(() => setAlertContent(""), 1000);
    }
    return () => {
      if (alertTimeout) clearTimeout(alertTimeout);
    };
  }, [alertContent]);

  return (
    <>
      <DispatchContext.Provider value={dispatch}>
        <Alert content={alertContent} />
        <div id="button-group" className="d-print-none">
          <SaveButton
            setResumeList={setResumeList}
            setCurrentResume={setCurrentResume}
            setAlertContent={setAlertContent}
          />
          <LoadButton
            setCurrentResume={setCurrentResume}
            resume_list={resumeList}
            setAlertContent={setAlertContent}
          />
          <ClearButton setCurrentResume={setCurrentResume} />
          <DeleteButton
            currentResume={currentResume}
            setCurrentResume={setCurrentResume}
            setResumeList={setResumeList}
            setAlertContent={setAlertContent}
          />
          <PrintButton />
        </div>
        <h1 style={{ textAlign: "center" }} className="d-print-none">
          {currentResume["name"]}
        </h1>
        <div className="d-print-none">
          <SectionSelector control_state={control_state} dispatch={dispatch} />
        </div>
        <div id="resume" className="sheet">
          <BasicInfo control_state={control_state["basic-info"]} />
          <Education control_state={control_state["education"]} />
          <Employment control_state={control_state["employment"]} />
          <Certificates control_state={control_state["certificates"]} />
          <Skills control_state={control_state["skills"]} />
          <Projects control_state={control_state["projects"]} />
        </div>
      </DispatchContext.Provider>
    </>
  );
}

export default ResumeBuilder;
