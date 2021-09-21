'use strict';
import React from "react";

import BasicInfo from "./BasicInfo";
import Education from "./Education";
import Employment from "./Employment";
import ProjectList from "./Project";
import Certification from "./Certification";
import SkillList from "./Skill";

export default function Resume(props) {
    let sectionInfo = props.sectionInfo;

    return (
        <div id="resume">
            <BasicInfo displayed={sectionInfo.basicInfo} numberSubsection={1} />
            <Education displayed={sectionInfo.education} numberSubsection={sectionInfo.numberSchool} />
            <Employment displayed={sectionInfo.employment} numberSubsection={sectionInfo.numberCompany} />
            <ProjectList displayed={sectionInfo.projectList} numberSubsection={sectionInfo.numberProject} />
            <Certification displayed={sectionInfo.certification} numberSubsection={sectionInfo.numberCertificate} />
            <SkillList displayed={sectionInfo.skillList} numberSubsection={sectionInfo.numberSkill} />
        </div>
    );
}
