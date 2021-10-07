import React from "react";
import "./BasicInfo.css";
import { useDisplaySection, useDisplaySubSection } from "../custom_hook";

const MemorizedBasicInfo = React.memo(
    function BasicInfo({ control_state }) {
        const [ display, list_of_info ] = useDisplaySection(control_state, Info);
        return (
            <>{ display && 
                <div id="basic-info">
                    { list_of_info }
                </div>
            }
            </>
        )
    }
);

function Info({ order }) {
    const initial_state = {
        "gender": sessionStorage.getItem(`gender-${order}`, ""),
        "year-of-birth": sessionStorage.getItem(`year-of-birth-${order}`, ""),
        "full-name": sessionStorage.getItem(`full-name-${order}`, ""),
        "phone-number": sessionStorage.getItem(`phone-number-${order}`, ""),
        "email": sessionStorage.getItem(`email-${order}`, ""),
    };
    const [ state, setState ] = useDisplaySubSection(initial_state);

    return (
    <div className="row section">
        <div className="col-4">
            <div className="row">
                <input className="center-max" type="text" name={`gender-${order}`} placeholder={`gender ${order}`} value={state["gender"]} onChange={(e) => setState(e)} />
            </div>
            <div className="row">
                <input className="center-max" type="text" name={`year-of-birth-${order}`} placeholder={`year of birth ${order}`} value={state["year-of-birth"]} onChange={(e) => setState(e)} />
            </div>
        </div>
        <div className="col-4 align-self-center">
            <input className="center-max distinguish" type="text" name={`full-name-${order}`} placeholder={`full name ${order}`} value={state["full-name"]} onChange={(e) => setState(e)} />
        </div>
        <div className="col-4">
            <div className="row">
                <input className="center-max" type="tel" name={`phone-number-${order}`} placeholder={`phone number ${order}`} value={state["phone-number"]} onChange={(e) => setState(e)} />
            </div>
            <div className="row">
                <input className="center-max" type="email" name={`email-${order}`} placeholder={`email address ${order}`} value={state["email"]} onChange={(e) => setState(e)} />
            </div>
        </div>
    </div>
    )
};

export default MemorizedBasicInfo