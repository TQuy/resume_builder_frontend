import "./ResumeBuilder.css";
import { useReducer } from "react";
import SectionSelector from "./section_selector/SectionSelector";
import Resume from "./resume/Resume";

const initial_control_state = {
    "basic-info": {"checked": false, "number_subsection": 1},
    "education": {"checked": false, "number_subsection": 1},
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
            <Resume control_state={control_state} />
        </>
    );
}

export default ResumeBuilder