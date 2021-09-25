import { useState, useCallback } from "react";
import { capitalize } from "./Base";

function SectionSelector() {
    const [sectionStates, setSectionStates] = useState({
        "basic-info": false,
        "education": false,
        "employment": false,
        "project": false,
        "certificates": false,
        "skills": false,
    })

    const handleChange = (e) => {
        console.log(e.target.name);
        let  target = e.target;
        let newSectionStates = Object.assign({}, sectionStates);
        newSectionStates[target.name] = target.type === "checkbox" ? target.checked : target.value;
        setSectionStates(newSectionStates);
    }

    return (
        <div id="navigation" className="dropdown">
            <button className="btn btn-info dropdown-toggle" type="button" id="sectionSelector" data-bs-toggle="dropdown" aria-expanded="false">
                Section List
            </button> 
            <ul className="dropdown-menu" aria-labelledby="sectionSelector">
                <li>
                    <Section name={"basic-info"} checked={sectionStates["basic-info"]} onChange={handleChange} />
                    <Section name={"education"} checked={sectionStates["education"]} onChange={handleChange} />
                    <Section name={"employment"} checked={sectionStates["education"]} onChange={handleChange} />
                    <Section name={"project"} checked={sectionStates["education"]} onChange={handleChange} />
                    <Section name={"certificates"} checked={sectionStates["education"]} onChange={handleChange} />
                    <Section name={"skills"} checked={sectionStates["education"]} onChange={handleChange} />
                </li>
            </ul>
        </div>
    )
}

function Section({ name, checked, onChange }) {
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
                value={1}
                readOnly={true}
            />
        </div>
    )
}

export default SectionSelector