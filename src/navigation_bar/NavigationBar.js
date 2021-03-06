import "./NavigationBar.css";
import { NavLink } from "react-router-dom";

export default function NavigationBar({ authToken, setAuthToken }) {
  const handleLogout = () => {
    setAuthToken(null);
    sessionStorage.clear();
    window.location.replace("/login/");
  };
  const Login = (
    <>
      <NavLink className="nav-link active" to="/login/" aria-current="page">
        Log in
      </NavLink>
      <NavLink className="nav-link active" to="/register/" aria-current="page">
        Register
      </NavLink>
    </>
  );
  const Logout = (
    <button className="nav-link logout btn btn-dark" onClick={handleLogout}>
      Log out
    </button>
  );

  const in_or_out = authToken ? Logout : Login;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-print-none">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            <NavLink className="nav-link active" to="/" aria-current="page">
              Home
            </NavLink>
          </div>
          <div className="navbar-nav ms-auto">{in_or_out}</div>
        </div>
      </div>
    </nav>
  );
}
