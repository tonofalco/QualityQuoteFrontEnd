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
                            <div className="container">
                                <h6 className="mt-2 text-secondary">USUARIOS Y ROLES</h6>
                            <hr />

                                <AdminUsers />
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
