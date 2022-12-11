import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../data/auth";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    const [navbarOpen, setNavbarOpen] = useState(false);

    function _logout() {
        Cookies.remove("token");
        dispatch(logout());
        navigate('/login');
        setNavbarOpen(false);
    }

    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-900 z-50">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            href="/"
                        >
                            pink Tailwind Starter Kit
                        </a>
                        <button
                            className={`text-white ${navbarOpen ? "hidden" : "flex"}  cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none`}
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <HiMenu />
                        </button>
                        <button
                            className={`text-white ${navbarOpen ? "flex" : "hidden"} cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none`}
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <HiX />
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center h-38 lg:h-12" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <Link
                                    onClick={() => setNavbarOpen(false)}
                                    className="px-3 py-5 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to="/"
                                >
                                    <h1 className="hover:border-b-2 px-44 md:px-0">Home</h1>
                                </Link>
                            </li>
                            {
                                isAuth && (
                                    <li>
                                        <button
                                            className="px-3 py-5 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                        >
                                            <h1 onClick={_logout} className="hover:border-b-2 px-44 md:px-0">Logout </h1>
                                        </button>
                                    </li>
                                )
                            },
                            {
                                !isAuth && (
                                    <>
                                        <li className="nav-item">
                                            <Link
                                                onClick={() => setNavbarOpen(false)}
                                                className="px-3 py-5 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                                to="/login"
                                            >
                                                <h1 className="hover:border-b-2 px-44 md:px-0">Login</h1>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                onClick={() => setNavbarOpen(false)}
                                                className="px-3 py-5 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                                to="/register"
                                            >
                                                <h1 className="hover:border-b-2 px-44 md:px-0">Register</h1>
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}