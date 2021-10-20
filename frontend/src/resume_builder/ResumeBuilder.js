import "./ResumeBuilder.css";
import { useReducer, useEffect, useState } from "react";
import SectionSelector from "./section_selector/SectionSelector";
import MemorizedBasicInfo from "./basic_info/BasicInfo";
import MemorizedEducation from "./education/Education";
import MemorizedEmployment from "./employment/Employment";
import MemorizedCertificates from "./certificate/Certificates";
import MemorizedProjects from "./projects/Projects";
import MemorizedSkills from "./skills/Skills";
import ClearButton from "./clear_button/ClearButton";
import SaveButton from "./save_button/SaveButton";
import LoadButton from "./load_button/LoadButton";

const initial_control_state = {
    "basic-info": {"checked": false, "number_subsection": 1, "payload": []},
    "education": {"checked": false, "number_subsection": 1, "payload": []},
    "employment": {"checked": false, "number_subsection": 1, "payload": []},
    "projects": {"checked": false, "number_subsection": 1, "payload": []},
    "certificates": {"checked": false, "number_subsection": 1, "payload": []},
    "skills": {"checked": false, "number_subsection": 1, "payload": []},
};

function reducer(state, action) {
    if (action.name === "blank") return initial_control_state;
    if (action.name === "load") return action.value;
    // avoid shallow copy
    const newSectionState = {...state[action.name], [action.key]: action.value};
    const newState = {...state, [action.name]: newSectionState};
    return newState
};

function ResumeBuilder() {
    const [resumeList, setResumeList] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/resumes/", {
            method: 'GET',
            headers: {
                'Authorization': 'Token ac8351a89f512010e0b36591e522cfa095e39f81'
            }
        }).then(
            response => response.json()
        ).then(data => {
            const newResumeList = data['content'];
            console.log('newResumeList', newResumeList);
            setResumeList(newResumeList);
        }).catch(
            error => console.error(error)
        )
    }, []);
    const [control_state, dispatch] = useReducer(reducer, initial_control_state);
    return (
        <>			
            <div className="row justify-content-center">
                <SaveButton control_state={control_state} />
                <LoadButton resume_list={resumeList} dispatch={dispatch} />
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