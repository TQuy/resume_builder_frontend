import "./Resume.css";
// import { useState } from "react";
import BasicInfo from "./BasicInfo";
import SectionSelector from "./SectionSelector";

function Resume() {

  return (
    <>
      <div id="section-selector" className="d-print-none">
        <SectionSelector />
      </div>
    </>
  );
}

export default Resume