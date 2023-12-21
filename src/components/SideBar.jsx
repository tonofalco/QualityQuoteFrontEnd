import { Link } from "react-router-dom"

import { useAuthStore, useActiveBar } from "../hooks"

import LogoQualityGuerrero from '../assets/img/logoBlanco.png'
import '../styles/sidebar.css'
import { Sidebar_bg } from "../styles/styledComponents"


export const SideBar = () => {

    const { user } = useAuthStore()
    const { handleLinkSelection, valueLink} = useActiveBar()


    return (
        <>
            <Sidebar_bg>
                <img alt="logo de empresa" src={LogoQualityGuerrero} className="mb-3 mx-3" />

                <ul className="nav sideBarList flex-column">
                    <li className={`nav-item  ${valueLink === 0 ? 'active bg-primary ' : ''}`}>
                        <Link to="/" className="nav-link text-light" onClick={() => handleLinkSelection(0)}> <i className="fa-solid fa-house"></i>&nbsp; Inicio</Link>
                    </li>

                    <li className={`nav-item ${valueLink === 1 ? 'active bg-primary' : ''}`}>
                        <Link to="/map" className="nav-link text-light" onClick={() => handleLinkSelection(1)}><i className="fa-solid fa-bus"></i>&nbsp; Cotización</Link>
                    </li>

                    <li className={`nav-item ${valueLink === 2 ? 'active bg-primary' : ''}`}>
                        <Link to="/calendar" className="nav-link text-light" onClick={() => handleLinkSelection(2)}><i className="fa-solid fa-calendar-days"></i>&nbsp; Calendario</Link>
                    </li>

                    <li className={`nav-item ${valueLink === 3 ? 'active bg-primary' : ''}`}>
                        <Link to="/config" className="nav-link text-light" onClick={() => handleLinkSelection(3)}><i className="fa-solid fa-gear"></i>&nbsp; Configuración</Link>
                    </li>

                    <li>
                        <hr className="mx-3" style={{ color: '#fff' }} />
                    </li>

                    <li className="text-light mx-3">
                        <i className="fa-solid fa-user"></i>
                        &nbsp; {user.name}
                    </li>
                </ul>
            </Sidebar_bg>
        </>
    )
}