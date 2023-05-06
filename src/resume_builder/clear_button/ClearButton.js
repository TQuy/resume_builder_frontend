import { useContext } from "react";
import { dispatchContext } from "resume_builder/context";

export default function ClearButton({ setCurrentResume }) {
  const dispatch = useContext(dispatchContext);
  const handleClear = () => {
    dispatch({ name: "reset" });
    setCurrentResume({ name: "blank" });
  };
  return (
    <button type="button" className="btn btn-warning" onClick={handleClear}>
      Blank
    </button>
  );
}
