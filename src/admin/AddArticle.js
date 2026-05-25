import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function AddArticle() {

    const [cats, setcats] = useState([]);

    function fetchcategories() {
        axios.post("http://localhost:1000/fetchcategories").then((Succ) => {
            setcats(Succ.data)
        })
    }

    useEffect(() => {
        fetchcategories();
    }, [])

    const [tags, setTags] = useState({
        trending: false,
        latest: false
    });

    function handleChange(e) {
        setTags({
            ...tags,
            [e.target.name]: e.target.checked
        });
    }

    function submitarticle(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var title = data.get("title");
        var content = data.get("content");
        var category = data.get("category");
        var author = data.get("author");
        var image = data.get("image");
        var currentDate = new Date().toLocaleDateString();

        axios.post("http://localhost:1000/submitarticle", {
            Title: title,
            Content: content,
            Category: category,
            Author: author,
            Image: image,
            Date: currentDate,
            Trending: tags.trending,
            Latest: tags.latest,
        }).then((succ) => {
            alert("Article added successfully!");
            e.target.reset();
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
                            <form onSubmit={submitarticle}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>Add Article</h4>
                                        <p>Create and format your content</p>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Now</button>
                                </div>
                                <div className="row g-3">
                                    <div className="col-lg-8">
                                        <div className="card p-3 shadow-sm">
                                            <label className="form-label small text-dark">TITLE</label>
                                            <input required type="text" placeholder="Fed Rate Decision: What Investors Need to Know" name="title" className="form-control mb-3" />
                                        </div>
                                        <div className="card p-3 shadow-sm mt-3">
                                            <label className="form-label small text-dark">CONTENT</label>
                                            <textarea rows={9} placeholder="Add your article here..." name="content" className="form-control mb-3" />
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="card p-3 shadow-sm">
                                            <label className="form-label small text-dark">CATEGORY</label>
                                            <select required name="category" className="form-select rounded-3">
                                                <option value="">Choose category</option>
                                                {cats.map((row, index) => (
                                                    <option key={row._id} value={row.Cat}>
                                                        {row.Cat}
                                                    </option>
                                                ))}
                                            </select>
                                            <label className="form-label small text-dark mt-3">AUTHOR</label>
                                            <input required type="text" placeholder="Add Author" name="author" className="form-control mb-3" />
                                            <label className="form-label small text-dark">IMAGE</label>
                                            <input required type="url" placeholder="Add Image Url like https://..." name="image" className="form-control mb-3" />
                                            <div className="d-flex flex-wrap align-items-center gap-4 rounded-3">
                                                <div className="form-check">
                                                    <input type="checkbox" name="trending" checked={tags.trending} onChange={handleChange} className="form-check-input" />
                                                    <label className="form-check-label text-dark">Popular</label>
                                                </div>
                                                <div className="form-check">
                                                    <input type="checkbox" name="latest" checked={tags.latest} onChange={handleChange} className="form-check-input" />
                                                    <label className="form-check-label text-dark">Latest</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}