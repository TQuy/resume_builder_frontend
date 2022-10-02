/* eslint-disable no-fallthrough */
import "./ResumeBuilder.css";
import { useReducer, useEffect, useState, createContext } from "react";
import { list_resume } from "./utils";
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
import _set from "lodash/fp/set";

const getInitialValue = (preservedKey) => {
  switch (preservedKey) {
    case "currentResume": {
      const preservedState = sessionStorage.getItem(preservedKey);
      if (preservedState) return JSON.parse(preservedState);
      return { name: "blank", id: 0 };
    }
    case "state": {
      const preservedState = sessionStorage.getItem(preservedKey);
      if (preservedState) return JSON.parse(preservedState);
      // else go to default
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
      const initState = getInitialValue();
      return initState;
    case "load":
      return action.value;
    default:
      return _set([action.name, action.key], action.value)(state);
  }
}

export const dispatchContext = createContext();
dispatchContext.displayName = "Dispatch Context";

export const resumeIDContext = createContext();
resumeIDContext.displayName = "Resume ID Context";

function ResumeBuilder({ authToken }) {
  const [resumeList, setResumeList] = useState([]);
  const [currentResume, setCurrentResume] = useState(() =>
    getInitialValue("currentResume")
  );
  const [state, dispatch] = useReducer(reducer, "state", getInitialValue);
  const [alertContent, setAlertContent] = useState("");

  useEffect(() => {
    // preserved currentResume identity in sessionStorage
    sessionStorage.setItem("currentResume", JSON.stringify(currentResume));
  });

  useEffect(() => {
    // preserve state in sessionStorage
    sessionStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (authToken) {
      list_resume()
        .then((resume_list) => setResumeList(resume_list))
        .catch((error) => {
          if (error.response) alert(error.response.data.error);
          console.error(error);
        });
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
      <dispatchContext.Provider value={dispatch}>
        <resumeIDContext.Provider value={currentResume}>
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
            <SectionSelector state={state} dispatch={dispatch} />
          </div>
          <div id="resume" className="sheet">
            <BasicInfo state={state["basic-info"]} />
            <Education state={state["education"]} />
            <Employment state={state["employment"]} />
            <Certificates state={state["certificates"]} />
            <Skills state={state["skills"]} />
            <Projects state={state["projects"]} />
          </div>
        </resumeIDContext.Provider>
      </dispatchContext.Provider>
    </>
  );
}

ResumeBuilder.displayName = "ResumeBuilder";

export default ResumeBuilder;
