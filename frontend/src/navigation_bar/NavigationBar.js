

export default function NavigationBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav me-auto">
                    <a className="nav-link active" aria-current="page" href="/resume/">Home</a>
                    <a className="nav-link">Features</a>
                    <a className="nav-link">Pricing</a>
                    <a className="nav-link disabled">Disabled</a>
                </div>
                <div className="navbar-nav ms-auto">
                    <a className="nav-link" href="/login">Sign in</a>
                </div>
            </div>
        </div>
        </nav>
    )
}