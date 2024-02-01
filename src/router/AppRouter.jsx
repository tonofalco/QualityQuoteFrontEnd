import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useAuthStore } from "../hooks"
import ClipLoader from "react-spinners/ClipLoader";

// import { LoginPage } from "../auth"
// import { CalendarPage, ConfigPage, HomePage, MapsPage } from "../Modules/";

import { HomePage, CalendarPage, MapsPage, ConfigPage, ConfigCostsPage, ConfigUsersPage, LoginPage } from '../pages/'

HomePage


export const AppRouter = () => {


    const { status, checkAuthToken } = useAuthStore()
    const location = useLocation()

    // const authStatus = 'not-authenticadted' // 'authenticated' 'not-authenticadted'

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

    // Redirige a la ruta principal al actualizar la página desde cualquier ruta
    useEffect(() => {
        if (status === 'authenticated' && location.pathname !== '/') {
            window.location.href = '/';
        }
    }, [status, location.pathname]);


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
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/calendar" element={<CalendarPage />} />
                            <Route path="/map" element={<MapsPage />} />
                            <Route path="/config" element={<ConfigPage />} />
                            <Route path="/config/costs" element={<ConfigCostsPage />} />
                            <Route path="/config/users" element={<ConfigUsersPage />} />
                            <Route path="/*" element={<Navigate to='/' />} />
                        </>
                    )
            }
        </Routes>
    )
}
