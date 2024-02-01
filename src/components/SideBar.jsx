import { useEffect } from 'react';
import { Link } from "react-router-dom"

import { useAuthStore, useActiveBar } from "../hooks"

import LogoQualityGuerrero from '../assets/img/logoBlanco.png'
import '../styles/sidebar.css'


export const SideBar = () => {

    const { user } = useAuthStore()
    // console.log(user);
    // console.log(user.role);
    const { handleLinkSelection, valueLink } = useActiveBar()

    useEffect(() => {
        const currentPath = window.location.pathname;
        switch (currentPath) {
            case '/':
                handleLinkSelection(0);
                break;
            case '/map':
                handleLinkSelection(1);
                break;
            case '/calendar':
                handleLinkSelection(2);
                break;
            case '/config':
                handleLinkSelection(3);
                break;
            case '/config/users':
                handleLinkSelection(3);
                break;
            case '/config/costs':
                handleLinkSelection(3);
                break;
            default:
                handleLinkSelection(0);
                break;
        }
    }, [handleLinkSelection]);


    return (
        <>
            <div className="sideBar">
                <img alt="logo de empresa" src={LogoQualityGuerrero} className="mb-3 mx-3" />
                <ul className="nav sideBarList flex-column">
                    {/* / */}
                    <li className={`nav-item  ${valueLink === 0 ? 'active bg-primary' : ''}`}>
                        <Link to="/" className="nav-link text-light"><i className="fa-solid fa-house"></i>&nbsp; Inicio</Link>
                    </li>
                    {/* /map */}
                    <li className={`nav-item ${valueLink === 1 ? 'active bg-primary' : ''}`}>
                        <Link to="/map" className="nav-link text-light"><i className="fa-solid fa-bus"></i>&nbsp; Cotización</Link>
                    </li>
                    {/* /calendar */}
                    <li className={`nav-item ${valueLink === 2 ? 'active bg-primary' : ''}`}>
                        <Link to="/calendar" className="nav-link text-light"><i className="fa-solid fa-calendar-days"></i>&nbsp; Calendario</Link>
                    </li>
                    {/* /config */}
                    {user.role == 'admin' && (
                        <li className={`nav-item ${valueLink === 3 ? 'active bg-primary' : ''}`}>
                            <Link to="/config" className="nav-link text-light"><i className="fa-solid fa-gear"></i>&nbsp; Configuración</Link>
                        </li>
                    )}
                    <li>
                        <hr className="mx-3" style={{ color: '#fff' }} />
                    </li>
                    <li className="text-light mx-3">
                        <i className="fa-solid fa-user"></i>
                        &nbsp; {user.role}:
                        &nbsp;{user.name}
                    </li>
                </ul>
            </div>
        </>
    );

}