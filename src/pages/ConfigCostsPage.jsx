import { useState, useEffect } from "react"
import { NavBar, SideBar, ExtraDay, OverlayWhole } from "../components"
import { useActiveBar, useConfigExtraDayStore } from "../hooks"



export const ConfigCostsPage = () => {

    const { stateNavBar } = useActiveBar()
    const { startLoadingCostsExtraDay, costs_extraDay } = useConfigExtraDayStore()

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const fetchData = async () => {
                setIsLoading(true);
                await Promise.all([
                    startLoadingCostsExtraDay()
                ]);
            };
            fetchData();
        }
    }, []);

    if (costs_extraDay == null) { <div>Cargando aplicacion...</div> }

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
                            <div className="container">
                                <h6 className="mt-2 text-secondary">COSTOS POR DIA EXTRA</h6>
                                <hr />
                                <ExtraDay />
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