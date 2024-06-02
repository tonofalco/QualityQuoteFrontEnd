import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthStore } from "../hooks"
import ClipLoader from "react-spinners/ClipLoader";

import { HomePage, CalendarPage, MapsPage, ConfigPage, ConfigCostsPage, ConfigUsersPage, LoginPage, ConfigKmsTablePage, ConfigClientsPage } from '../pages/'


import '../styles/pages.css'

export const AppRouter = () => {


    const { status, checkAuthToken, user } = useAuthStore()
    const { role } = user




    useEffect(() => {
        checkAuthToken()
    }, [])


    if (status === 'checking') {

        return (
            // <h3>Cargando...</h3>
            <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
                <div className="row">
                    <div className="col-12 text-center">
                        <ClipLoader
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            color="blue"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <h5>Cargando...</h5>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Routes>

            window.addEventListener('beforeunload')

            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to='/auth/login' />} />
                        </>
                    )
                    : (
                        (role == 'user')
                            ?
                            <>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/calendar" element={<CalendarPage />} />
                                <Route path="/map" element={<MapsPage />} />
                                <Route path="/*" element={<Navigate to='/' />} />
                            </>
                            :
                            <>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/calendar" element={<CalendarPage />} />
                                <Route path="/map" element={<MapsPage />} />
                                <Route path="/config" element={<ConfigPage />} />
                                <Route path="/config/costs" element={<ConfigCostsPage />} />
                                <Route path="/config/tablekms" element={<ConfigKmsTablePage />} />
                                <Route path="/config/users" element={<ConfigUsersPage />} />
                                <Route path="/config/clients" element={<ConfigClientsPage />} />

                                <Route path="/*" element={<Navigate to='/' />} />
                            </>
                    )
            }
        </Routes>
    )
}
