import { useRef } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { csrftoken } from "resume_builder/Base";

export default function SaveModal({ control_state }) {
    const saveModal = useRef(null);
    const nameInput = useRef(null);

    useEffect(() => {
        saveModal.current.addEventListener('shown.bs.modal', function() {
            nameInput.current.focus();
        })
    });

    const [fileName, setFileName] = useState("");

    const handleSave = async () => {
        try {
            if (fileName === "") throw new Error("Empty file name");
            let response = await fetch('/save_resume/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: fileName,
                    content: control_state
                })
            });
            response = await response.json();
            console.log('response', response);
        } catch(e) {
            alert(e.name + '' + e.message);
        };
    }

    return (
        <div className="modal fade" id="saveModal" tabIndex="-1" aria-labelledby="saveModalLabel" aria-hidden="true" ref={saveModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="saveModalLabel">Save Resume</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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