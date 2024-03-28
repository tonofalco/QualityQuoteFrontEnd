import { useState, useEffect } from "react"
import { NavBar, SideBar, ExtraDay, KmsTable, OverlayWhole } from "../components"
import { useActiveBar, useConfigStore } from "../hooks"



export const ConfigCostsPage = () => {

    const { stateNavBar } = useActiveBar()
    const { startLoadingCosts, startLoadingEsCosts, editDay, editKms, handleToggleDayEstado, handleToggleKmsState, costsValue, costsValueWeekend, handleUpdateCosts, handleUpdateEsCosts, } = useConfigStore();
    const { loading } = useConfigStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const fetchData = async () => {
                setIsLoading(true);
                await Promise.all([
                    startLoadingCosts(),
                    startLoadingEsCosts()
                ]);
            };
            fetchData();
        }
    }, []);

    if (loading || costsValue == null || costsValueWeekend == null) {
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
                            <div>
                                <h1 className="mt-2">CONFIGURACION</h1>
                                <hr />
                                <ExtraDay
                                    editDay={editDay}
                                    handleToggleDayEstado={handleToggleDayEstado}
                                    costsValue={costsValue}
                                    handleUpdateCosts={handleUpdateCosts}
                                />
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

