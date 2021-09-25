import "./BasicInfo.css"

function BasicInfo() {
    return (
        <div id='basicInfo' className="row section">
            <div className="col-4">
                <div className="row">
                    <input className="center-max" type="text" name="gender" placeholder="gender" value={"gender"} />
                </div>
                <div className="row">
                    <input className="center-max" type="text" name="yearOfBirth" placeholder="year of birth" value={"year of birth"} />
                </div>
            </div>
            <div className="col-4 align-self-center">
                <input className="center-max" type="text" name="fullName" placeholder="full name" value={"full name"} />
            </div>
            <div className="col-4">
                <div className="row">
                    <input className="center-max" type="tel" name="phoneNumber" placeholder="phone number" value={"phone number"} />
                </div>
                <div className="row">
                    <input className="center-max" type="email" name="email" placeholder="email address" value={"email"} />
                </div>
            </div>
        </div>
    )
}

export default BasicInfo