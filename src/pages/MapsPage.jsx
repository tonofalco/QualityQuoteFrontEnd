
import { NavBar, SideBar, Map, OverlayWhole } from "../components";
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

          {!stateNavBar
            ? (
              <div className="row">
                <div className="col-12">
                  <Map />
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
  );
};
