import { useContext } from "react";
import { DispatchContext } from "resume_builder/ResumeBuilder";

export default function ClearButton({ setCurrentResume }) {
  const dispatch = useContext(DispatchContext);
  const handleClear = () => {
    dispatch({ name: "blank" });
    setCurrentResume({ name: "", id: 0 });
  };
  return (
    <button type="button" className="btn btn-warning" onClick={handleClear}>
      Blank
    </button>
  );
}
