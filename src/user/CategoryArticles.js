import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";

export default function CategoryArticles() {

    const navi = useNavigate();
    const routerlocation = useLocation();
    const categoryId = new URLSearchParams(routerlocation.search).get("id");
    const [articles, setarticles] = useState([]);

    function fetcharticles() {
        axios.post("http://localhost:1000/fetcharticles")
            .then((succ) => {
                const filtered = succ.data.filter(
                    (item) =>
                        item.Category?.trim().toLowerCase() ===
                        categoryId?.trim().toLowerCase()
                );
                setarticles(filtered);
            })
    }

    useEffect(() => {
        fetcharticles();
    }, [categoryId])

    return (
        <>
            <Navbar />
            <div className="container-fluid p-4">
                <h2 className="fw-bold">
                    {categoryId} News
                </h2>
                <p className="text-secondary">
                    Latest articles in {categoryId}
                </p>
                <div className="row g-4 mt-3">
                    {
                        articles.map((row) => (
                            <div className="col-lg-4" key={row._id}>
                                <div className="card border-0 shadow rounded-5 h-100">
                                    {
                                        row.Image &&
                                        <img src={row.Image} className="card-img-top rounded-top-5" style={{ height: "220px", objectFit: "cover" }} />
                                    }
                                    <div className="card-body p-4">
                                        <span className="badge bg-primary mb-3">
                                            {row.Category}
                                        </span>
                                        <h4 className="fw-bold">
                                            {row.Title}
                                        </h4>
                                        <p className="text-secondary">
                                            {row.Content?.slice(0, 120) + "..."}
                                        </p>
                                        <button onClick={() => navi("/user/FullStory?id=" + row._id)} className="btn btn-dark rounded-pill px-4">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}