import { NavBar, SideBar, AdminUsers, OverlayWhole } from "../components"
import { useActiveBar } from "../hooks"

export const ConfigUsersPage = () => {
    const { stateNavBar } = useActiveBar()

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
                                <AdminUsers />
                            </div>
                        ) : (
                            <div className="overlay">
                                <OverlayWhole />
                            </div>
                        )}

                    {/* <div className={`ms-3 cuerpo ${stateNavBar == true ? 'overlay' : ''}`}>
                        <h1 className="mt-2">CONFIGURACION</h1>
                        <hr />
                        <AdminUsers />
                    </div> */}

                </div>

            </div>
        </>
    )
}
