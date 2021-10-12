import React from "react";
import "./Employment.css";
import { useSectionList, useDetailRef, handleChange } from "../custom_hook";

const MemorizedEmployment = React.memo(
    function Employment({ control_state, dispatch }) {
        const initial_content = {
            "company-period": "",
            "company-name": "",
            "company-location": "",
            "company-detail": "",
        };
        const [contentList, setContentList, checked] = useSectionList("employment", control_state, initial_content, dispatch);
        const list_of_companies = contentList.map((content_i, i) => {
            return <Company key={i.toString()} index={i} content={content_i} onChange={setContentList} />
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

function Company({ index, content, onChange }) {
    const Detail = useDetailRef();
    return (
    <li id={`company-${index}`}>
        <div className="row">
            <div className="col-3">
                <input 
                name="company-period"
                className='left-max' 
                placeholder={`working period ${index}`} 
                value={content["company-period"]} 
                onChange={(e) => handleChange(e, index, onChange)} 
                />
            </div>
            <div className="col-6">
                <input 
                name="company-name"
                className='center-max' 
                placeholder={`company's name ${index}`} 
                value={content["company-name"]} 
                onChange={(e) => handleChange(e, index, onChange)} 
                />
            </div>
            <div className="col-3">
                <input 
                name="company-location"
                className='right-max' 
                placeholder={`location ${index}`} 
                value={content["company-location"]} 
                onChange={(e) => handleChange(e, index, onChange)} 
                />
            </div>
        </div>
        <div className="details">
            <textarea 
            name="company-detail"
            ref={Detail} 
            placeholder={`more details ${index}`} 
            value={content["company-detail"]} 
            onInput={(e) => handleChange(e, index, onChange)} 
            />
        </div>
    </li>
    )
};
export default MemorizedEmployment