import React, { useContext } from "react";
// import { load_resume } from "resume_builder/utils";
import { dispatchContext, resumeListContext } from "resume_builder/context";

const LoadButton = React.memo(function ({ setCurrentResume, setAlertContent }) {
  const resumeList = useContext(resumeListContext);

  const ResumeList = resumeList.map((i) => {
    return (
      <SavedResume
        key={i.name}
        resume={i}
        setCurrentResume={setCurrentResume}
        setAlertContent={setAlertContent}
      />
    );
  });

  return (
    <div className="dropdown">
      <button
        className="btn btn-info dropdown-toggle"
        type="button"
        id="load_btn"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Load
      </button>
      <ul className="dropdown-menu" aria-labelledby="load_btn">
        {ResumeList}
      </ul>
    </div>
  );
});

function SavedResume({ setCurrentResume, resume, setAlertContent }) {
  const dispatch = useContext(dispatchContext);

  const handleClick = async (resume) => {
    try {
      // const resume = await load_resume(resume);
      setCurrentResume({ name: resume.name });
      dispatch({ name: "load", value: resume.content });
      setAlertContent("Resume loaded successfully.");
    } catch (error) {
      if (error.response) setAlertContent(error.response.data.error);
      console.error(error);
    }
  };
  return (
    <li>
      <button className="dropdown-item" onClick={() => handleClick(resume)}>
        {resume.name}
      </button>
    </li>
  );
}

LoadButton.displayName = "LoadButton";
export default LoadButton;
