import React from "react";
import "./Employment.css";
import { useDisplaySection, useDisplaySubSection } from "../custom_hook";

const MemorizedEmployment = React.memo(
    function Employment({ control_state }) {
        const [ display, list_of_companies ] = useDisplaySection(control_state, Company);
        return (
            <>
                { display &&
                    <div id="employment" className="row section">
                        <h5 className="section-header">Employment</h5>
                        <ul className="section-content">
                            {list_of_companies}
                        </ul>
                    </div>
                }
            </>
        )
    }
);

function Company({ order }) {
    const initial_state = {
        "company-period": sessionStorage.getItem(`company-period-${order}`, ""),
        "company-name": sessionStorage.getItem(`company-name-${order}`, ""),
        "company-location": sessionStorage.getItem(`company-location-${order}`, ""),
        "company-detail": sessionStorage.getItem(`company-detail-${order}`, ""),
    };
    const [ state, setState, companyDetail ] = useDisplaySubSection(initial_state);
    return (
    <li className="">
        <div className="row">
            <div className="col-3">
                <input 
                name={`company-period-${order}`} 
                className='left-max' 
                placeholder={`working period ${order}`} 
                value={state["company-period"]} 
                onChange={(e) => setState(e)} 
                />
            </div>
            <div className="col-6">
                <input 
                name={`company-name-${order}`} 
                className='center-max' 
                placeholder={`company's name ${order}`} 
                value={state["company-name"]} 
                onChange={(e) => setState(e)} 
                />
            </div>
            <div className="col-3">
                <input 
                name={`company-location-${order}`} 
                className='right-max' 
                placeholder={`location ${order}`} 
                value={state["company-location"]} 
                onChange={(e) => setState(e)} 
                />
            </div>
        </div>
        <div className="details">
            <textarea 
            name={`company-detail-${order}`} 
            ref={companyDetail} 
            placeholder={`more details ${order}`} 
            value={state["company-detail"]} 
            onInput={(e) => setState(e)} 
            />
        </div>
    </li>
    )
};
export default MemorizedEmployment