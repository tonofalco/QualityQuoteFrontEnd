import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthStore } from "../hooks"

// import { LoginPage } from "../auth"
// import { CalendarPage, ConfigPage, HomePage, MapsPage } from "../Modules/";

import {HomePage, CalendarPage, MapsPage, ConfigPage, ConfigCostsPage, ConfigUsersPage, LoginPage } from '../pages/'

HomePage


export const AppRouter = () => {


    const { status, checkAuthToken } = useAuthStore()

    // const authStatus = 'not-authenticadted' // 'authenticated' 'not-authenticadted'

    useEffect(() => {
        checkAuthToken()
    }, [])


    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
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
