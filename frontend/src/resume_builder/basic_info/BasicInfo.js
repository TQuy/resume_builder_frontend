import React, { useContext } from "react";
import "./BasicInfo.css";
import { useSectionList, handleChange } from "../custom_hook";
import { DispatchContext } from "resume_builder/ResumeBuilder";

const BasicInfo = React.memo(
    function ({ control_state }) {
        const dispatch = useContext(DispatchContext);
        const initial_content = {
            "gender":  "",
            "year-of-birth": "",
            "full-name": "",
            "phone-number": "",
            "email": "",
        };
        const [contentList, setContentList, checked] = useSectionList("basic-info", control_state, initial_content, dispatch);
        const list_of_info = contentList.map((content_i, i) => {
            return <Info 
                key={i.toString()} 
                content={content_i} 
                handleChange={e => handleChange(e, i, setContentList)}
            />
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

function Info({ content, handleChange }) {
    return (
        <div className='basic-info' className="row section">
            <div className="col-4">
                <div className="row">
                    <input 
                        name="gender" 
                        className="center-max" 
                        type="text" 
                        placeholder='gender' 
                        value={content["gender"]} 
                        onChange={e => handleChange(e)} 
                    />
                </div>
                <div className="row">
                    <input 
                        name="year-of-birth"
                        className="center-max" 
                        type="text" 
                        placeholder='year of birth'
                        value={content["year-of-birth"]} 
                        onChange={e => handleChange(e)} 
                    />
                </div>
            </div>
            <div className="col-4 align-self-center">
                <input 
                    name="full-name"
                    className="center-max distinguish" 
                    type="text" 
                    placeholder='full name'
                    value={content["full-name"]} 
                    onChange={e => handleChange(e)} 
                />
            </div>
            <div className="col-4">
                <div className="row">
                    <input 
                        name="phone-number" 
                        className="center-max" 
                        type="tel" 
                        placeholder='phone number' 
                        value={content["phone-number"]} 
                        onChange={e => handleChange(e)} 
                    />
                </div>
                <div className="row">
                    <input 
                        name="email"
                        className="center-max" 
                        type="email" 
                        placeholder='email address'
                        value={content["email"]} 
                        onChange={e => handleChange(e)} 
                    />
                </div>
            </div>
        </div>
        )
};

export default BasicInfo