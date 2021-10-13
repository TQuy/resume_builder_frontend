import "./ResumeBuilder.css";
import { useReducer } from "react";
import SectionSelector from "./section_selector/SectionSelector";
import MemorizedBasicInfo from "./basic_info/BasicInfo";
import MemorizedEducation from "./education/Education";
import MemorizedEmployment from "./employment/Employment";
import MemorizedCertificates from "./certificate/Certificates";
import MemorizedProjects from "./projects/Projects";
import MemorizedSkills from "./skills/Skills";
import ClearButton from "./clear_button/ClearButton";



const initial_control_state = {
    "basic-info": {"checked": false, "number_subsection": 1, "payload": []},
    "education": {"checked": false, "number_subsection": 1, "payload": []},
    "employment": {"checked": false, "number_subsection": 1, "payload": []},
    "projects": {"checked": false, "number_subsection": 1, "payload": []},
    "certificates": {"checked": false, "number_subsection": 1, "payload": []},
    "skills": {"checked": false, "number_subsection": 1, "payload": []},
};

function reducer(state, action) {
    if (action.name === "all") {
        return initial_control_state
    };
    // avoid shallow copy
    const newName = {...state[action.name], [action.key]: action.value};
    const newState = {...state, [action.name]: newName};
    return newState
};

function ResumeBuilder() {
    const [control_state, dispatch] = useReducer(reducer, initial_control_state);
    return (
        <>			
            <div className="btn-group d-print-none">
                <button type="button" className="btn btn-success">Save</button>
                <button type="button" className="btn btn-primary">Load</button>
                <ClearButton dispatch={dispatch} />
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
            <div className="d-print-none">
                <SectionSelector control_state={control_state} dispatch={dispatch} />
            </div>
            <div id="resume" className="sheet">
                <MemorizedBasicInfo control_state={control_state["basic-info"]} dispatch={dispatch} />
                <MemorizedEducation control_state={control_state["education"]} dispatch={dispatch} />
                <MemorizedEmployment control_state={control_state["employment"]} dispatch={dispatch} />
                <MemorizedCertificates control_state={control_state["certificates"]} dispatch={dispatch} />
                <MemorizedProjects control_state={control_state["projects"]} dispatch={dispatch} />
                <MemorizedSkills control_state={control_state["skills"]} dispatch={dispatch} />
            </div>        
        </>
    );
}

export default ResumeBuilder