import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Login() {

    const navi = useNavigate();

    function submitdata(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        axios.post("http://localhost:1000/loginadmin", {
            Email: email,
            Password: password,
        }).then((succ) => {
            console.log(succ.data, "data inserted");

            if (succ.data && succ.data._id) {
                localStorage.setItem("adminlogin", succ.data._id);
                navi("/admin/Dashboard");
            } else {
                alert("Wrong credentials. Please try again.");
            }
        })
    }

    const [id, setid] = useState(localStorage.getItem("adminlogin"));

    function checkuser() {
        if (id) {
            axios.post("http://localhost:1000/adminlogincheck", { Id: id })
                .then((response) => {
                    if (response.data) {
                        navi("/admin/Dashboard");
                    }
                })
                .catch((error) => {
                    console.error("Check user error:", error);
                });
        }
    }

    useEffect(() => {
        setTimeout(() => {
            checkuser();
        }, 500);
    }, [id])

    return (
        <>
            <div className="row m-0 justify-content-center align-items-center vh-100 p-2 bg-primary-subtle">
                <div className="col-lg-4 card bg-light p-0">
                    <div>
                        <div className="p-3">
                            <h5 className="fw-bold text-center text-dark">Login</h5>
                            <form onSubmit={submitdata}>
                                <input type="email" name="email" className="form-control mb-2" placeholder="Email" required />
                                <input type="password" name="password" className="form-control mb-2" placeholder="Password" required />
                                <button type="submit" className="form-control bg-primary w-75 m-auto text-light fw-bold">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}