import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaArrowTrendUp, FaNewspaper, FaRegEye, FaUsers } from "react-icons/fa6";
import { MdOutlineTrendingUp } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

    const [articles, setarticles] = useState([]);
    function fetcharticles() {
        axios.post("https://investifynews-1.onrender.com/fetcharticles").then((succ) => {
            setarticles(succ.data)
        })
    }
    useEffect(() => {
        fetcharticles();
    }, [])

    const analytics = [
        {
            id: 1,
            title: "Total Articles",
            value: articles.length,
            icon: <FaNewspaper size={22} color="#2563EB" />,
            bg: "#DBEAFE"
        },

        {
            id: 2,
            title: "Total Views",
            value: "2.8M",
            icon: <FaRegEye size={22} color="#22C55E" />,
            bg: "#DCFCE7"
        },

        {
            id: 3,
            title: "Trending News Articles",
            value: articles.filter(
                (item) => item.Trending === true
            ).length,
            icon: <MdOutlineTrendingUp size={24} color="#F59E0B" />,
            bg: "#FEF3C7"
        },

        {
            id: 4,
            title: "Latest News Articles",
            value: articles.filter(
                (item) => item.Latest === true
            ).length,
            icon: <FaUsers size={22} color="#EC4899" />,
            bg: "#FCE7F3"
        }
    ];

    const recentarticles = [
    ]

    return (
        <>
            <div className="container-fluid">
                <div className="row g-0">
                    <div className="col-lg-2 d-lg-block">
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 col-12 min-vh-100">
                        <Navbar />
                        <div className="px-4">
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div>
                                    <h3 className="fw-bold">
                                        Welcome back, Editor 👋
                                    </h3>
                                    <p className="text-secondary">
                                        Here's your newsroom performance today.
                                    </p>
                                </div>
                                <Link to="/admin/AddArticle">
                                    <button className="btn btn-primary rounded-pill px-4">
                                        + Create Article
                                    </button>
                                </Link>
                            </div>
                            <div className="row g-4">
                                {analytics.map((item) => (
                                    <div className="col-lg-3 col-md-6" key={item.id}>
                                        <div className="card border-0 shadow-sm rounded-5 p-4 h-100">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <small className="text-secondary fw-semibold">
                                                        {item.title}
                                                    </small>
                                                    <h4 className="fw-bold mt-2">
                                                        {item.value}
                                                    </h4>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center rounded-4" style={{ width: "60px", height: "60px", background: item.bg }}>
                                                    {item.icon}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                            <div className="row g-4 mt-3">
                                <div className="col-lg-8">
                                    <div className="card border-0 shadow-sm rounded-5 p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h5 className="fw-bold mb-0">
                                                Recent Articles
                                            </h5>
                                            <Link to="/admin/AllArticles">
                                                <button className="btn btn-light rounded-pill">
                                                    View All
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>TITLE</th>
                                                        <th>CATEGORY</th>
                                                        <th>AUTHOR</th>
                                                        <th>DATE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {articles.slice(0, 4).map((row) => (
                                                        <tr key={row.id}>
                                                            <td className="fw-semibold">{row.Title}</td>
                                                            <td>{row.Category}</td>
                                                            <td>{row.Author}</td>
                                                            <td>
                                                                {
                                                                    typeof row.Date === "number"
                                                                        ? new Date((row.Date - 25569) * 86400 * 1000)
                                                                            .toLocaleDateString("en-GB")
                                                                        : row.Date
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card border-0 shadow-sm rounded-5 p-4">
                                        <h5 className="fw-bold mb-4">
                                            Quick Actions
                                        </h5>
                                        <div className="d-grid gap-3">
                                            <Link to="/admin/AddArticle">
                                                <button className="btn btn-primary rounded-pill py-2 w-100">
                                                    + Add Article
                                                </button>
                                            </Link>
                                            <Link to="/admin/BulkUploadArticles">
                                                <button className="btn btn-dark rounded-pill py-2 w-100">
                                                    + Bulk Upload
                                                </button>
                                            </Link>
                                            <Link to="/admin/AddCategory">
                                                <button className="btn btn-success rounded-pill py-2 w-100">
                                                    + Add Category
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}