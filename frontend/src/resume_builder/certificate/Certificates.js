import React from "react";
import "./Certificates.css";
import { useSectionList, useDetailRef, handleChange } from "../custom_hook";

const MemorizedCertificates = React.memo(
    function Certificates({ control_state, dispatch }) {
        const initial_content = {
            "valid-period": "",
            "certificate-name": "",
        };
        const [contentList, setContentList, checked] = useSectionList("certificates", control_state, initial_content, dispatch);
        const list_of_certificates = contentList.map((content_i, i) => {
            return <Certificate key={i.toString()} index={i} content={content_i} onChange={setContentList} />
        });        return (
            <>
                { checked &&
                    <div id="certificates" className="row section">
                        <h5 className="section-header">Certificates</h5>
                        <ul className="section-content">
                            {list_of_certificates}
                        </ul>
                    </div>
                }
            </>
        )
    }
);

function Certificate({ index, content, onChange }) {
    return (
        <li id={`certificate-${index}`}>
            <div className="row">
                <div className="col-3">
                    <input 
                    name="valid-period"
                    className='left-max' 
                    placeholder={`valid period ${index}`} 
                    value={content["valid-period"]} 
                    onChange={(e) => handleChange(e, index, onChange)} 
                    />
                </div>
                <div className="col-9">
                    <input 
                    name="certificate-name"
                    className="left-max" 
                    placeholder={`certificate detail ${index}`} 
                    value={content["certificate-name"]} 
                    onChange={(e) => handleChange(e, index, onChange)} 
                    />
                </div>
            </div>
        </li>
    )
};

export default MemorizedCertificates