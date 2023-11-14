
import { NavBar, SideBar, Map } from "../components";
import { useActiveBar } from "../hooks";
import '../styles/overlayShadow.css';

export const MapsPage = () => {
  const { stateNavBar } = useActiveBar();

  return (
    <>
      <div className="row row gx-0">
        <div className="col-md-2 d-none d-md-block">
          <SideBar />
        </div>

        <div className='col-md-10 col-12'>
          <NavBar />

          <div className={`cuerpo ${stateNavBar ? 'overlay' : ''}`}>
            <div className="row">
              <div className="col-12">
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
