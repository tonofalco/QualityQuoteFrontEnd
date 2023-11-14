import { NavBar, SideBar, ExtraDay, KmsTable, AdminUsers, ConfigOptions } from "../components"
import { useActiveBar } from "../hooks"

export const ConfigUsersPage = () => {
    const { stateNavBar } = useActiveBar()

    return (
        <>

            <div className="row gx-0">

                <div className=" col-md-2 d-none d-md-block">
                    <SideBar />
                </div>

                <div className='col-md-10 col-12 '>
                    <NavBar />
                    <div className={`ms-3 cuerpo ${stateNavBar == true ? 'overlay' : ''}`}>
                        <h1 className="mt-2">CONFIGURACION</h1>
                        <hr />
                        <AdminUsers />
                    </div>

                </div>

            </div>
        </>
    )
}
