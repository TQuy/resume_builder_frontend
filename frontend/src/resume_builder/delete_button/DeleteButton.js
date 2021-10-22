import React, { useRef } from "react";
import { delete_resume, list_resume } from "resume_builder/Base";

export default function DeleteButton({ currentResume, setCurrentResume, dispatch, setResumeList, setAlertContent }) {
    const closeBtn = useRef(null);

    const resume_id = currentResume['id'];
    const resume_name = currentResume['name'];
    const handleDelete = async (resume_id) => {
        const data = await delete_resume(resume_id);
        // reset resume name and its id
        setCurrentResume({ 'name': '', 'id': 0 });
        // clean the resume's content
        dispatch({ 'name': 'blank' });
        // call alert
        setAlertContent(data);
        // update list of resumes
        const resume_list = await list_resume();
        setResumeList(resume_list);
        // close delete modal
        closeBtn.current.click();
    }
    return (
        <>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>

            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Delete Resume</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeBtn}></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete <b>{resume_name}</b>?
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-danger" onClick={() => handleDelete(resume_id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}