import "./SignInPage.css";

export default function SignInPage({ setAuthToken }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api-token-auth/", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: e.target[0].value,
                password: e.target[1].value,
            })
        });
        const data = await response.json();
        console.log('data', data);
        setAuthToken(data['token']);
        sessionStorage.setItem('auth_token',data['token']);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-3">
                <form onSubmit={(e) => handleSubmit(e)} method="post">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                        <input name="username" type="username" className="form-control" id="exampleFormControlInput1" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                        <input name="password" type="password" className="form-control" id="exampleFormControlTextarea1" required />
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}