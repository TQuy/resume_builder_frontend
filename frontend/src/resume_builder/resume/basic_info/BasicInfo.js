import React, { useState } from "react";
import "./BasicInfo.css"
import { useDisplaySection } from "../custom_hook";

const MemorizedBasicInfo = React.memo(
    function BasicInfo({ control_state }) {
        const initial_section_state = {
            "gender": sessionStorage.getItem("gender", ""),
            "year-of-birth": sessionStorage.getItem("year-of-birth", ""),
            "full-name": sessionStorage.getItem("full-name", ""),
            "phone-number": sessionStorage.getItem("phone-number", ""),
            "email": sessionStorage.getItem("email", ""),
        };
        const [ display, list_of_info ] = useDisplaySection(control_state, initial_section_state, Info)
        return (
            <> 
                { display && list_of_info }
            </>
        )
    }
);

function Info({ order, state, onChange }) {
    return (
    <div id='basic-info' className="row section">
        <div className="col-4">
            <div className="row">
                <input className="center-max" type="text" name="gender" placeholder={`gender ${order}`} value={state["gender"]} onChange={(e) => onChange(e)} />
            </div>
            <div className="row">
                <input className="center-max" type="text" name="year-of-birth" placeholder={`year of birth ${order}`} value={state["year-of-birth"]} onChange={(e) => onChange(e)} />
            </div>
        </div>
        <div className="col-4 align-self-center">
            <input className="center-max" type="text" name="full-name" placeholder={`full name ${order}`} value={state["full-name"]} onChange={(e) => onChange(e)} />
        </div>
        <div className="col-4">
            <div className="row">
                <input className="center-max" type="tel" name="phone-number" placeholder={`phone number ${order}`} value={state["phone-number"]} onChange={(e) => onChange(e)} />
            </div>
            <div className="row">
                <input className="center-max" type="email" name="email" placeholder={`email address ${order}`} value={state["email"]} onChange={(e) => onChange(e)} />
            </div>
        </div>
    </div>
    )
};

export default MemorizedBasicInfo