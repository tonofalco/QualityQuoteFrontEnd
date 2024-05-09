import { Home, NavBar, SideBar } from "../components/"
import { useActiveBar } from "../hooks"

import '../styles/overlayShadow.css';



export const HomePage = () => {
  const { stateNavBar } = useActiveBar()

  return (
    <>

      <div className="row gx-0">
        <div className="sidebar_column d-none d-md-block">
          <SideBar />
        </div>

        <div className="content_column">
          <NavBar />
          {/* <div className={` cuerpo ${stateNavBar == true ? 'overlay' : ''}`}> */}

          {!stateNavBar
            ? (
              <div className="row">
                <div className="col-12">
                  <Home />
                </div>
              </div>
            ) : (
              <div className="overlay">
                <OverlayWhole />
              </div>
            )}

        </div>
      </div>

    </>
  )
}