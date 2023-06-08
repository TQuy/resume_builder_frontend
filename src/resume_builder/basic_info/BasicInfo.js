import React, { useContext } from "react";
import "./BasicInfo.css";
import { useSectionList } from "custom_hook";
import { dispatchContext } from "context";

const BasicInfo = React.memo(function ({ state }) {
  const dispatch = useContext(dispatchContext);
  const initialContent = {
    gender: "",
    "year-of-birth": "",
    "full-name": "",
    "phone-number": "",
    email: "",
  };
  const [contentList, setContentList, checked] = useSectionList(
    "basic-info",
    state,
    initialContent,
    dispatch
  );
  const ListOfInfo = contentList.map((content_i, i) => {
    return (
      <Info
        key={i.toString()}
        content={content_i}
        handleChange={(e) => setContentList(e, i)}
      />
    );
  });
  return <>{checked && <div id="basic-info">{ListOfInfo}</div>}</>;
});

function Info({ content, handleChange }) {
  return (
    <div className="basic-info row section">
      <div className="col-4">
        <div className="row">
          <input
            name="gender"
            className="center-max"
            type="text"
            placeholder="gender"
            value={content["gender"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="row">
          <input
            name="year-of-birth"
            className="center-max"
            type="text"
            placeholder="year of birth"
            value={content["year-of-birth"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="col-4 align-self-center">
        <input
          name="full-name"
          className="center-max distinguish"
          type="text"
          placeholder="full name"
          value={content["full-name"]}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="col-4">
        <div className="row">
          <input
            name="phone-number"
            className="center-max"
            type="tel"
            placeholder="phone number"
            value={content["phone-number"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="row">
          <input
            name="email"
            className="center-max"
            type="email"
            placeholder="email address"
            value={content["email"]}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
