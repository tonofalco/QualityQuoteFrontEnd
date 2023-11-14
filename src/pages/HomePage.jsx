import { Home, NavBar, SideBar } from "../components/"
import { useActiveBar } from "../hooks"


import second from '../styles/overlayShadow.css'

Home
export const HomePage = () => {
  const { stateNavBar } = useActiveBar()

  return (
    <>

      <div className="row gx-0">

        <div className="col-md-2 d-none d-md-block">
          <SideBar />
        </div>

        <div className='col-md-10 col-12'>
          <NavBar />
          <div className={` cuerpo ${stateNavBar == true ? 'overlay' : ''}`}>

            <Home />
          </div>
        </div>

      </div>
    </>
  )
}