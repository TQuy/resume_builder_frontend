import { useRef } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { fetch_resume } from "resume_builder/Base";

export default function SaveButton({ control_state, setResumeList, setCurrentResume }) {
    return (
        <>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#saveModal">Save</button>
            <SaveModal 
            content={control_state}
            setResumeList={setResumeList}
            setCurrentResume={setCurrentResume}
             />
        </>
    );
}

function SaveModal({ content, setResumeList, setCurrentResume }) {
    const saveModal = useRef(null);
    const nameInput = useRef(null);
    const closeBtn = useRef(null);

    useEffect(() => {
        saveModal.current.addEventListener('shown.bs.modal', function() {
            nameInput.current.focus();
        })
    });

    const [fileName, setFileName] = useState("");

    const handleSave = async () => {
        try {
            if (fileName === "") throw new Error("Empty file name");
            let response = await fetch('http://localhost:8000/save_resume/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ac8351a89f512010e0b36591e522cfa095e39f81',
                },
                body: JSON.stringify({
                    name: fileName,
                    content: content
                })
            });
            const data = await response.json();
            console.log('response', data);
            // update the resume_list for load button
            const resume_list = await fetch_resume();
            setResumeList(resume_list);
            // set current resume to the newly saved one
            setCurrentResume({ 'id': data['id'], 'name': data['name'] });

            closeBtn.current.click();
        } catch(err) {
            alert(err);
        };
    }

    return (
        <div className="modal fade" id="saveModal" tabIndex="-1" aria-labelledby="saveModalLabel" aria-hidden="true" ref={saveModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="saveModalLabel">Save Resume</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeBtn}></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="resume_name" className="form-label">Resume Name</label>
                        <input id="resume_name" type="text" className="form-control" value={fileName} onChange={(e) => setFileName(e.target.value)} ref={nameInput} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={() => handleSave()}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}