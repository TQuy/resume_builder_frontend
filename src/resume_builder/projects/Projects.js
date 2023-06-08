import React, { useContext } from "react";
import "./Projects.css";
import { useSectionList } from "custom_hook";
import { dispatchContext } from "context";
import ReactTextareaAutosize from "react-textarea-autosize";
import RemoveWrapper from "resume_builder/remove_wrapper/RemoveWrapper";

const Projects = React.memo(function ({ state }) {
  const dispatch = useContext(dispatchContext);
  const initial_content = {
    "project-name": "",
    "project-detail": "",
  };
  const [contentList, setContentList, checked, handleRemove] = useSectionList(
    "projects",
    state,
    initial_content,
    dispatch
  );
  const list_of_projects = contentList.map((content_i, i) => {
    return (
      <RemoveWrapper key={i.toString()} handleRemove={() => handleRemove(i)}>
        <Project
          key={i.toString()}
          content={content_i}
          handleChange={(e) => setContentList(e, i)}
        />
      </RemoveWrapper>
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
        <ReactTextareaAutosize
          name="project-detail"
          className="left-max"
          placeholder="more detail"
          value={content["project-detail"]}
          onInput={(e) => handleChange(e)}
        />
      </div>
    </li>
  );
}

export default Projects;
