import React from "react";
import "./Education.css";
import { useSectionList, useStateWithDetail } from "../custom_hook";

const MemorizedEducation = React.memo(
    function Education({ control_state }) {
        const [ display, list_of_schools ] = useSectionList(control_state, School);
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

function School({ order }) {
    const initial_state = {
        "school-period": sessionStorage.getItem(`school-period-${order}`, ""),
        "school-name": sessionStorage.getItem(`school-name-${order}`, ""),
        "school-location": sessionStorage.getItem(`school-location-${order}`, ""),
        "school-detail": sessionStorage.getItem(`school-detail-${order}`, ""),
    };
    const [ state, setState, schoolDetail ] = useStateWithDetail(initial_state);
    return (
    <li className="">
        <div className="row">
            <div className="col-3">
                <input 
                name={`school-period-${order}`} 
                className='left-max' 
                placeholder={`learning period ${order}`} 
                value={state["school-period"]} 
                onChange={(e) => setState(e)} 
                />
            </div>
            <div className="col-6">
                <input 
                name={`school-name-${order}`} 
                className='center-max' 
                placeholder={`school's name ${order}`} 
                value={state["school-name"]} 
                onChange={(e) => setState(e)} 
                />
            </div>
            <div className="col-3">
                <input 
                name={`school-location-${order}`} 
                className='right-max' 
                placeholder={`location ${order}`} 
                value={state["school-location"]} 
                onChange={(e) => setState(e)} 
                />
            </div>
        </div>
        <div className="details">
            <textarea 
            name={`school-detail-${order}`} 
            ref={schoolDetail} 
            placeholder={`more details ${order}`} 
            value={state["school-detail"]} 
            onInput={(e) => setState(e)} 
            />
        </div>
    </li>
    )
};

export default MemorizedEducation