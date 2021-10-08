import React from "react";
import { capitalize } from "resume_builder/Base";
import "./SectionSelector.css";

function SectionSelector({ control_state, onChange }) {
    return (
        <div id="section-selector" className="dropdown">
            <button className="btn btn-info dropdown-toggle" type="button" id="sectionSelector" data-bs-toggle="dropdown" aria-expanded="false">
                Section List
            </button> 
            <ul className="dropdown-menu" aria-labelledby="sectionSelector">
                <li>
                    <MemorizedSection name={"basic-info"} states={control_state["basic-info"]} onChange={onChange} />
                    <MemorizedSection name={"education"} states={control_state["education"]} onChange={onChange} />
                    <MemorizedSection name={"employment"} states={control_state["employment"]} onChange={onChange} />
                    <MemorizedSection name={"certificates"} states={control_state["certificates"]} onChange={onChange} />
                    <MemorizedSection name={"projects"} states={control_state["projects"]} onChange={onChange} />
                    <MemorizedSection name={"skills"} states={control_state["skills"]} onChange={onChange} />
                </li>
            </ul>
        </div>
    )
}

const MemorizedSection = React.memo(
    function Section({ name, states, onChange }) {
        const box_name = `${name}-checkbox`;
        const number_name = `number-${name}`;
        const label_name = name.split("-").map(word => capitalize(word)).join(" ");
        const [ checked, number_subsection ] = Object.values(states);
        const handleChange = (e, checked, number_subsection) => {
            const payload = {
                "checked": checked,
                "number_subsection": number_subsection,
            };
            if (e.target.type === 'checkbox') {
                payload["checked"] = e.target.checked;
            } else {
                payload["number_subsection"] = Math.max(1, e.target.value);
            }
            onChange({ "name": name, "payload": payload });
        };
        return (
            <div className="form-check">
                    <input className="form-check-input" type="checkbox" id={box_name}
                    name={name}
                    checked={checked}
                    onChange={(e) => handleChange(e, checked, number_subsection)}
                    />
                <label className="form-check-label" htmlFor={box_name}>{label_name}</label>
                <input
                    readOnly={!checked}
                    type="number" 
                    className="numberSubSection"
                    name={number_name}
                    value={number_subsection}
                    onChange={(e) => handleChange(e, checked, number_subsection)}
                />
            </div>
        )
    }
)

export default SectionSelector;