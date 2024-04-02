import { useState, useEffect } from "react"
import { NavBar, SideBar, ExtraDay, KmsTable, OverlayWhole } from "../components"
import { useActiveBar, useConfigExtraDayStore, useConfigStore } from "../hooks"



export const ConfigCostsPage = () => {

    const { stateNavBar } = useActiveBar()
    const { startLoadingCosts, startLoadingEsCosts, editKms, handleToggleKmsState, costsValue, costsValueWeekend, handleUpdateCosts, handleUpdateEsCosts } = useConfigStore();
    const { startLoadingCostsExtraDay, costs_extraDay } = useConfigExtraDayStore()

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const fetchData = async () => {
                setIsLoading(true);
                await Promise.all([
                    startLoadingCosts(),
                    startLoadingEsCosts(),
                    startLoadingCostsExtraDay()
                ]);
            };
            fetchData();
        }
    }, []);

    if (costs_extraDay == null) {
        return <div>Cargando aplicacion...</div>
    }

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
                                <h6 className="mt-2 text-secondary">COSTOS OPERATIVOS</h6>
                                <hr />

                                <ExtraDay />
                                <hr />

                                <KmsTable
                                    editKms={editKms}
                                    costsValue={costsValue}
                                    costsValueWeekend={costsValueWeekend}
                                    handleToggleKmsState={handleToggleKmsState}
                                    handleUpdateCosts={handleUpdateCosts}
                                    handleUpdateEsCosts={handleUpdateEsCosts} />
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