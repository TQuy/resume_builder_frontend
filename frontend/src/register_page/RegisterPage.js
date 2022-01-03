import "./RegisterPage.css";
import { register, login } from "resume_builder/Base";

export default function RegisterPage({ setAuthToken }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const confirm_password = e.target[2].value;
    try {
      const response = await register(username, password, confirm_password);
      if (response.status === 201) {
        const data = await login(username, password);
        setAuthToken(data["token"]);
        sessionStorage.setItem("auth_token", data["token"]);
        window.location.replace("/");
      } else {
        // if the username or password is invalid
        const data = await response.json();
        alert(data["message"]);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="container login-form">
      <h1>Register new account</h1>
      <form onSubmit={(e) => handleSubmit(e)} method="post">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Username
          </label>
          <input
            name="username"
            type="username"
            className="form-control"
            id="exampleFormControlInput1"
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleFormControlTextarea1"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="confirmPassword"
            required
          />
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
