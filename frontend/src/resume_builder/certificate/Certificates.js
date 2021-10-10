import React from "react";
import "./Certificates.css";
import { useSectionList, useStateWithoutDetail } from "../custom_hook";

const MemorizedCertificates = React.memo(
    function Certificates({ control_state }) {
        const [ display, list_of_certificates ] = useSectionList(control_state, Certificate);
        return (
            <>
                { display &&
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

function Certificate({ order }) {
    const initial_state = {
        "valid-period": sessionStorage.getItem(`valid-period-${order}`, ""),
        "certificate-name": sessionStorage.getItem(`certificate-name-${order}`, ""),
    };
    const [ state, setState ] = useStateWithoutDetail(initial_state);
    return (
        <li>
            <div className="row">
                <div className="col-3">
                    <input name={`valid-period-${order}`} className='left-max' placeholder={`valid period ${order}`} value={state["valid-period"]} onChange={(e) => setState(e)} />
                </div>
                <div className="col-9">
                    <input name={`certificate-name-${order}`} className="left-max" placeholder={`certificate detail ${order}`} value={state["certificate-name"]} onChange={(e) => setState(e)} />
                </div>
            </div>
        </li>
    )
};

export default MemorizedCertificates