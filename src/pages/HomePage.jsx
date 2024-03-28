import { Home, NavBar, SideBar } from "../components/"
import { useActiveBar } from "../hooks"


// import second from '../styles/overlayShadow.css'



export const HomePage = () => {
  const { stateNavBar } = useActiveBar()

  const colMd10Active = window.innerWidth > 768;
  const containerWidth = colMd10Active ? '87%' : '100%';

  return (
    <>

      <div className="row gx-0">
        <div className="sidebar_column d-none d-md-block">
          <SideBar />
        </div>

        <div className="content_column">
          <NavBar />
          <div className={` cuerpo ${stateNavBar == true ? 'overlay' : ''}`}>

            <Home />
          </div>
        </div>

      </div>
    </>
  )
}