import React from "react";
import "./Skills.css";
import { useSectionList, useStateWithDetail } from "../custom_hook";

const MemorizedSkills = React.memo(
    function Skills({ control_state }) {
        const [ display, list_of_skills ] = useSectionList(control_state, Skill);
        return (
            <>
                { display &&
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

function Skill({ order }) {
    const initial_state = {
        "skill-detail": sessionStorage.getItem(`skill-detail-${order}`, ""),
    };
    const [ state, setState, skillDetail ] = useStateWithDetail(initial_state);
    return (
        <li>
            <div className="details">
                <textarea name={`skill-detail-${order}`} placeholder={`more details ${order}`} value={state["skill-detail"]} ref={skillDetail} onInput={(e) => setState(e)} />
            </div>
        </li>
    )
};

export default MemorizedSkills