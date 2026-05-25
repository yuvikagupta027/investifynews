import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Categories() {

    const [cats, setcats] = useState([]);
    const [articles, setarticles] = useState([]);
    const navi = useNavigate();

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

    function fetchcategories() {
        axios.post("https://investifynews-1.onrender.com/fetchcategories")
            .then((succ) => {
                setcats(succ.data);
            })
    }

    function fetcharticles() {
        axios.post("https://investifynews-1.onrender.com/fetcharticles")
            .then((succ) => {
                setarticles(succ.data);
            })
    }

    useEffect(() => {
        fetchcategories();
        fetcharticles();
    }, [])

    return (
        <>
            <div>
                <Navbar />
                <div className="container-fluid p-4">
                    <h3 className="fw-bold mb-0">Categories</h3>
                    <div className="row g-4 mt-1">
                        {cats.map((row, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
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
            <Footer />
        </>
    )
}