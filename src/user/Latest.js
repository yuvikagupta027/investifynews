import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Latest() {

    const [articles, setarticles] = useState([])
    const navi = useNavigate();

    function fetcharticles() {
        axios.post("https://investifynews-1.onrender.com/fetcharticles")
            .then((succ) => {
                setarticles(succ.data);
            })
    }

    useEffect(() => {
        fetcharticles();
    }, [])

    return (
        <>
            <div>
                <Navbar />
                <div className="container-fluid p-4">
                    <h3 className="fw-bold mb-0">Latest News</h3>
                    <p>Real-time financial news and market updates</p>
                    <div className="row g-4">
                        <div className="d-flex flex-column gap-3">
                            {articles
                                .filter((row) => row.Latest == true)
                                .map((row) => (
                                    <div className="card border-0 rounded-5 shadow cardd p-4" style={{ background: "#fff" }}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="d-flex align-items-center justify-content-center rounded-4 fw-bold" style={{ minHeight: "55px", minWidth: "55px", background: "#FEE2E2", fontSize: "1.4rem" }}>
                                                    {row.Title.slice(0, 1)}
                                                </div>
                                                <div>
                                                    <h6 className="fw-bold mb-1" style={{ maxWidth: "800px" }}>
                                                        {row.Title}
                                                    </h6>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="text-secondary fw-semibold">
                                                            {row.Category}
                                                        </span>
                                                        <span className="text-secondary">
                                                            •
                                                        </span>
                                                        <small className="text-secondary">
                                                            {
                                                                typeof row.Date === "number"
                                                                    ? new Date((row.Date - 25569) * 86400 * 1000)
                                                                        .toLocaleDateString("en-GB")
                                                                    : row.Date
                                                            }
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => navi("/user/FullStory?id=" + row._id)} className="btn btn-primary btn-sm">
                                                Read Full Story
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}