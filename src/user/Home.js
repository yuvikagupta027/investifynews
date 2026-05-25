import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { FaArrowTrendDown, FaArrowTrendUp, FaFireFlameCurved } from "react-icons/fa6";
import { FaClock, FaEye, FaRegClock, FaRegCommentDots } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {

    const [latestarticle, setlatestarticle] = useState(null);
    const [articles, setarticles] = useState([]);
    const [cats, setcats] = useState([]);

    const navi = useNavigate();

    function fetchcategories() {
        axios.post("https://investifynews-1.onrender.com/fetchcategories")
            .then((succ) => {
                setcats(succ.data);
            })
    }

    function fetchlatestarticle() {
        axios.post("https://investifynews-1.onrender.com/fetcharticles")
            .then((succ) => {
                const latest = succ.data[succ.data.length - 1];
                setlatestarticle(latest);
                setarticles(succ.data);
            })
    }

    useEffect(() => {
        fetchlatestarticle();
        fetchcategories();
    }, [])

    const colors = [
        "#DCFCE7",
        "#DBEAFE",
        "#FEE2E2",
        "#FEF3C7",
        "#E9D5FF",
        "#FCE7F3",
        "#CCFBF1",
        "#E0F2FE",
        "#F3F4F6",
        "#FFE4E6"
    ];

    return (
        <>
            <div>
                <Navbar />
                <div className="container py-5">
                    {latestarticle &&
                        <div className="card border-0 rounded-5 p-5 shadow-sm" style={{ background: "#EEF6FF" }}>
                            <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2" style={{ width: "fit-content" }}>
                                BREAKING NEWS
                            </span>
                            <p className="text-muted mb-2">
                                {latestarticle.Category} •
                                {
                                    typeof latestarticle.Date === "number"
                                        ? new Date((latestarticle.Date - 25569) * 86400 * 1000)
                                            .toLocaleDateString("en-GB")
                                        : latestarticle.Date
                                }
                            </p>
                            <h1 className="fw-bold display-5" style={{ maxWidth: "1100px" }}>
                                {latestarticle.Title}
                            </h1>
                            <p className="text-secondary mt-3" style={{ maxWidth: "700px" }}>
                                {latestarticle.Content}
                            </p>
                            <div className="d-flex gap-3 mt-1">
                                <button onClick={() => navi("/user/FullStory?id=" + latestarticle._id)} className="btn btn-primary px-4 py-2 rounded-pill">
                                    Read Full Story
                                </button>
                            </div>
                        </div>
                    }
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                        <div className="d-flex align-items-center gap-2">
                            <div className="">
                                <FaFireFlameCurved size={23} color="#22C55E" />
                            </div>
                            <h3 className="fw-bold mb-0">Trending Now</h3>
                        </div>
                        <button className="btn btn-link text-dark text-decoration-none fw-semibold">
                            View All →
                        </button>
                    </div>
                    <div className="row g-4">
                        {articles
                            .filter((row) => row.Trending == true)
                            .slice(0, 3).map((row) => (
                                <div className="col-lg-4" key={row._id}>
                                    <div className="card border-0 rounded-5 p-4 h-100 shadow" style={{ background: "#fff" }}>
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
                                            <div className="d-flex align-items-center gap-3">
                                                <button onClick={() => navi("/user/FullStory?id=" + row._id)} className="btn btn-primary d-flex align-items-center gap-1 text-light">
                                                    <FaEye size={14} />
                                                    <small>View</small>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                        <div className="d-flex align-items-center gap-2">
                            <div className="">
                                <FaClock size={23} color="#70ceed" />
                            </div>
                            <h3 className="fw-bold mb-0">Latest News</h3>
                        </div>
                        <button className="btn btn-link text-dark text-decoration-none fw-semibold">
                            View All →
                        </button>
                    </div>
                    <div className="d-flex flex-column gap-3">
                        {articles
                            .filter((rows) => rows.Latest == true)
                            .slice(0, 3).map((rows) => (
                                <div className="card border-0 rounded-5 shadow p-4" style={{ background: "#fff" }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="d-flex align-items-center justify-content-center rounded-4 fw-bold" style={{ width: "55px", height: "55px", background: "#FEE2E2", fontSize: "1.4rem" }}>
                                                {rows.Title.slice(0, 1)}
                                            </div>
                                            <div>
                                                <h5 className="fw-bold mb-1" style={{ maxWidth: "800px" }}>
                                                    {rows.Title}
                                                </h5>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="text-secondary fw-semibold">
                                                        {rows.Category}
                                                    </span>
                                                    <span className="text-secondary">
                                                        •
                                                    </span>
                                                    <small className="text-secondary">
                                                        {
                                                            typeof rows.Date === "number"
                                                                ? new Date((rows.Date - 25569) * 86400 * 1000)
                                                                    .toLocaleDateString("en-GB")
                                                                : rows.Date
                                                        }
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => navi("/user/FullStory?id=" + rows._id)} className="btn btn-link">
                                            <FaEye color="blue" size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                        <div className="d-flex align-items-center gap-2">
                            <div className="">
                                <BiSolidCategory size={23} color="#0091ff" />
                            </div>
                            <h3 className="fw-bold mb-0">Categories</h3>
                        </div>
                        <Link to="/user/Categories">
                            <button className="btn btn-link text-dark text-decoration-none fw-semibold">
                                View All →
                            </button>
                        </Link>
                    </div>
                    <div className="d-flex gap-3 align-items-center justify-content-center flex-wrap">
                        <div className="row g-4 mt-1 w-100">
                            {cats.slice(0, 4).map((row, index) => (
                                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                    <div onClick={() => navi("/user/CategoryArticles?id=" + row.Cat)} className="card cardd border-0 rounded-5 shadow p-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="d-flex align-items-center justify-content-center rounded-4 fw-bold" style={{ minWidth: "45px", minHeight: "45px", background: colors[index % colors.length] }}>
                                                {row.Cat.slice(0, 1)}
                                            </div>
                                            <div>
                                                <h5 className="fw-bold m-0 p-0">
                                                    {row.Cat}
                                                </h5>
                                                <small className="text-secondary fw-semibold m-0 p-0">
                                                    {
                                                        articles.filter(
                                                            (item) => item.Category === row.Cat
                                                        ).length
                                                    } articles
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="container py-1">
                    <div className="rounded-5 text-center py-5 px-4" style={{ background: "#EEF6FF" }}>
                        <h1 className="fw-bold" style={{ fontSize: "3rem" }}>
                            Stay Ahead of the Markets
                        </h1>
                        <p className="text-secondary mx-auto mt-3" style={{ maxWidth: "700px", fontSize: "1.1rem" }}>
                            Get daily curated financial news, market analysis,
                            and exclusive insights delivered to your inbox.
                        </p>
                        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
                            <input type="email" placeholder="Enter your email" className="form-control rounded-4 border-0 shadow-sm" style={{ maxWidth: "420px", height: "55px", paddingLeft: "20px" }} />
                            <button className="btn btn-primary rounded-4 px-4" style={{ height: "55px", minWidth: "150px", fontWeight: "600" }}>
                                Subscribe
                            </button>
                        </div>
                        <p className="text-secondary mt-4 mb-0 fw-semibold">Join 250,000+ subscribers • Free forever</p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}