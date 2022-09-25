import React, { useContext } from "react";
import "./Certificates.css";
import { useSectionList, handleChange } from "../custom_hook";
import { DispatchContext } from "resume_builder/ResumeBuilder";

const Certificates = React.memo(function ({ state }) {
  const dispatch = useContext(DispatchContext);
  const initial_content = {
    "valid-period": "",
    "certificate-name": "",
  };
  const [contentList, setContentList, checked] = useSectionList(
    "certificates",
    state,
    initial_content,
    dispatch
  );
  const list_of_certificates = contentList.map((content_i, i) => {
    return (
      <Certificate
        key={i.toString()}
        content={content_i}
        handleChange={(e) => handleChange(e, i, setContentList)}
      />
    );
  });
  return (
    <>
      {checked && (
        <div id="certificates" className="row section">
          <h5 className="section-header">Certificates</h5>
          <ul className="section-content">{list_of_certificates}</ul>
        </div>
      )}
    </>
  );
});

function Certificate({ content, handleChange }) {
  return (
    <li className="certificate">
      <div className="row">
        <div className="col-3">
          <input
            name="valid-period"
            className="left-max"
            placeholder="valid period"
            value={content["valid-period"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-9">
          <input
            name="certificate-name"
            className="left-max"
            placeholder="certificate detail"
            value={content["certificate-name"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </li>
  );
}

export default Certificates;
