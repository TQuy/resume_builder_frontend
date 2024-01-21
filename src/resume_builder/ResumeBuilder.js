/* eslint-disable no-fallthrough */
import "./ResumeBuilder.css";
import { useReducer, useEffect, useState } from "react";
import { reducer, getInitialValue } from "utils";
import { list_resume } from "resume_builder/APIs";
import { dispatchContext, resumeIDContext, resumeListContext } from "context";
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

function ResumeBuilder({ authToken }) {
  const [resumeList, setResumeList] = useState([]);
  const [currentResume, setCurrentResume] = useState(() =>
    getInitialValue("currentResume")
  );
  const [state, dispatch] = useReducer(reducer, "state", getInitialValue);

  useEffect(() => {
    sessionStorage.setItem("currentResume", JSON.stringify(currentResume));
  });

  useEffect(() => {
    sessionStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    sessionStorage.setItem("resumeList", JSON.stringify(resumeList));
  }, [resumeList]);

  useEffect(() => {
    // update resume list after authorization
    if (authToken) {
      list_resume()
        .then((data) => setResumeList(data))
        .catch((error) => {
          if (error.response) alert(error.response.data.error);
          console.error(error);
        });
    }
  }, [authToken]);

  return (
    <>
      <dispatchContext.Provider value={dispatch}>
        <resumeIDContext.Provider value={currentResume}>
          <resumeListContext.Provider value={resumeList}>
            <div id="button-group" className="d-print-none">
              <SaveButton
                setResumeList={setResumeList}
                setCurrentResume={setCurrentResume}
              />
              <LoadButton setCurrentResume={setCurrentResume} />
              <ClearButton setCurrentResume={setCurrentResume} />
              <DeleteButton
                setCurrentResume={setCurrentResume}
                setResumeList={setResumeList}
              />
              <PrintButton />
            </div>
            <h1 style={{ textAlign: "center" }} className="d-print-none">
              {currentResume.name}
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
          </resumeListContext.Provider>
        </resumeIDContext.Provider>
      </dispatchContext.Provider>
    </>
  );
}

ResumeBuilder.displayName = "ResumeBuilder";
export default ResumeBuilder;
