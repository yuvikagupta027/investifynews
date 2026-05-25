import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import * as XLSX from "xlsx";

export default function BulkUploadArticles() {

    const [exceldata, setexceldata] = useState([]);

    function handlefile(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {
                type: "array"
            });
            const sheetname = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetname];
            const jsondata = XLSX.utils.sheet_to_json(worksheet);
            setexceldata(jsondata);
        }
    }

    function uploadarticles() {
        axios.post("https://investifynews-1.onrender.com/bulkuploadarticles", {
            Articles: exceldata
        }).then((succ) => {
            if (succ.data == "ok") {
                alert("Articles uploaded successfully!");
                setexceldata([]);
            }
        })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row g-0">
                    <div className="col-lg-2">
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 min-vh-100">
                        <Navbar />
                        <div className="px-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4>Bulk Upload Articles</h4>
                                    <p>Upload multiple articles using Excel</p>
                                </div>
                                {
                                    exceldata.length > 0 &&
                                    <button onClick={uploadarticles} className="btn btn-primary">
                                        Upload Articles
                                    </button>
                                }
                            </div>
                            <div className="card border-0 shadow-sm rounded-4 p-4 mt-3">
                                <input type="file" accept=".xlsx, .xls" className="form-control" onChange={handlefile} />
                            </div>
                            {
                                exceldata.length > 0 &&
                                <div className="card border-0 shadow-sm rounded-4 p-3 mt-4">
                                    <h5 className="mb-3">
                                        Preview Articles
                                    </h5>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Category</th>
                                                    <th>Author</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    exceldata.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{row.Title}</td>
                                                            <td>{row.Category}</td>
                                                            <td>{row.Author}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
