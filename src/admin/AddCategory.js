import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function AddCategory() {

    function submitcat(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var cat = data.get("cat")

        axios.post("https://investifynews-1.onrender.com/addcategories", {
            Cat: cat
        }).then((succ) => {
            alert("Category added successfully!");
            e.target.reset();
            fetchcategories();
        })
    }

    const [cats, setcats] = useState([]);

    function fetchcategories() {
        axios.post("https://investifynews-1.onrender.com/fetchcategories").then((Succ) => {
            setcats(Succ.data)
        })
    }

    useEffect(() => {
        fetchcategories();
    }, [])

    function dell(x) {
        axios.post("https://investifynews-1.onrender.com/deletecategory", {
            Id: x,
        }).then((succ) => {
            if (succ.data == "ok") {
                alert("Category deleted Successfully!");
                fetchcategories();
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
                                <h4 className="">Category Management</h4>
                                <button data-bs-toggle="modal" data-bs-target="#modal" className="btn btn-primary">Add Categories +</button>
                            </div>
                            <div className="card shadow-sm ps-1 mt-3">
                                <div className="card-body p-0">
                                    <div className="table-responsive" >
                                        <table className="table table-hover align-middle mb-0 text-nowrap">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Category</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cats.map((row, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{row.Cat}</td>
                                                        <td>
                                                            <button onClick={() => dell(row._id)} className="btn btn-danger">
                                                                <MdDelete />
                                                            </button>
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
            </div>
            <div className="modal fade" id="modal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3 mt-3 mb-0 pb-0">
                            <h5>Add Categories</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="px-3 mb-3">
                            <form onSubmit={submitcat}>
                                <input type="text" placeholder="like Markets, Crypto etc.." name="cat" required className="form-control mb-2" />
                                <button type="submit" className="btn btn-danger">Add Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}