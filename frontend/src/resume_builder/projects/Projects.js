import React from "react";
import "./Projects.css";
import { useSectionList, useDetailRef, handleChange } from "../custom_hook";

const Projects = React.memo(
    function ({ control_state, dispatch }) {
        console.log('Projects');
        const initial_content = {
            "project-name": "",
            "project-detail": "",
        };
        const [contentList, setContentList, checked] = useSectionList("projects", control_state, initial_content, dispatch);
        const list_of_projects = contentList.map((content_i, i) => {
            return <Project key={i.toString()} index={i} content={content_i} onChange={setContentList} />
        });        return (
            <>
                { checked &&
                    <div id="projects" className="row section">
                        <h5 className="section-header">Projects</h5>
                        <ul className="section-content">
                            {list_of_projects}
                        </ul>
                    </div>
                }
            </>
        )
    }
);

function Project({ index, content, onChange }) {
    const Detail = useDetailRef();
    return (
        <li id={`project-${index}`}>
            <div className='row'>
                    <input 
                    name="project-name"
                    className='left-max' 
                    placeholder={`Project's name ${index}`} 
                    value={content["project-name"]} 
                    onChange={(e) => handleChange(e, index, onChange)} 
                    />
            </div>
            <div className="details">
                <textarea 
                name="project-detail" 
                className='left-max' 
                placeholder={`more details ${index}`} 
                value={content["project-detail"]} 
                ref={Detail} 
                onChange={(e) => handleChange(e, index, onChange)} 
                />
            </div>
        </li>
    )
};

export default Projects