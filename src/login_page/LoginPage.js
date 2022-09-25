import "./LoginPage.css";
import { Link } from "react-router-dom";
import { login } from "resume_builder/utils";

export default function LoginPage({ setAuthToken }) {
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const username = e.target[0].value;
      const password = e.target[1].value;
      const token = await login(username, password);
      setAuthToken(token);
      sessionStorage.setItem("auth_token", token);
      window.location.replace("/");
    } catch (error) {
      if (error.response) alert(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <div className="container login-form">
      <h1>Login</h1>
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
        <input type="submit" value="Login" />
      </form>
      <br></br>
      <p>
        Or you can register new account here{" "}
        <Link to="/register/">Create new account</Link>
      </p>
    </div>
  );
}
