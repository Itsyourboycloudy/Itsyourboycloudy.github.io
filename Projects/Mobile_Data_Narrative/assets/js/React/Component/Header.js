(() => {
    const Header = () => {
        return (
            <div id='header'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        {/* Updated the href to point to "Hub.html" */}
                        <a className="navbar-brand" href="Hub.html">
                            <i className="fa-solid fa-house"></i> The COD Zombies Hub
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="react.html">
                                        <i className="fa-solid fa-book"></i> Storyline
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="Map Graph.html">
                                        <i className="fa-solid fa-map"></i> The Map of Zombies
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="Wonder Weapons.html">
                                        <i className="fa-solid fa-gun"></i> Wonder Weapons
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="High Rounds.html">
                                    <i class="fa-solid fa-gamepad"></i> Highest Rounds
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    };

    const ReactHeader = () => (
        <React.Fragment>
            <Header />
        </React.Fragment>
    );

    const container = document.getElementById('react-header');
    const root = ReactDOM.createRoot(container);
    root.render(<ReactHeader />);
})();
