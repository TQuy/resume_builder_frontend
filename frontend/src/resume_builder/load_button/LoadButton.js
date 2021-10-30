import React, { useContext } from "react";
import { load_resume } from "resume_builder/Base";
import { DispatchContext } from "resume_builder/ResumeBuilder";

const LoadButton = React.memo(
    function ({ setCurrentResume, resume_list, setAlertContent }) {
        const dispatch = useContext(DispatchContext);
        const list_of_resumes = resume_list.map((i) => {
            return <SavedResume 
                        key={i.name} 
                        resume_id={i.id} 
                        resume_name={i.name} 
                        dispatch={dispatch}
                        setCurrentResume={setCurrentResume}
                        setAlertContent={setAlertContent}
                    />;
        });

        return (
            <div className="dropdown">
                <button className="btn btn-info dropdown-toggle" type="button" id="load_btn" data-bs-toggle="dropdown" aria-expanded="false">
                    Load
                </button>
                <ul className="dropdown-menu" aria-labelledby="load_btn">
                    {list_of_resumes}
                </ul>
            </div>
        )
});

function SavedResume({ setCurrentResume, resume_id, resume_name, dispatch, setAlertContent }) {
    const handleClick = async (resume_id) => {
        const data = await load_resume(resume_id);
        setCurrentResume({ 'id': resume_id, 'name': resume_name });
        dispatch({ 'name': 'load', 'value': data['content'] });
        // call alert
        setAlertContent(data['message']);
    }
    return (
        <li>
            <button className="dropdown-item" onClick={() => handleClick(resume_id)}>
                {resume_name}
            </button>
        </li>
    )
}

export default LoadButton