import "./Resume.css";
import MemorizedBasicInfo from "./basic_info/BasicInfo";
import MemorizedEducation from "./education/Education";

function Resume({ control_state }) {
    return (
        <>
            <div id="resume" className="sheet">
                <MemorizedBasicInfo control_state={control_state["basic-info"]} />
                <MemorizedEducation control_state={control_state["education"]} />
            </div>
        </>
    )
}

export default Resume