import React, { useContext, useRef } from "react";
import { delete_resume } from "resume_builder/APIs";
import { handleShowHideModal } from "utils";
import {
  resumeIDContext,
  dispatchContext,
  alertContext,
  resumeListContext,
} from "context";

const DeleteButton = React.memo(function DeleteButton({
  setCurrentResume,
  setResumeList,
}) {
  const dispatch = useContext(dispatchContext);
  const currentResume = useContext(resumeIDContext);
  const deleteModalRef = useRef(null);
  const resumeName = currentResume.name;
  const dispatchAlert = useContext(alertContext);
  const resumeList = useContext(resumeListContext);

  const handleDelete = async (resumeName) => {
    try {
      await delete_resume(resumeName);
      // reset resume name and its id
      setCurrentResume({ name: "blank" });
      // clean the resume's content
      dispatch({ name: "reset" });
      handleShowHideModal("hide", deleteModalRef);
      dispatchAlert({ content: "Deleted resume successfully" });
      setResumeList(resumeList.filter((re) => re.name !== resumeName));
    } catch (error) {
      if (error.response) alert(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => handleShowHideModal("show", deleteModalRef)}
      >
        Delete
      </button>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
        ref={deleteModalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Delete Resume
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete <b>{resumeName}</b>?
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-danger"
                onClick={() => handleDelete(resumeName)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export { DeleteButton as default };
