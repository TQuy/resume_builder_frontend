import { NavLink } from "react-router-dom"

export default function NavigationBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav me-auto">
                    <NavLink className="nav-link" to="/resume/" activeClassName="active" aria-current="page">
                        Home
                    </NavLink>
                </div>
                <div className="navbar-nav ms-auto">
                    <NavLink className="nav-link" to="/login/" activeClassName="active" aria-current="page">
                        Sign in
                    </NavLink>
                </div>
            </div>
        </div>
        </nav>
    )
}