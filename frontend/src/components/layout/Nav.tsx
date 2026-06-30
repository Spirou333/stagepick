export function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand text-white fw-semibold" href="/">
          Stagepick
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <a className="nav-link active" href="/">
                Apply
              </a>
            </li>

            <li className="nav-item me-2">
              <a className="nav-link" href="/status">
                Application Status
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}