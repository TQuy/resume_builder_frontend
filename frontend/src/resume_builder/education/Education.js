import React, { useRef, useEffect } from "react";
import "./Education.css";
// import { useSectionList, useStateWithDetail } from "../custom_hook";

const MemorizedEducation = React.memo(
    function Education({ control_state, dispatch }) {
        const initial_content = {
            "school-period": "",
            "school-name": "",
            "school-location": "",
            "school-detail": "",
        };
        const { checked, number_subsection, payload } = control_state;
        let display_list;
        let empty_list;
        if ( payload.length === 0 ) {
            display_list = Array(number_subsection).fill(initial_content);
        } else if ( payload.length >= number_subsection ) {
            display_list = payload.slice(0, number_subsection);
        } else {
            // when content.length < number_subsection
            empty_list = Array(number_subsection - payload.length).fill(initial_content);
            display_list = payload.concat(empty_list);
        };
        const handleChange = (e, index) => {
            const new_payload = display_list.slice(0);
            const new_content = {...new_payload[index], [e.target.name]: e.target.value};
            new_payload[index] = new_content;
            dispatch({ "name": "education", "key": "payload", "value": new_payload })
        };
        const list_of_schools = display_list.map((content_i, i) => {
            return <MemorizedSchool key={i.toString()} index={i} content={content_i} onChange={handleChange} />
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

const MemorizedSchool = React.memo(
    function School({ index, content, onChange }) {
        const Detail = useRef(null);
        useEffect(() => {
            Detail.current.style.height = `${Math.max(Detail.current.scrollHeight, 45)}px`;
            Detail.current.style.overflowY = "hidden";
        })
        const handleChange = (e) => {
            if (e.target.tagName === "TEXTAREA") {
                e.target.style.height = "auto";
                e.target.style.height = `${Math.max(e.target.scrollHeight, 45)}px`;
            }
            onChange(e, index);
        };
        return (
            <li id={`school-${index}`}> 
                <div className="row">
                    <div className="col-3">
                        <input 
                        name={`school-period`} 
                        className='left-max' 
                        placeholder={`learning period ${index}`} 
                        value={content["school-period"]} 
                        onChange={(e) => handleChange(e, index)} 
                        />
                    </div>
                    <div className="col-6">
                        <input 
                        name={`school-name`} 
                        className='center-max' 
                        placeholder={`school's name ${index}`} 
                        value={content["school-name"]} 
                        onChange={(e) => handleChange(e, index)} 
                        />
                    </div>
                    <div className="col-3">
                        <input 
                        name={`school-location`} 
                        className='right-max' 
                        placeholder={`location ${index}`} 
                        value={content["school-location"]} 
                        onChange={(e) => handleChange(e, index)} 
                        />
                    </div>
                </div>
                <div className="details">
                    <textarea 
                    name={`school-detail`} 
                    ref={Detail} 
                    placeholder={`more details ${index}`} 
                    value={content["school-detail"]} 
                    onInput={(e) => handleChange(e, index)} 
                    />
                </div>
            </li>
        )
    }
);

export default MemorizedEducation