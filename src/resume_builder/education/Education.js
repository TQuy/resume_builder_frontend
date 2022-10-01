import React, { useContext } from "react";
import "./Education.css";
import { useSectionList, useDetailRef } from "../custom_hook";
import { dispatchContext } from "resume_builder/ResumeBuilder";

const Education = React.memo(function ({ state }) {
  const dispatch = useContext(dispatchContext);
  const initial_content = {
    "school-period": "",
    "school-name": "",
    "school-location": "",
    "school-detail": "",
  };
  const [contentList, setContentList, checked] = useSectionList(
    "education",
    state,
    initial_content,
    dispatch
  );
  const list_of_schools = contentList.map((content_i, i) => {
    return (
      <School
        key={i.toString()}
        content={content_i}
        handleChange={(e) => setContentList(e, i)}
      />
    );
  });
  return (
    <>
      {checked && (
        <div id="education" className="row section">
          <h5 className="section-header">Education</h5>
          <ul className="section-content">{list_of_schools}</ul>
        </div>
      )}
    </>
  );
});

function School({ content, handleChange }) {
  const Detail = useDetailRef();
  return (
    <li className="school">
      <div className="row">
        <div className="col-3">
          <input
            name="school-period"
            className="left-max"
            placeholder="learning-period"
            value={content["school-period"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-6">
          <input
            name="school-name"
            className="center-max"
            placeholder="school-name"
            value={content["school-name"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-3">
          <input
            name="school-location"
            className="right-max"
            placeholder="location"
            value={content["school-location"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="details">
        <textarea
          name="school-detail"
          ref={Detail}
          placeholder="more detail"
          value={content["school-detail"]}
          onInput={(e) => handleChange(e)}
        />
      </div>
    </li>
  );
}

Education.displayName = "Education";

export default Education;
