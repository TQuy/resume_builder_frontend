import React, { useContext } from "react";
import "./Employment.css";
import { useSectionList } from "custom_hook";
import { dispatchContext } from "context";
import TextareaAutosize from "react-textarea-autosize";
import RemoveWrapper from "resume_builder/remove_wrapper/RemoveWrapper";

const Employment = React.memo(function ({ state }) {
  const dispatch = useContext(dispatchContext);

  const initial_content = {
    "company-period": "",
    "company-name": "",
    "company-location": "",
    "company-detail": "",
  };

  const [contentList, setContentList, checked, handleRemove] = useSectionList(
    "employment",
    state,
    initial_content,
    dispatch
  );

  const list_of_companies = contentList.map((content_i, i) => {
    return (
      <RemoveWrapper key={i.toString()} handleRemove={() => handleRemove(i)}>
        <Company
          content={content_i}
          handleChange={(e) => setContentList(e, i)}
        />
      </RemoveWrapper>
    );
  });

  return (
    <>
      {checked && (
        <div id="employment" className="row section">
          <h5 className="section-header">Employment</h5>
          <ul className="section-content">{list_of_companies}</ul>
        </div>
      )}
    </>
  );
});

function Company({ content, handleChange }) {
  return (
    <li className="company">
      <div className="row">
        <div className="col-3">
          <input
            name="company-period"
            className="left-max"
            placeholder="working-period"
            value={content["company-period"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-6">
          <input
            name="company-name"
            className="center-max"
            placeholder="company-name"
            value={content["company-name"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-3">
          <input
            name="company-location"
            className="right-max"
            placeholder="location"
            value={content["company-location"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="details">
        <TextareaAutosize
          name="company-detail"
          placeholder="more detail"
          value={content["company-detail"]}
          onInput={(e) => handleChange(e)}
        />
      </div>
    </li>
  );
}
export default Employment;
