import { useState } from "react";
import "./BasicInfo.css"

function BasicInfo() {
    console.log("BasicInfo");
    const [states, setStates] = useState({
        "gender": sessionStorage.getItem("gender", ""),
        "year-of-birth": sessionStorage.getItem("year-of-birth", ""),
        "full-name": sessionStorage.getItem("full-name", ""),
        "phone-number": sessionStorage.getItem("phone-number", ""),
        "email": sessionStorage.getItem("email", ""),
    });

    const handleChange = (e) => {
        sessionStorage.setItem(e.target.name, e.target.value);
        const newStates = Object.assign({}, states);
        newStates[e.target.name] = e.target.value;
        setStates(newStates);
    };

    return (
        <div id='basicInfo' className="row section">
            <div className="col-4">
                <div className="row">
                    <input className="center-max" type="text" name="gender" placeholder="gender" value={states["gender"]} onChange={(e) => handleChange(e)} />
                </div>
                <div className="row">
                    <input className="center-max" type="text" name="year-of-birth" placeholder="year of birth" value={states["year-of-birth"]} onChange={(e) => handleChange(e)} />
                </div>
            </div>
            <div className="col-4 align-self-center">
                <input className="center-max" type="text" name="full-name" placeholder="full name" value={states["full-name"]} onChange={(e) => handleChange(e)} />
            </div>
            <div className="col-4">
                <div className="row">
                    <input className="center-max" type="tel" name="phone-number" placeholder="phone number" value={states["phone-number"]} onChange={(e) => handleChange(e)} />
                </div>
                <div className="row">
                    <input className="center-max" type="email" name="email" placeholder="email address" value={states["email"]} onChange={(e) => handleChange(e)} />
                </div>
            </div>
        </div>
    )
}

export default BasicInfo