import "./ResumeBuilder.css";
import { useReducer } from "react";
import SectionSelector from "./section_selector/SectionSelector";
import MemorizedBasicInfo from "./basic_info/BasicInfo";
import MemorizedEducation from "./education/Education";
import MemorizedEmployment from "./employment/Employment";
import MemorizedCertificates from "./certificate/Certificates";
import MemorizedProjects from "./projects/Projects";
import MemorizedSkills from "./skills/Skills";

const initial_control_state = {
    "basic-info": {"checked": false, "number_subsection": 1},
    "education": {"checked": false, "number_subsection": 1, "content": []},
    "employment": {"checked": false, "number_subsection": 1},
    "projects": {"checked": false, "number_subsection": 1},
    "certificates": {"checked": false, "number_subsection": 1},
    "skills": {"checked": false, "number_subsection": 1},
};

function reducer(state, action) {
    const newState = { ...state, [action.name]: action.payload };
    return newState
};

function ResumeBuilder() {
    const [control_state, dispatch] = useReducer(reducer, initial_control_state);
    return (
        <>
            <div className="d-print-none">
                <SectionSelector control_state={control_state} onChange={dispatch} />
            </div>
            <div id="resume" className="sheet">
                <MemorizedBasicInfo control_state={control_state["basic-info"]} />
                <MemorizedEducation control_state={control_state["education"]} />
                <MemorizedEmployment control_state={control_state["employment"]} />
                <MemorizedCertificates control_state={control_state["certificates"]} />
                <MemorizedProjects control_state={control_state["projects"]} />
                <MemorizedSkills control_state={control_state["skills"]} />
            </div>        
        </>
    );
}

export default ResumeBuilder