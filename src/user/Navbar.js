import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2 custom-navbar">
                <div className="container-fluid px-3">
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <img src="https://png.pngtree.com/png-vector/20230409/ourmid/pngtree-modern-finance-investment-logo-vector-png-image_6695844.png" alt="Logo" width="50" height="50" className="me-2 rounded-circle" />
                        <h4 className="mb-0 fw-bold">
                            Investify
                        </h4>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto gap-lg-3">
                            <li className="nav-item">
                                <Link to="/" className="nav-link fw-semibold text-dark">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/Categories" className="nav-link fw-semibold text-dark">
                                    Categories
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/Latest" className="nav-link fw-semibold text-dark">
                                    Latest
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/Trending" className="nav-link fw-semibold text-dark">
                                    Trending
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex" style={{ width: "250px" }}>
                            <input type="text" placeholder="Search news..." className="form-control rounded-pill" />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}