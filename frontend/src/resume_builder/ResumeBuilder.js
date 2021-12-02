import "./ResumeBuilder.css";
import { useReducer, useEffect, useState, createContext } from "react";
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
import PrintButton from "./print_button/PrintButton";
import Alert from "./alert/Alert";

const initial_control_state = (preservedKey) => {
    const preservedState = sessionStorage.getItem(preservedKey);
    if (preservedState) {
        console.log("preservedState", preservedState);
        return JSON.parse(preservedState);
    } else {
        return {
            "basic-info": {"checked": false, "number_subsection": 1, "payload": []},
            "education": {"checked": false, "number_subsection": 1, "payload": []},
            "employment": {"checked": false, "number_subsection": 1, "payload": []},
            "projects": {"checked": false, "number_subsection": 1, "payload": []},
            "certificates": {"checked": false, "number_subsection": 1, "payload": []},
            "skills": {"checked": false, "number_subsection": 1, "payload": []},
        }
    }
};

function reducer(state, action) {
    switch(action.name) {
        case "blank":
            sessionStorage.setItem('control_state', JSON.stringify(initial_control_state));
            return initial_control_state;
        case 'load':
            sessionStorage.setItem('control_state', JSON.stringify(action.value));
            return action.value;
        default:
            // avoid shallow copy
            const newSectionState = {...state[action.name], [action.key]: action.value};
            const newState = {...state, [action.name]: newSectionState};
            sessionStorage.setItem('control_state', JSON.stringify(newState));
            return newState
    }
};

export const DispatchContext = createContext();

function ResumeBuilder({ authToken }) {
    const [resumeList, setResumeList] = useState([]);
    const [currentResume, setCurrentResume] = useState({'name': '', 'id': 0});
    const [control_state, dispatch] = useReducer(reducer, 'control_state', initial_control_state);
    const [alertContent, setAlertContent] = useState('');

    useEffect(() => {
        console.log('useEffect');
        if (authToken) {
            list_resume().then(
                resume_list => setResumeList(resume_list)
            ).catch(
                error => console.error(error)
            );
        }
    }, [authToken]);

    useEffect(() => {
        if (alertContent) {
            setTimeout(() => setAlertContent(''), 1000);
        }
    })
    return (
        <>	
            <DispatchContext.Provider value={dispatch}>
                <Alert content={alertContent} />
                <div id="button-group" className="d-print-none">
                    <SaveButton 
                        control_state={control_state} 
                        setResumeList={setResumeList}
                        setCurrentResume={setCurrentResume}
                        setAlertContent={setAlertContent}
                    />
                    <LoadButton 
                        setCurrentResume={setCurrentResume} 
                        resume_list={resumeList} 
                        setAlertContent={setAlertContent}
                    />
                    <ClearButton 
                        setCurrentResume={setCurrentResume}
                    />
                    <DeleteButton
                        currentResume={currentResume}
                        setCurrentResume={setCurrentResume}
                        setResumeList={setResumeList}
                        setAlertContent={setAlertContent}
                    />
                    <PrintButton />
                </div>
                <h1 style={{ textAlign: 'center' }} className="d-print-none">{currentResume['name']}</h1>
                <div className="d-print-none">
                    <SectionSelector control_state={control_state} dispatch={dispatch} />
                </div>
                <div id="resume" className="sheet">
                    <BasicInfo 
                        control_state={control_state["basic-info"]} 
                    />
                    <Education 
                        control_state={control_state["education"]} 
                    />
                    <Employment 
                        control_state={control_state["employment"]} 
                    />
                    <Certificates 
                        control_state={control_state["certificates"]}
                    />
                    <Projects 
                        control_state={control_state["projects"]} 
                    />
                    <Skills 
                        control_state={control_state["skills"]} 
                    />
                </div> 
            </DispatchContext.Provider>		
        </>
    );
}

export default ResumeBuilder