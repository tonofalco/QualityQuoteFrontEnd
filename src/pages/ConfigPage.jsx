import { NavBar, SideBar, ConfigOptions, OverlayWhole } from "../components"
import { useActiveBar } from "../hooks"
import '../styles/config.css'


export const ConfigPage = () => {
  
  const { stateNavBar } = useActiveBar()

  return (
    <>

      <div className="row gx-0">

        <div className="sidebar_column d-none d-md-block">
          <SideBar />
        </div>

        <div className="content_column">
          <NavBar />
          {!stateNavBar
            ? (
              <div className="row">
                <div className="col-12 ms-3">
                  <ConfigOptions />
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

