import { Modal } from "bootstrap";
import React, { useRef, useEffect } from "react";
import { list_resume, save_resume } from "resume_builder/Base";

const SaveButton = React.memo(function SaveButton({
  setResumeList,
  setCurrentResume,
  setAlertContent,
}) {
  const saveModalRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    // focus input when modal show up
    function focusInput() {
      return nameInputRef.current.focus();
    }
    saveModalRef.current?.addEventListener("shown.bs.modal", focusInput);
    return () =>
      saveModalRef.current?.removeEventListener("shown.bs.modal", focusInput);
  }, []);

  const handleShowModal = () => {
    console.log("hello");
    if (saveModalRef.current) {
      const modalController = Modal.getOrCreateInstance(saveModalRef.current);
      modalController.show();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const fileName = nameInputRef.current.value;
    try {
      const controlState = JSON.parse(sessionStorage.getItem("control_state"));
      const data = await save_resume(fileName, controlState);
      // update the resume_list for load button
      const resume_list = await list_resume();
      setResumeList(resume_list);
      // set current resume to the newly saved one
      setCurrentResume({ id: data["id"], name: data["name"] });
      // call alert
      setAlertContent(data["message"]);
      // close saveModal
      if (saveModalRef.current) {
        const modalController = Modal.getOrCreateInstance(saveModalRef.current);
        modalController.hide();
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        onClick={handleShowModal}
      >
        Save
      </button>
      <div
        className="modal fade"
        id="saveModal"
        tabIndex="-1"
        aria-labelledby="saveModalLabel"
        aria-hidden="true"
        ref={saveModalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="saveModalLabel">
                Save Resume
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <label htmlFor="resume_name" className="form-label">
                  Resume Name
                </label>
                <input
                  id="resume_name"
                  type="text"
                  className="form-control"
                  ref={nameInputRef}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});

export { SaveButton as default };
