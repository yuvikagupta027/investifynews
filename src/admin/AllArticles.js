import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AllArticles() {

    const [articles, setarticles] = useState([]);
    const navi = useNavigate();

    function fetcharticles() {
        axios.post("https://investifynews-1.onrender.com/fetcharticles").then((succ) => {
            setarticles(succ.data)
        })
    }
    useEffect(() => {
        fetcharticles();
    }, [])

    function deletee(x) {
        axios.post("https://investifynews-1.onrender.com/deletearticle", {
            Id: x,
        }).then((succ) => {
            if (succ.data == "ok") {
                alert("Article deleted successfully.!");
                fetcharticles();
            }
        })
    }

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
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="">Articles</h4>
                                    <p>Manage all published content</p>
                                </div>
                                <Link to="/admin/AddArticle">
                                    <button className="btn btn-primary">+ New Article</button>
                                </Link>
                            </div>
                            <div className="card border-0 shadow-sm rounded-4 p-3">
                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>TITLE</th>
                                                <th>CATEGORY</th>
                                                <th>AUTHOR</th>
                                                <th>DATE</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {articles.map((row) => (
                                                <tr key={row.id}>
                                                    <td>{row.Title}</td>
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
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <button onClick={() => deletee(row._id)} className="btn btn-danger">
                                                                <MdDelete size={16} color="white" />
                                                            </button>
                                                            <button onClick={() => navi("/admin/EditArticle/" + row._id)} className="btn btn-dark">
                                                                <FaPenToSquare size={16} color="white" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}