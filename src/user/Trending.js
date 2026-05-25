import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { FaFireFlameCurved } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Trending() {

    const [articles, setarticles] = useState([]);
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
                    <div className="d-flex align-items-center">
                        <FaFireFlameCurved size={23} color="#22C55E" />
                        <h3 className="fw-bold mb-0">Trending Now</h3>
                    </div>
                    <p>Most read stories in the last 24 hours</p>
                    <div className="row g-4 mt-1">
                        {articles
                            .filter((row) => row.Trending == true)
                            .map((row) => (
                                <div className="col-lg-4" key={row._id}>
                                    <div className="card cardd border-0 rounded-5 p-4 h-100 shadow" style={{ background: "#fff" }}>
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <span className="badge rounded-pill" style={{ background: "#22C55E", color: "white", fontWeight: "600" }}>
                                                Trending
                                            </span>
                                        </div>
                                        <h4 className="fw-bold" style={{ fontSize: "1.5rem", lineHeight: "1.4" }}>
                                            {row.Title}
                                        </h4>
                                        <p className="text-secondary mt-3">
                                            {row.Content.slice(0, 22) + "..."}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                                            <span className="text-secondary fw-semibold">
                                                {row.Category}
                                            </span>
                                            <button onClick={() => navi("/user/FullStory?id=" + row._id)} className="btn btn-primary btn-sm">
                                                Read Full Story
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}