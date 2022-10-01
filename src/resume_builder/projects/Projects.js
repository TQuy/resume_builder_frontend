import React, { useContext } from "react";
import "./Projects.css";
import { useSectionList, useDetailRef } from "../custom_hook";
import { dispatchContext } from "resume_builder/ResumeBuilder";

const Projects = React.memo(function ({ state }) {
  const dispatch = useContext(dispatchContext);
  const initial_content = {
    "project-name": "",
    "project-detail": "",
  };
  const [contentList, setContentList, checked] = useSectionList(
    "projects",
    state,
    initial_content,
    dispatch
  );
  const list_of_projects = contentList.map((content_i, i) => {
    return (
      <Project
        key={i.toString()}
        content={content_i}
        handleChange={(e) => setContentList(e, i)}
      />
    );
  });
  return (
    <>
      {checked && (
        <div id="projects" className="row section">
          <h5 className="section-header">Projects</h5>
          <ul className="section-content">{list_of_projects}</ul>
        </div>
      )}
    </>
  );
});

function Project({ content, handleChange }) {
  const Detail = useDetailRef();
  return (
    <li className="project">
      <div className="row">
        <input
          name="project-name"
          className="left-max"
          placeholder="Project's name"
          value={content["project-name"]}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="details">
        <textarea
          name="project-detail"
          className="left-max"
          placeholder="more detail"
          value={content["project-detail"]}
          ref={Detail}
          onInput={(e) => handleChange(e)}
        />
      </div>
    </li>
  );
}

export default Projects;
