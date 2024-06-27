import { useState, useEffect } from "react"
import { NavBar, SideBar, SpecialCosts, OverlayWhole } from "../components"
import { useActiveBar, useConfigSpecialCostsStore } from "../hooks"

export const ConfigSpecialCosts = () => {

    
    const { stateNavBar } = useActiveBar()
    const {startLoadingSpecialCosts, special_costs} = useConfigSpecialCostsStore()

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const fetchData = async () => {
                setIsLoading(true);
                await Promise.all([
                    startLoadingSpecialCosts()
                ]);
            };
            fetchData();
        }
    }, []);

    if (special_costs == null) { <div>Cargando aplicacion...</div> }



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
                                <h6 className="mt-2 text-secondary">COSTOS ESPECIALES</h6>
                                <hr />
                                <SpecialCosts 
                                special_costs = {special_costs}/>
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
