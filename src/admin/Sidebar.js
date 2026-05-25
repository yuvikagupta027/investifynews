import { AiFillDashboard } from "react-icons/ai";
import { BiCalculator } from "react-icons/bi";
import { FaClipboardList, FaRegSquare, FaUsers } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdEnergySavingsLeaf, MdLogout, MdOutlineInventory, MdOutlineLibraryBooks } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {

    const navi = useNavigate();
    const id = localStorage.getItem("login");

    const list = [
        { link: "/admin/Dashboard", name: "Dashboard", icon: <AiFillDashboard size={17} /> },
        { link: "/admin/AllArticles", name: "All Articles", icon: <MdOutlineLibraryBooks size={17} /> },
        { link: "/admin/AddArticle", name: "Add Article", icon: <FaRegSquare size={17} /> },
        // { link: "/admin/EditArticle", name: "Edit Article", icon: <FaClipboardList size={17} /> },
        { link: "/admin/BulkUploadArticles", name: "Bulk Upload Articles", icon: <FaUsers size={17} /> },
        { link: "/admin/AddCategory", name: "Categories", icon: <MdOutlineInventory size={17} /> },
        { link: "/admin/Settings", name: "Settings", icon: <IoSettings size={17} /> },
    ]

    function logout() {
        if (id) {
            localStorage.removeItem("login");
            navi("/admin/Login")
        }
    }

    return (
        <>
            <div className="d-none d-lg-flex flex-column bg-light text-dark min-vh-100 p-0 position-fixed" style={{ width: "250px", zIndex: 1000 }}>
                <div className="d-flex align-items-center justify-content-center">
                    <span className="card colorrr text-light p-1">
                        <MdEnergySavingsLeaf size={20} />
                    </span>
                    <h4 className="p-3 mt-2 text-dark">Investify News</h4>
                </div>
                <ul className="nav flex-column w-100">
                    {list.map((row, index) => (
                        <li className="nav-item w-100">
                            <NavLink
                                to={row.link}
                                className={({ isActive }) =>
                                    `mx-3 nav-link sidebar-link d-flex align-items-center gap-2 fw-bold ${isActive ? "active-link" : "text-dark"
                                    }`
                                }>
                                {row.icon}
                                {row.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto w-100">
                    <div className="p-3">
                        <button onClick={logout} className="btn btn-danger align-items-center w-100">
                            <MdLogout size={18} className="mb-1" /> Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar">
                <div className="offcanvas-header">
                    <h5 className="fw-bold">Investify News</h5>
                    <button className="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>

                <div className="offcanvas-body p-0">
                    <ul className="nav flex-column">
                        {list.map((row, index) => (
                            <li key={index} className="nav-item">
                                <NavLink to={row.link} className="nav-link text-dark fw-bold d-flex align-items-center gap-2 px-3">
                                    {row.icon}
                                    {row.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="p-3">
                        <button onClick={logout} className="btn btn-danger align-items-center w-100">
                            <MdLogout size={18} className="mb-1" /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}