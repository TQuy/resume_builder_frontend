import { useRef, useEffect } from "react";
import { list_resume, save_resume } from "resume_builder/Base";

export default function SaveButton({
  control_state,
  setResumeList,
  setCurrentResume,
  setAlertContent,
}) {
  const saveModal = useRef(null);
  const nameInput = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    function focusInput() {
      return nameInput.current.focus();
    }
    saveModal.current?.addEventListener("shown.bs.modal", focusInput);
    return saveModal.current?.removeEventListener("shown.bs.modal", focusInput);
  }, []);

  const handleSave = async () => {
    const fileName = nameInput.current.value;
    try {
      if (fileName === "") throw new Error("Empty file name");
      const data = await save_resume(fileName, control_state);
      // update the resume_list for load button
      const resume_list = await list_resume();
      setResumeList(resume_list);
      // set current resume to the newly saved one
      setCurrentResume({ id: data["id"], name: data["name"] });
      // call alert
      setAlertContent(data["message"]);
      // close saveModal
      closeBtn.current.click();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#saveModal"
      >
        Save
      </button>
      <div
        className="modal fade"
        id="saveModal"
        tabIndex="-1"
        aria-labelledby="saveModalLabel"
        aria-hidden="true"
        ref={saveModal}
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
                ref={closeBtn}
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="resume_name" className="form-label">
                Resume Name
              </label>
              <input
                id="resume_name"
                type="text"
                className="form-control"
                ref={nameInput}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
