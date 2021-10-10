import "./Resume.css";
import MemorizedBasicInfo from "./basic_info/BasicInfo";
import MemorizedEducation from "./education/Education";
import MemorizedEmployment from "./employment/Employment";
import MemorizedCertificates from "./certificate/Certificates";
import MemorizedProjects from "./projects/Projects";
import MemorizedSkills from "./skills/Skills";


function Resume({ control_state }) {
    return (
        <>
            <div id="resume" className="sheet">
                <MemorizedBasicInfo control_state={control_state["basic-info"]} />
                <MemorizedEducation control_state={control_state["education"]} />
                <MemorizedEmployment control_state={control_state["employment"]} />
                <MemorizedCertificates control_state={control_state["certificates"]} />
                <MemorizedProjects control_state={control_state["projects"]} />
                <MemorizedSkills control_state={control_state["skills"]} />
            </div>
        </>
    )
}

export default Resume