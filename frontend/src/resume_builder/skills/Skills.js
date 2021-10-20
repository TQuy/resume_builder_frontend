import React from "react";
import "./Skills.css";
import { useSectionList, useDetailRef, handleChange } from "../custom_hook";

const Skills = React.memo(
    function ({ control_state, dispatch }) {
        const initial_content = {
            "skill-detail": "",
        };
        const [contentList, setContentList, checked] = useSectionList("skills", control_state, initial_content, dispatch);
        const list_of_skills = contentList.map((content_i, i) => {
            return <Skill key={i.toString()} index={i} content={content_i} onChange={setContentList} />
        });        return (
            <>
                { checked &&
                    <div id="skills" className="row section">
                        <h5 className="section-header">Skills</h5>
                        <ul className="section-content">
                            {list_of_skills}
                        </ul>
                    </div>
                }
            </>
        )
    }
);

function Skill({ index, content, onChange }) {
    const Detail = useDetailRef();
    return (
        <li id={`skill-${index}`}>
            <div className="details">
                <textarea 
                name="skill-detail"
                placeholder={`more details ${index}`} 
                value={content["skill-detail"]} 
                ref={Detail} 
                onChange={(e) => handleChange(e, index, onChange)} 
                />
            </div>
        </li>
    )
};

export default Skills