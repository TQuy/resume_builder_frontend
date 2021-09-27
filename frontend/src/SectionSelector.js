import { useState, useCallback } from "react";
import { capitalize } from "./Base";

function SectionSelector() {

    return (
        <div id="navigation" className="dropdown">
            <button className="btn btn-info dropdown-toggle" type="button" id="sectionSelector" data-bs-toggle="dropdown" aria-expanded="false">
                Section List
            </button> 
            <ul className="dropdown-menu" aria-labelledby="sectionSelector">
                <li>
                    <Section name={"basic-info"} />
                    <Section name={"education"} />
                    <Section name={"employment"} />
                    <Section name={"project"} />
                    <Section name={"certificates"} />
                    <Section name={"skills"} />
                </li>
            </ul>
        </div>
    )
}

function Section({ name }) {
    const [checked, setChecked] = useState(false);
    const [numberSub, setNumberSub] = useState(1);
    console.log(`name: ${name}`);
    const box_name = `${name}-checkbox`;
    const number_name = `number-${name}`;
    const label_name = name.split("-").map(word => capitalize(word)).join(" ");
    return(
        <div className="form-check">
            <input className="form-check-input" type="checkbox" id={box_name}
            name={name}
            checked={checked}
            onChange={(e) => {
                setChecked(e.target.checked);
                sessionStorage.setItem(e.target.name, e.target.checked);
            }}
            />
            <label className="form-check-label" htmlFor={box_name}>{label_name}</label>
            <input
                readOnly={!checked}
                type="number" 
                className="numberSubSection"
                name={number_name}
                value={numberSub}
                onChange={(e) => {
                    const normalizedNumber = Math.max(e.target.value, 1);
                    setNumberSub(normalizedNumber);
                    sessionStorage.setItem(e.target.name, normalizedNumber);
                }}
            />
        </div>
    )
}

export default SectionSelector