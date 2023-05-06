import React, { useContext } from "react";
import { load_resume } from "resume_builder/utils";
import { dispatchContext } from "resume_builder/context";

const LoadButton = React.memo(function ({
  setCurrentResume,
  resume_list,
  setAlertContent,
}) {
  const dispatch = useContext(dispatchContext);
  const list_of_resumes = resume_list.map((i) => {
    return (
      <SavedResume
        key={i.name}
        resume_id={i.id}
        resume_name={i.name}
        dispatch={dispatch}
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
        {list_of_resumes}
      </ul>
    </div>
  );
});

function SavedResume({
  setCurrentResume,
  resume_id,
  resume_name,
  dispatch,
  setAlertContent,
}) {
  const handleClick = async (resume_id, resume_name) => {
    try {
      const resume = await load_resume(resume_id);
      setCurrentResume({ id: resume.id, name: resume.name });
      dispatch({ name: "load", value: resume.content });
      // call alert
      setAlertContent("resume loaded successfully.");
    } catch (error) {
      if (error.response) setAlertContent(error.response.data.error);
      console.error(error);
    }
  };
  return (
    <li>
      <button
        className="dropdown-item"
        onClick={() => handleClick(resume_id, resume_name)}
      >
        {resume_name}
      </button>
    </li>
  );
}

export default LoadButton;
