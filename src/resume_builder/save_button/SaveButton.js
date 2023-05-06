import React, { useRef, useEffect } from "react";
import { list_resume, save_resume } from "resume_builder/utils";
import { handleShowHideModal, removeRedundancy } from "utils";

const SaveButton = React.memo(function SaveButton({
  setResumeList,
  setCurrentResume,
  setAlertContent,
}) {
  const saveModalRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    // focus input when modal show up
    const currentModalRef = saveModalRef.current;

    function focusInput() {
      return nameInputRef.current.focus();
    }
    currentModalRef?.addEventListener("shown.bs.modal", focusInput);
    return () =>
      currentModalRef?.removeEventListener("shown.bs.modal", focusInput);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const fileName = nameInputRef.current.value;
    if (fileName === "blank") {
      handleShowHideModal("hide", saveModalRef);
      setAlertContent(
        "This name is not allowed. Consider using different name."
      );

      return;
    }

    try {
      const state = JSON.parse(sessionStorage.getItem("state"));
      const resume = await save_resume(fileName, removeRedundancy(state));
      // set current resume to the newly saved one
      setCurrentResume({ name: resume.name });
      // update the resume_list for load button
      const resumeList = await list_resume();
      setResumeList(resumeList);
      // call alert
      setAlertContent(`Saved resume ${fileName} successfully.`);
      // close saveModal
      handleShowHideModal("hide", saveModalRef);
    } catch (error) {
      if (error.response) alert(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => handleShowHideModal("show", saveModalRef)}
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
                <button type="submit" className="btn btn-success">
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
