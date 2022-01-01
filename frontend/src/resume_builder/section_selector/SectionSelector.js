import React from "react";
import { capitalize } from "resume_builder/Base";
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
            states={control_state["basic-info"]}
            dispatch={dispatch}
          />
          <Section
            name={"education"}
            states={control_state["education"]}
            dispatch={dispatch}
          />
          <Section
            name={"employment"}
            states={control_state["employment"]}
            dispatch={dispatch}
          />
          <Section
            name={"certificates"}
            states={control_state["certificates"]}
            dispatch={dispatch}
          />
          <Section
            name={"projects"}
            states={control_state["projects"]}
            dispatch={dispatch}
          />
          <Section
            name={"skills"}
            states={control_state["skills"]}
            dispatch={dispatch}
          />
        </li>
      </ul>
    </div>
  );
}

const Section = React.memo(function ({ name, states, dispatch }) {
  const box_name = `${name}-checkbox`;
  const number_name = `number-${name}`;
  const label_name = name
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
  const [checked, number_subsection] = Object.values(states);
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
