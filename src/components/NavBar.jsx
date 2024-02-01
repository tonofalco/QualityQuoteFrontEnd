import { useRef } from "react"
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa";

import { useAuthStore, useActiveBar } from "../hooks/"

import LogoQualityGuerrero from '../assets/img/logoBlanco.png'
import '../styles/navbar.css'


export const NavBar = () => {

    const navRef = useRef();

    const { startLogout, user } = useAuthStore()
    const { handleLinkSelection, valueLink, openNavBar, closeNavBar, stateNavBar } = useActiveBar()

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
        stateNavBar ? closeNavBar() : openNavBar()
    };



    return (
        <>
            <div className="navbar navbar-dark bg-dark px-4">

                <div>
                    <div className="d-block d-md-none">


                        <nav ref={navRef}>
                            <br /><br />
                            <img alt="logo de empresa" src={LogoQualityGuerrero} className=" mb-2  img-fluid float-start" />

                            <ul className="nav navBarList flex-column">
                                <li className={`nav-item  ${valueLink === 0 ? 'active bg-primary ' : ''}`}>
                                    <Link to="/" className="nav-link text-light" onClick={() => { showNavbar(); }}> <i className="fa-solid fa-house"></i>&nbsp; Inicio</Link>
                                </li>

                                <li className={`nav-item ${valueLink === 1 ? 'active bg-primary' : ''}`}>
                                    <Link to="/map" className="nav-link text-light" onClick={() => { showNavbar(); }}><i className="fa-solid fa-bus"></i>&nbsp; Cotización</Link>
                                </li>

                                <li className={`nav-item ${valueLink === 2 ? 'active bg-primary' : ''}`}>
                                    <Link to="/calendar" className="nav-link text-light" onClick={() => { showNavbar(); }}><i className="fa-solid fa-calendar-days"></i>&nbsp; Calendario</Link>
                                </li>

                                {user.role == 'admin' && (
                                    <li className={`nav-item ${valueLink === 3 ? 'active bg-primary' : ''}`}>
                                        <Link to="/config" className="nav-link text-light" onClick={() => { showNavbar(); }}><i className="fa-solid fa-gear"></i>&nbsp; Configuración</Link>
                                    </li>
                                )}

                                <li>
                                    <hr className="mx-3" style={{ color: '#fff' }} />
                                </li>

                                <li className="text-light mx-3">
                                    <i className="fa-solid fa-user"></i>
                                    &nbsp; {user.name}
                                </li>
                            </ul>
                            <button
                                className="nav-btn nav-close-btn"
                                onClick={() => { showNavbar(); }}
                            >
                                <FaTimes />
                            </button>
                        </nav>

                    </div>
                    <button
                        className="nav-btn"
                        onClick={() => { showNavbar(); }}>
                        <FaBars />
                    </button>
                </div>

                <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                        startLogout()
                        closeNavBar()
                    }}
                >
                    <i className="fas fa-sign-out-alt"></i>
                    &nbsp;
                    <span>Salir</span>
                </button>

            </div>

        </>
    )
}
