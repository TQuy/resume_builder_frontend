import React, { useReducer } from "react";
import { capitalize } from "./Base";

const initialState = {
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
};

function reducer(state, action) {
    const newState = {...state, [action.name] :action.value};
    console.log(`action`, action);
    console.log(`newState: ${newState}`);
    return newState
}

function SectionSelector() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div id="navigation" className="dropdown">
            <button className="btn btn-info dropdown-toggle" type="button" id="sectionSelector" data-bs-toggle="dropdown" aria-expanded="false">
                Section List
            </button> 
            <ul className="dropdown-menu" aria-labelledby="sectionSelector">
                <li>
                    <MemorizedSection name={"basic-info"} checked={state["basic-info"]} number_subsection={state["number-basic-info"]} onChange={dispatch} />
                    <MemorizedSection name={"education"} checked={state["education"]} number_subsection={state["number-education"]} onChange={dispatch} />
                    <MemorizedSection name={"employment"} checked={state["employment"]} number_subsection={state["number-employment"]} onChange={dispatch} />
                    <MemorizedSection name={"project"} checked={state["project"]} number_subsection={state["number-project"]} onChange={dispatch} />
                    <MemorizedSection name={"certificates"} checked={state["certificates"]} number_subsection={state["number-certificates"]} onChange={dispatch} />
                    <MemorizedSection name={"skills"} checked={state["skills"]} number_subsection={state["number-skills"]} onChange={dispatch} />
                </li>
            </ul>
        </div>
    )
}

const MemorizedSection = React.memo(function Section({ name, checked, number_subsection, onChange }) {
    let box_name = `${name}-checkbox`;
    let number_name = `number-${name}`;
    let label_name = name.split("-").map(word => capitalize(word)).join(" ");

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox'? e.target.checked : Math.max(1, e.target.value);
        return onChange({ name: e.target.name, value: value });
    }
    return(
        <div className="form-check">
                <input className="form-check-input" type="checkbox" id={box_name}
                name={name}
                checked={checked}
                onChange={(e) => handleChange(e)}
                />
            <label className="form-check-label" htmlFor={box_name}>{label_name}</label>
            <input 
                type="number" 
                className="numberSubSection"
                name={number_name}
                value={number_subsection}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
})

export default SectionSelector