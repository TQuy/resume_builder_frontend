import "./RegisterPage.css";
import { register, login } from "resume_builder/utils";

export default function RegisterPage({ setAuthToken }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log({formProps})
    try {
      await register(formProps.username, formProps.password, formProps.passwordConfirmation);
      const token = await login(formProps.username, formProps.password);
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
            name="passwordConfirmation"
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
