import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditArticle() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [cats, setcats] = useState([]);

    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const [category, setcategory] = useState("");
    const [author, setauthor] = useState("");
    const [image, setimage] = useState("");
    const [tags, setTags] = useState({
        trending: false,
        latest: false
    });

    function fetchcategories() {
        axios.post("http://localhost:1000/fetchcategories")
            .then((succ) => {
                setcats(succ.data);
            })
    }

    function fetchsinglearticle() {
        axios.post("http://localhost:1000/fetchsinglearticles", {
            Id: id,
        }).then((succ) => {

            settitle(succ.data.Title);
            setcontent(succ.data.Content);
            setcategory(succ.data.Category);
            setauthor(succ.data.Author);
            setimage(succ.data.Image);
            setTags({
                trending: succ.data.Trending,
                latest: succ.data.Latest
            })
        })
    }

    useEffect(() => {
        fetchcategories();
        fetchsinglearticle();
    }, [])

    function handleChange(e) {
        setTags({
            ...tags,
            [e.target.name]: e.target.checked
        });
    }

    function updatearticle(e) {
        e.preventDefault();

        axios.post("http://localhost:1000/updatearticle", {
            Id: id,
            Title: title,
            Content: content,
            Category: category,
            Author: author,
            Image: image,
            Trending: tags.trending,
            Latest: tags.latest,
        }).then((succ) => {

            if (succ.data == "ok") {
                alert("Article updated successfully!");
                navigate("/admin/AllArticles");
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
                            <form
                                onSubmit={updatearticle}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>Edit Article</h4>
                                        <p>Update your article content</p>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Update Article
                                    </button>
                                </div>
                                <div className="row g-3">
                                    <div className="col-lg-8">
                                        <div className="card p-3 shadow-sm border-0 rounded-4">
                                            <label className="form-label small text-dark">
                                                TITLE
                                            </label>
                                            <input required type="text" value={title} onChange={(e) => settitle(e.target.value)} className="form-control mb-3" />
                                        </div>
                                        <div className="card p-3 shadow-sm border-0 rounded-4 mt-3">
                                            <label className="form-label small text-dark">
                                                CONTENT
                                            </label>
                                            <textarea rows={12} value={content} onChange={(e) => setcontent(e.target.value)} className="form-control mb-3" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="card p-3 shadow-sm border-0 rounded-4">
                                            <label className="form-label small text-dark">
                                                CATEGORY
                                            </label>
                                            <select value={category} onChange={(e) => setcategory(e.target.value)} className="form-select mb-3">
                                                <option value="">
                                                    Choose category
                                                </option>
                                                {cats.map((row) => (
                                                    <option key={row._id} value={row.Cat}>
                                                        {row.Cat}
                                                    </option>
                                                ))}
                                            </select>
                                            <label className="form-label small text-dark">
                                                AUTHOR
                                            </label>
                                            <input required type="text" value={author} onChange={(e) => setauthor(e.target.value)} className="form-control" />
                                            <label className="form-label small text-dark mt-3">
                                                IMAGE URL
                                            </label>
                                            <input required type="text" value={image} onChange={(e) => setimage(e.target.value)} className="form-control" />
                                            <div className="d-flex flex-wrap align-items-center gap-4 rounded-3 mt-2">
                                                <div className="form-check">
                                                    <input type="checkbox" name="trending" checked={tags.trending} onChange={handleChange} className="form-check-input" />
                                                    <label className="form-check-label text-dark">Trending</label>
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
