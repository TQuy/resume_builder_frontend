import React from "react";
import "./BasicInfo.css";
import { useSectionList, handleChange } from "../custom_hook";

const MemorizedBasicInfo = React.memo(
    function BasicInfo({ control_state, dispatch }) {
        const initial_content = {
            "gender":  "",
            "year-of-birth": "",
            "full-name": "",
            "phone-number": "",
            "email": "",
        };
        const [contentList, setContentList, checked] = useSectionList("basic-info", control_state, initial_content, dispatch);
        const list_of_info = contentList.map((content_i, i) => {
            return <Info key={i.toString()} index={i} content={content_i} onChange={setContentList} />
        });
        return (
            <>{ checked && 
                <div id="basic-info">
                    { list_of_info }
                </div>
            }
            </>
        )
    }
);

function Info({ index, content, onChange }) {
    return (
        <div id={`basic-info-${index}`} className="row section">
            <div className="col-4">
                <div className="row">
                    <input 
                    name="gender" 
                    className="center-max" 
                    type="text" 
                    placeholder={`gender ${index}`} 
                    value={content["gender"]} 
                    onChange={(e) => handleChange(e, index, onChange)} 
                    />
                </div>
                <div className="row">
                    <input 
                    name="year-of-birth"
                    className="center-max" 
                    type="text" 
                    placeholder={`year of birth ${index}`} 
                    value={content["year-of-birth"]} 
                    onChange={(e) => handleChange(e, index, onChange)} 
                    />
                </div>
            </div>
            <div className="col-4 align-self-center">
                <input 
                name="full-name"
                className="center-max distinguish" 
                type="text" 
                placeholder={`full name ${index}`} 
                value={content["full-name"]} 
                onChange={(e) => handleChange(e, index, onChange)} 
                />
            </div>
            <div className="col-4">
                <div className="row">
                    <input 
                    name="phone-number" 
                    className="center-max" 
                    type="tel" 
                    placeholder={`phone number ${index}`} 
                    value={content["phone-number"]} 
                    onChange={(e) => handleChange(e, index, onChange)} 
                    />
                </div>
                <div className="row">
                    <input 
                    name="email"
                    className="center-max" 
                    type="email" 
                    placeholder={`email address ${index}`} 
                    value={content["email"]} 
                    onChange={(e) => handleChange(e, index, onChange)} 
                    />
                </div>
            </div>
        </div>
        )
};

export default MemorizedBasicInfo