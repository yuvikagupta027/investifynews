import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <>
            <footer className="pt-5 pb-4 mt-5" style={{ background: "#F8FBFF" }}>
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-3 col-md-6 col-6">
                            <h6 className="fw-bold mb-4">
                                Platform
                            </h6>
                            <div className="d-flex flex-column gap-2">
                                <Link to="/" className="text-decoration-none text-secondary">
                                    Home
                                </Link>
                                <Link to="/user/Latest" className="text-decoration-none text-secondary">
                                    Latest News
                                </Link>
                                <Link to="/user/Trending" className="text-decoration-none text-secondary">
                                    Trending
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <h6 className="fw-bold mb-4">
                                Company
                            </h6>
                            <div className="d-flex flex-column gap-2">
                                <Link to="/about" className="text-decoration-none text-secondary">
                                    About Us
                                </Link>
                                <Link to="/contact" className="text-decoration-none text-secondary">
                                    Contact
                                </Link>
                                <Link to="/faq" className="text-decoration-none text-secondary">
                                    FAQ
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <h6 className="fw-bold mb-4">
                                Categories
                            </h6>
                            <div className="d-flex flex-column gap-2">
                                <div className="text-decoration-none text-secondary">
                                    Markets
                                </div>
                                <div className="text-decoration-none text-secondary">
                                    Technology
                                </div>
                                <div className="text-decoration-none text-secondary">
                                    Crypto
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <h6 className="fw-bold mb-4">
                                Legal
                            </h6>
                            <div className="d-flex flex-column gap-2">
                                <Link to="/privacy" className="text-decoration-none text-secondary">
                                    Privacy Policy
                                </Link>
                                <Link to="/terms" className="text-decoration-none text-secondary">
                                    Terms of Service
                                </Link>
                                <Link to="/cookies" className="text-decoration-none text-secondary">
                                    Cookie Policy
                                </Link>
                            </div>

                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3">
                        <p className="text-secondary mb-0">
                            © 2026 Investify. All rights reserved.
                        </p>
                        <div className="d-flex align-items-center gap-3">
                            <a href="/" className="text-secondary"><FaTwitter size={16} /></a>
                            <a href="/" className="text-secondary"><FaLinkedinIn size={16} /></a>
                            <a href="/" className="text-secondary"><FaGithub size={16} /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}