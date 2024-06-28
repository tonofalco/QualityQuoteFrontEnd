import { useState, useEffect } from "react";
import { NavBar, SideBar, Map, OverlayWhole } from "../components";
import { useActiveBar, useConfigExtraDayStore, useConfigKmsTableStore, useConfigSpecialCostsStore } from "../hooks";
import '../styles/overlayShadow.css';


export const MapsPage = () => {
  const { stateNavBar } = useActiveBar();

  const { startLoadingCostsExtraDay } = useConfigExtraDayStore()
  const { startLoadingFsCosts, startLoadingEsCosts } = useConfigKmsTableStore();
  const {startLoadingSpecialCosts} = useConfigSpecialCostsStore()
  

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      if (!isLoading) {
          const fetchData = async () => {
              setIsLoading(true);
              await Promise.all([
                  startLoadingCostsExtraDay(),
                  startLoadingFsCosts(),
                  startLoadingEsCosts(),
                  startLoadingSpecialCosts(),
              ]);
          };
          fetchData();
      }
  }, []);

  return (
    <>
      <div className="row row gx-0">

        <div className="sidebar_column d-none d-md-block">
          <SideBar />
        </div>


        <div className="content_column">
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
