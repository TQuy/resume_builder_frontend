import React, { useContext } from "react";
import "./Employment.css";
import { useSectionList, useDetailRef, handleChange } from "../custom_hook";
import { DispatchContext } from "resume_builder/ResumeBuilder";

const Employment = React.memo(
    function ({ control_state }) {
        const dispatch = useContext(DispatchContext);
        const initial_content = {
            "company-period": "",
            "company-name": "",
            "company-location": "",
            "company-detail": "",
        };
        const [contentList, setContentList, checked] = useSectionList("employment", control_state, initial_content, dispatch);
        const list_of_companies = contentList.map((content_i, i) => {
            return <Company 
                key={i.toString()} 
                content={content_i} 
                handleChange={e => handleChange(e, i, setContentList)}
            />
        });        
        return (
            <>
                { checked &&
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

function Company({ content, handleChange }) {
    const Detail = useDetailRef();
    return (
    <li className="company">
        <div className="row">
            <div className="col-3">
                <input 
                    name="company-period"
                    className='left-max' 
                    placeholder='working-period'
                    value={content["company-period"]} 
                    onChange={e => handleChange(e)} 
                />
            </div>
            <div className="col-6">
                <input 
                    name="company-name"
                    className='center-max' 
                    placeholder='company-name'
                    value={content["company-name"]} 
                    onChange={e => handleChange(e)} 
                />
            </div>
            <div className="col-3">
                <input 
                    name="company-location"
                    className='right-max' 
                    placeholder='location'
                    value={content["company-location"]} 
                    onChange={e => handleChange(e)} 
                />
            </div>
        </div>
        <div className="details">
            <textarea 
                name="company-detail"
                ref={Detail} 
                placeholder='more detail'
                value={content["company-detail"]} 
                onInput={e => handleChange(e)} 
            />
        </div>
    </li>
    )
};
export default Employment