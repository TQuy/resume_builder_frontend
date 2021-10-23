import "./ResumeBuilder.css";
import { useReducer, useEffect, useState } from "react";
import { list_resume } from "./Base";
import SectionSelector from "./section_selector/SectionSelector";
import BasicInfo from "./basic_info/BasicInfo";
import Education from "./education/Education";
import Employment from "./employment/Employment";
import Certificates from "./certificate/Certificates";
import Projects from "./projects/Projects";
import Skills from "./skills/Skills";
import ClearButton from "./clear_button/ClearButton";
import SaveButton from "./save_button/SaveButton";
import LoadButton from "./load_button/LoadButton";
import DeleteButton from "./delete_button/DeleteButton";
import Alert from "./alert/Alert";

const initial_control_state = {
    "basic-info": {"checked": false, "number_subsection": 1, "payload": []},
    "education": {"checked": false, "number_subsection": 1, "payload": []},
    "employment": {"checked": false, "number_subsection": 1, "payload": []},
    "projects": {"checked": false, "number_subsection": 1, "payload": []},
    "certificates": {"checked": false, "number_subsection": 1, "payload": []},
    "skills": {"checked": false, "number_subsection": 1, "payload": []},
};

function reducer(state, action) {
    switch(action.name) {
        case "blank":
            return initial_control_state;
        case 'load':
            return action.value;
        default:
            // avoid shallow copy
            const newSectionState = {...state[action.name], [action.key]: action.value};
            const newState = {...state, [action.name]: newSectionState};
            return newState
    }
};

function ResumeBuilder() {
    const [resumeList, setResumeList] = useState([]);
    const [currentResume, setCurrentResume] = useState({'name': '', 'id': 0});
    const [control_state, dispatch] = useReducer(reducer, initial_control_state);
    const [alertContent, setAlertContent] = useState('');

    useEffect(() => {
        console.log('useEffect');
        list_resume().then(
            resume_list => setResumeList(resume_list)
        ).catch(error => alert(error));
    }, []);

    useEffect(() => {
        if (alertContent) {
            console.log('alertContent', alertContent);
            setTimeout(() => setAlertContent(''), 1000);
        }
    })
    return (
        <>			
            <Alert content={alertContent} />
            <div id="button-group">
                <SaveButton 
                    control_state={control_state} 
                    setResumeList={setResumeList}
                    setCurrentResume={setCurrentResume}
                    setAlertContent={setAlertContent}
                />
                <LoadButton 
                    setCurrentResume={setCurrentResume} 
                    resume_list={resumeList} 
                    dispatch={dispatch}
                    setAlertContent={setAlertContent}
                />
                <ClearButton 
                    dispatch={dispatch}
                    setCurrentResume={setCurrentResume}
                />
                <DeleteButton
                    currentResume={currentResume}
                    setCurrentResume={setCurrentResume}
                    dispatch={dispatch}
                    setResumeList={setResumeList}
                    setAlertContent={setAlertContent}
                />
            </div>
            <h1 style={{ textAlign: 'center' }}>{currentResume['name']}</h1>
            <div className="d-print-none">
                <SectionSelector control_state={control_state} dispatch={dispatch} />
            </div>
            <div id="resume" className="sheet">
                <BasicInfo 
                    control_state={control_state["basic-info"]} 
                    dispatch={dispatch} 
                />
                <Education 
                    control_state={control_state["education"]} 
                    dispatch={dispatch} 
                />
                <Employment 
                    control_state={control_state["employment"]} 
                    dispatch={dispatch} 
                />
                <Certificates 
                    control_state={control_state["certificates"]}
                    dispatch={dispatch} 
                />
                <Projects 
                    control_state={control_state["projects"]} 
                    dispatch={dispatch} 
                />
                <Skills 
                    control_state={control_state["skills"]} 
                    dispatch={dispatch} 
                />
            </div>        
        </>
    );
}

export default ResumeBuilder