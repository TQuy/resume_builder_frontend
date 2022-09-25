import React from "react";
import { capitalize } from "resume_builder/utils";
import "./SectionSelector.css";

function SectionSelector({ control_state, dispatch }) {
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
            checked={control_state["basic-info"].checked}
            number_subsection={control_state["basic-info"].number_subsection}
            dispatch={dispatch}
          />
          <Section
            name={"education"}
            checked={control_state["education"].checked}
            number_subsection={control_state["education"].number_subsection}
            dispatch={dispatch}
          />
          <Section
            name={"employment"}
            checked={control_state["employment"].checked}
            number_subsection={control_state["employment"].number_subsection}
            dispatch={dispatch}
          />
          <Section
            name={"certificates"}
            checked={control_state["certificates"].checked}
            number_subsection={control_state["certificates"].number_subsection}
            dispatch={dispatch}
          />
          <Section
            name={"skills"}
            checked={control_state["skills"].checked}
            number_subsection={control_state["skills"].number_subsection}
            dispatch={dispatch}
          />
          <Section
            name={"projects"}
            checked={control_state["projects"].checked}
            number_subsection={control_state["projects"].number_subsection}
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
