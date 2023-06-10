import React, { useRef, useEffect, useContext } from "react";
import { put_resume } from "resume_builder/APIs";
import { handleShowHideModal, removeRedundantSubsection } from "utils";
import { alertContext, resumeListContext } from "context";
import _set from "lodash/fp/set";

const SaveButton = React.memo(function SaveButton({
  setResumeList,
  setCurrentResume,
}) {
  const saveModalRef = useRef(null);
  const nameInputRef = useRef(null);
  const dispatchAlert = useContext(alertContext);
  const resumeList = useContext(resumeListContext);

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
      dispatchAlert({
        content: "This name is not allowed. Consider using different name.",
      });

      return;
    }

    try {
      const state = JSON.parse(sessionStorage.getItem("state"));
      const compactState = removeRedundantSubsection(state);
      await put_resume(fileName, compactState);
      // set current resume to the newly saved one
      setCurrentResume({ name: fileName });
      // update the resume_list for load button
      setResumeList(() => {
        const idx = resumeList.findIndex((i) => i.name === fileName);
        if (idx === -1) {
          return resumeList.concat({ name: fileName, content: compactState });
        } else {
          return _set([idx, "content"], compactState)(resumeList);
        }
      });
      handleShowHideModal("hide", saveModalRef);
      dispatchAlert({
        content: `Saved resume ${fileName} successfully.`,
      });
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
