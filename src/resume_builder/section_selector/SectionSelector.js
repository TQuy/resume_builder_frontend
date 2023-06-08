import React from "react";
import { capitalize } from "resume_builder/APIs";
import "./SectionSelector.css";

function SectionSelector({ state, dispatch }) {
  return (
    <div id="section-selector" className="dropdown">
      <button
        className="btn btn-info dropdown-toggle"
        type="button"
        id="sectionSelector"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Section List
      </button>
      <ul className="dropdown-menu" aria-labelledby="sectionSelector">
        <li>
          <Section
            name={"basic-info"}
            checked={state["basic-info"].checked}
            number_subsection={state["basic-info"].number_subsection}
            dispatch={dispatch}
          />
          <Section
            name={"education"}
            checked={state["education"].checked}
            number_subsection={state["education"].number_subsection}
            dispatch={dispatch}
          />
          <Section
            name={"employment"}
            checked={state["employment"].checked}
            number_subsection={state["employment"].number_subsection}
            dispatch={dispatch}
          />
          <Section
            name={"certificates"}
            checked={state["certificates"].checked}
            number_subsection={state["certificates"].number_subsection}
            dispatch={dispatch}
          />
          <Section
            name={"skills"}
            checked={state["skills"].checked}
            number_subsection={state["skills"].number_subsection}
            dispatch={dispatch}
          />
          <Section
            name={"projects"}
            checked={state["projects"].checked}
            number_subsection={state["projects"].number_subsection}
            dispatch={dispatch}
          />
        </li>
      </ul>
    </div>
  );
}

const Section = React.memo(function ({
  name,
  checked,
  number_subsection,
  dispatch,
}) {
  const box_name = `${name}-checkbox`;
  const number_name = `number-${name}`;
  const label_name = name
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      dispatch({ name: name, key: "checked", value: e.target.checked });
    } else {
      dispatch({
        name: name,
        key: "number_subsection",
        value: Math.max(1, e.target.value),
      });
    }
  };

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={box_name}
        name={name}
        checked={checked}
        onChange={(e) => handleChange(e)}
      />
      <label className="form-check-label" htmlFor={box_name}>
        {label_name}
      </label>
      <input
        readOnly={!checked}
        type="number"
        className="numberSubSection"
        name={number_name}
        value={number_subsection}
        onChange={(e) => handleChange(e)}
        maxLength={2}
      />
    </div>
  );
});

export default SectionSelector;
