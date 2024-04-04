import { useState, useEffect } from "react"
import { NavBar, SideBar, KmsTable, OverlayWhole } from "../components"
import { useActiveBar, useConfigStore } from "../hooks"

export const ConfigKmsTablePage = () => {


    const { stateNavBar } = useActiveBar()
    const { startLoadingFsCosts, startLoadingEsCosts, costsValue, costsValueWeekend } = useConfigStore();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const fetchData = async () => {
                setIsLoading(true);
                await Promise.all([
                    startLoadingFsCosts(),
                    startLoadingEsCosts(),
                ]);
            };
            fetchData();
        }
    }, []);

    if (costsValue == null) { <div>Cargando aplicacion...</div> }


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
                            <h6 className="mt-2 text-secondary">COSTOS POR KMS</h6>
                            <hr />

                            <KmsTable
                                costsValue={costsValue}
                                costsValueWeekend={costsValueWeekend}
                            />
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
