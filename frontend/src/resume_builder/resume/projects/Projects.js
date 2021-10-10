import React from "react";
import "./Projects.css";
import { useSectionList, useStateWithDetail } from "../custom_hook";

const MemorizedProjects = React.memo(
    function Projects({ control_state }) {
        const [ display, list_of_projects ] = useSectionList(control_state, Project);
        return (
            <>
                { display &&
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

function Project({ order }) {
    const initial_state = {
        "project-name": sessionStorage.getItem(`project-name-${order}`, ""),
        "project-detail": sessionStorage.getItem(`project-detail-${order}`, ""),
    };
    const [ state, setState, projectDetail ] = useStateWithDetail(initial_state);
    return (
        <li>
            <div className='row'>
                    <input name={`project-name-${order}`} className='left-max' placeholder={`Project's name ${order}`} value={state["project-name"]} onChange={(e) => setState(e)} />
            </div>
            <div className="details">
                <textarea name={`project-detail-${order}`} className='left-max' placeholder={`more details ${order}`} value={state["project-detail"]} ref={projectDetail} onInput={(e) => setState(e)} />
            </div>
        </li>
    )
};

export default MemorizedProjects