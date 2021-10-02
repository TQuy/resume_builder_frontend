import "./Resume.css";
// import { useState } from "react";
import SectionSelector from "./SectionSelector";
import BasicInfo from "./BasicInfo";
import Education from "./Education";

function Resume() {

    return (
        <>
            <div id="section-selector" className="d-print-none">
                <SectionSelector />
            </div>
            <div id="resume" className="sheet">
                <BasicInfo />
                <Education />
            </div>

        </>
    );
}

export default Resume