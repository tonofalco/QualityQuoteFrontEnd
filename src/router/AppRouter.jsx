import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthStore } from "../hooks"
import { Blocks } from 'react-loader-spinner';

import { HomePage, CalendarPage, MapsPage, ConfigPage, ConfigCostsPage, ConfigUsersPage, LoginPage, ConfigKmsTablePage, ConfigClientsPage, ConfigSpecialCosts } from '../pages/'


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
                        <Blocks
                            height="200"
                            width="200"
                            color="#4fa94d"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            visible={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <h5>Cargando sistema...</h5>
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
                                <Route path="/config/costsExtraDay" element={<ConfigCostsPage />} />
                                <Route path="/config/costTablekms" element={<ConfigKmsTablePage />} />
                                <Route path="/config/costSpecial" element={<ConfigSpecialCosts />} />
                                <Route path="/config/users" element={<ConfigUsersPage />} />
                                <Route path="/config/clients" element={<ConfigClientsPage />} />

                                <Route path="/*" element={<Navigate to='/' />} />
                            </>
                    )
            }
        </Routes>
    )
}
