import { useState, useCallback } from "react";
import { capitalize } from "./Base";

function SectionSelector() {
    const [sectionStates, setSectionStates] = useState({
        "basic-info": false,
        "number-basic-info": 1,
        "education": false,
        "number-education": 1,
        "employment": false,
        "number-employment": 1,
        "project": false,
        "number-project": 1,
        "certificates": false,
        "number-certificates": 1,
        "skills": false,
        "number-skills": 1,
    })

    const handleChange = (e) => {
        console.log(e.target.name);
        let  target = e.target;
        let newSectionStates = Object.assign({}, sectionStates);
        newSectionStates[target.name] = target.type === "checkbox" ? target.checked : Math.max(1,target.value);
        setSectionStates(newSectionStates);
    }

    return (
        <div id="navigation" className="dropdown">
            <button className="btn btn-info dropdown-toggle" type="button" id="sectionSelector" data-bs-toggle="dropdown" aria-expanded="false">
                Section List
            </button> 
            <ul className="dropdown-menu" aria-labelledby="sectionSelector">
                <li>
                    <Section name={"basic-info"} checked={sectionStates["basic-info"]} number_subsection={sectionStates["number-basic-info"]} onChange={handleChange} />
                    <Section name={"education"} checked={sectionStates["education"]} number_subsection={sectionStates["number-education"]} onChange={handleChange} />
                    <Section name={"employment"} checked={sectionStates["employment"]} number_subsection={sectionStates["number-employment"]} onChange={handleChange} />
                    <Section name={"project"} checked={sectionStates["project"]} number_subsection={sectionStates["number-project"]} onChange={handleChange} />
                    <Section name={"certificates"} checked={sectionStates["certificates"]} number_subsection={sectionStates["number-certificates"]} onChange={handleChange} />
                    <Section name={"skills"} checked={sectionStates["skills"]} number_subsection={sectionStates["number-skills"]} onChange={handleChange} />
                </li>
            </ul>
        </div>
    )
}

function Section({ name, checked, number_subsection, onChange }) {
    let box_name = `${name}-checkbox`;
    let number_name = `number-${name}`;
    let label_name = name.split("-").map(word => capitalize(word)).join(" ");
    return(
        <div className="form-check">
                <input className="form-check-input" type="checkbox" id={box_name}
                name={name}
                checked={checked}
                onChange={(e) => onChange(e)}
                />
            <label className="form-check-label" htmlFor={box_name}>{label_name}</label>
            <input 
                type="number" 
                className="numberSubSection"
                name={number_name}
                value={number_subsection}
                onChange={(e) => onChange(e)}
            />
        </div>
    )
}

export default SectionSelector