import React, { useState } from "react";
import "./Education.css";
import { useDisplaySection } from "../custom_hook";

const MemorizedEducation = React.memo(
    function Education({ control_state }) {
        const initial_section_state = {
            "school-period": sessionStorage.getItem("gender", ""),
            "school-name": sessionStorage.getItem("year-of-birth", ""),
            "school-location": sessionStorage.getItem("full-name", ""),
            "school-detail": sessionStorage.getItem("phone-number", ""),
        };
        const [ display, list_of_schools ] = useDisplaySection(control_state, initial_section_state, School)
        return (
            <>
            { display &&
                <div id="education" className="row section">
                    <h5 className="section-header">Education</h5>
                    <ul className="section-content">
                        {list_of_schools}
                    </ul>
                </div>
            }
            </>
        )
    }
);

function School({ order, state, onChange }) {
    return (
    <li className="">
        <div className="row">
            <div className="col-3">
                <input name="school-period" className='left-max' placeholder={`learning period ${order}`} value={state["school-period"]} onChange={(e) => onChange(e)} />
            </div>
            <div className="col-6">
                <input name="school-name" className='center-max' placeholder={`school's name ${order}`} value={state["school-name"]} onChange={(e) => onChange(e)} />
            </div>
            <div className="col-3">
                <input name="school-location" className='right-max' placeholder={`location ${order}`} value={state["school-location"]} onChange={(e) => onChange(e)} />
            </div>
        </div>
        <div className="details">
            <textarea name="school-detail" placeholder={`more details ${order}`} value={undefined} />
        </div>
    </li>
    )
};

export default MemorizedEducation