import React, { useContext } from "react";
import "./Skills.css";
import { useSectionList, useDetailRef } from "../custom_hook";
import { DispatchContext } from "resume_builder/ResumeBuilder";

const Skills = React.memo(function ({ state }) {
  const dispatch = useContext(DispatchContext);
  const initial_content = {
    "skill-detail": "",
  };
  const [contentList, setContentList, checked] = useSectionList(
    "skills",
    state,
    initial_content,
    dispatch
  );
  const list_of_skills = contentList.map((content_i, i) => {
    return (
      <Skill
        key={i.toString()}
        content={content_i}
        handleChange={(e) => setContentList(e, i)}
      />
    );
  });
  return (
    <>
      {checked && (
        <div id="skills" className="row section">
          <h5 className="section-header">Skills</h5>
          <ul className="section-content">{list_of_skills}</ul>
        </div>
      )}
    </>
  );
});

function Skill({ content, handleChange }) {
  const Detail = useDetailRef();
  return (
    <li className="skill">
      <div className="details">
        <textarea
          name="skill-detail"
          placeholder="more detail"
          value={content["skill-detail"]}
          ref={Detail}
          onInput={(e) => handleChange(e)}
        />
      </div>
    </li>
  );
}

export default Skills;
