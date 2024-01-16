import { useState, useEffect } from "react"
import { NavBar, SideBar, ExtraDay, KmsTable, OverlayWhole } from "../components"
import { useActiveBar, useConfigStore } from "../hooks"



export const ConfigCostsPage = () => {

    const { stateNavBar } = useActiveBar()
    const { startLoadingCosts, editDay, editKms, handleToggleDayEstado, handleToggleKmsState, costsValue, handleUpdateCosts, } = useConfigStore();
    const { loading } = useConfigStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const fetchData = async () => {
                setIsLoading(true);
                await startLoadingCosts();
            };

            fetchData();
        }
    }, [isLoading, startLoadingCosts]);

    if (loading || costsValue == {}) {
        return <div>Cargando aplicacion...</div>
    }

    return (
        <>

            <div className="row gx-0">

                <div className=" col-md-2 d-none d-md-block">
                    <SideBar />
                </div>

                <div className='col-md-10 col-12 '>
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
                                    handleUpdateCosts={handleUpdateCosts} />
                                <hr />
                                <KmsTable
                                    editKms={editKms}
                                    costsValue={costsValue}
                                    handleToggleKmsState={handleToggleKmsState}
                                    handleUpdateCosts={handleUpdateCosts} />
                            </div>
                        ) : (
                            <div className="overlay">
                                <OverlayWhole />
                            </div>
                        )}
                    {/* {costsValue ? (
                        <div className={`ms-3 cuerpo ${stateNavBar == true ? 'overlay' : ''}`}>
                            <h1 className="mt-2">CONFIGURACION</h1>
                            <hr />
                            <ExtraDay
                                editDay={editDay}
                                handleToggleDayEstado={handleToggleDayEstado}
                                costsValue={costsValue}
                                handleUpdateCosts={handleUpdateCosts} />
                            <hr />
                            <KmsTable
                                editKms={editKms}
                                costsValue={costsValue}
                                handleToggleKmsState={handleToggleKmsState}
                                handleUpdateCosts={handleUpdateCosts} />
                        </div>
                    ) : (

                        <div>
                            <hr />
                            <h5>conectando con BD...</h5>
                            <hr />
                        </div>
                    )} */}
                </div>

            </div>

        </>
    )
}

