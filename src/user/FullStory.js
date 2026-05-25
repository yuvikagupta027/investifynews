import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function FullStory() {

    const routerlocation = useLocation();

    const articleId = new URLSearchParams(
        routerlocation.search
    ).get("id");

    const [article, setarticle] = useState(null);

    function fetcharticle() {
        axios.post("https://investifynews-1.onrender.com/fetchsinglearticles", {
            Id: articleId
        })
            .then((succ) => {
                setarticle(succ.data);
            })
    }

    useEffect(() => {
        if (articleId) {
            fetcharticle();
        }
    }, [articleId])

    if (!article) {
        return (
            <>
                <Navbar />
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <h3 className="fw-bold">
                            Loading Article...
                        </h3>
                        <p className="text-secondary">
                            Please wait
                        </p>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="mx-auto" style={{ maxWidth: "900px" }}>
                    <Link to="/" className="btn btn-link text-decoration-none text-dark p-0 mb-4">
                        ← Back to News
                    </Link>
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <span className="badge rounded-pill px-3 py-2" style={{ background: "#DBEAFE", color: "#2563EB" }}>
                            {article.Category}
                        </span>
                        <span className="text-secondary fw-semibold">
                            {
                                typeof article.Date === "number"
                                    ? new Date((article.Date - 25569) * 86400 * 1000)
                                        .toLocaleDateString("en-GB")
                                    : article.Date
                            }
                        </span>
                    </div>
                    <h1 className="fw-bold display-5" style={{ lineHeight: "1.1" }}>
                        {article.Title}
                    </h1>
                    <div className="mt-4 border-bottom pb-4 d-flex align-items-center gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "55px", height: "55px", background: "#06B6D4", color: "white", fontSize: "1.2rem" }}>
                            {article.Author?.slice(0, 1)}
                        </div>
                        <div>
                            <h6 className="fw-bold mb-1">
                                {article.Author}
                            </h6>
                            <p className="text-secondary mb-0">
                                News Reporter
                            </p>
                        </div>
                    </div>
                    {
                        article.Image &&
                        <img src={article.Image} alt="" className="img-fluid rounded-5 mt-5 w-100 shadow-sm" style={{ height: 450, width: "70%", objectFit: "cover" }} />
                    }
                    <div className="mt-5">
                        <p className="text-secondary" style={{ lineHeight: "2", fontSize: "1.15rem", whiteSpace: "pre-line" }}>
                            {article.Content}
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}