import React from "react";
import "./Education.css";
import { useSectionList, useDetailRef, handleChange } from "../custom_hook";

const MemorizedEducation = React.memo(
    function Education({ control_state, dispatch }) {
        const initial_content = {
            "school-period": "",
            "school-name": "",
            "school-location": "",
            "school-detail": "",
        };
        const [contentList, setContentList, checked] = useSectionList("education", control_state, initial_content, dispatch);
        const list_of_schools = contentList.map((content_i, i) => {
            return <School key={i.toString()} index={i} content={content_i} onChange={setContentList} />
        });
        return (
            <>
                { checked &&
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

function School({ index, content, onChange }) {
    const Detail = useDetailRef();
    return (
        <li id={`school-${index}`}> 
            <div className="row">
                <div className="col-3">
                    <input 
                    name={`school-period`} 
                    className='left-max' 
                    placeholder={`learning period ${index}`} 
                    value={content["school-period"]} 
                    onChange={(e) => handleChange(e, index, onChange)} 
                    />
                </div>
                <div className="col-6">
                    <input 
                    name={`school-name`} 
                    className='center-max' 
                    placeholder={`school's name ${index}`} 
                    value={content["school-name"]} 
                    onChange={(e) => handleChange(e, index, onChange)} 
                    />
                </div>
                <div className="col-3">
                    <input 
                    name={`school-location`} 
                    className='right-max' 
                    placeholder={`location ${index}`} 
                    value={content["school-location"]} 
                    onChange={(e) => handleChange(e, index, onChange)} 
                    />
                </div>
            </div>
            <div className="details">
                <textarea 
                name={`school-detail`} 
                ref={Detail} 
                placeholder={`more details ${index}`} 
                value={content["school-detail"]} 
                onInput={(e) => handleChange(e, index, onChange)} 
                />
            </div>
        </li>
    )
};

export default MemorizedEducation