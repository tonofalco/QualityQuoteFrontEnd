import { useEffect, useState } from "react"
import { useAuthStore, useCalendarStore } from "../../hooks"

import { format } from 'date-fns/esm';
import es from 'date-fns/locale/es';
import { BarChart } from "./BarChart";

export const General = () => {

    const { user, usersValue } = useAuthStore()
    const { events } = useCalendarStore()

    const [userRoleCount, setUserRoleCount] = useState(0)
    const [adminRoleCount, setAdminRoleCount] = useState(0)
    const [todayTravelsCount, setTodayTravelsCount] = useState(0)
    const [weekTravelCount, setWeekTravelCount] = useState(0)
    const [monthTravelCount, setMonthTravelCount] = useState(0)

    const dateFormat = (date) => format(date, "dd'-'MMM'-'yyyy", { locale: es });

    // OBTENER FECHA DE HACE 2 MESES
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    // CONTAR USUARIOS REGISTRADOS POR ROLES
    const agentsCountForRole = () => {
        let userCount = 0;
        let adminCount = 0;

        usersValue.forEach(user => {
            if (user.role === 'admin') {
                adminCount += 1;
            } else {
                userCount += 1;
            }
        });

        setUserRoleCount(userCount);
        setAdminRoleCount(adminCount);
    };

    //CONTAR VIAJES PROXIMOS POR RANGOS
    const TravelCountForRange = () => {
        let todayCount = 0
        let weekCount = 0
        let monthCount = 0

        const today = new Date();
        const weekFromNow = new Date(today);
        const monthFromNow = new Date(today);

        weekFromNow.setDate(today.getDate() + 7);
        monthFromNow.setMonth(today.getMonth() + 1);

        events.forEach(event => {
            const eventDate = new Date(event.start);

            // Contar eventos de hoy
            if (
                eventDate.getFullYear() === today.getFullYear() &&
                eventDate.getMonth() === today.getMonth() &&
                eventDate.getDate() === today.getDate()
            ) {
                todayCount += 1;
            }

            // Contar eventos dentro de una semana
            if (eventDate > today && eventDate <= weekFromNow) {
                weekCount += 1;
            }

            // Contar eventos dentro de un mes
            if (eventDate > today && eventDate <= monthFromNow) {
                monthCount += 1;
            }

            setTodayTravelsCount(todayCount)
            setWeekTravelCount(weekCount)
            setMonthTravelCount(monthCount)
        });


    }

    //ENVIAR ENCUESTA POR WHATSAPP
    const sendSurvey = (phoneNumber) => {

        const messageSurvey = `Gracias por elegir Viajes Quality para su viaje personalizado.
        Nos gustaría invitarle a responder una breve encuesta sobre su experiencia.
        Su opinión es muy importante para nosotros y nos ayudará a mejorar nuestro servicio en futuras ocasiones.
        La encuesta no le tomará más de dos minutos. Puede acceder a ella a través del siguiente enlace: _`;


        const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(messageSurvey)}`;
        window.open(url, '_blank');
    };

    useEffect(() => { agentsCountForRole(), TravelCountForRange() }, [usersValue]);


    return (
        <>
            <div className="container">

                <div className="row mt-3">
                    {/* BIENVENIDA */}
                    <div className="col-12 col-md-3 mb-3">
                        <div className="card bg-white shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="text-center"><i>Bienvenido </i></h5>
                                <span><i><b>Agente:</b> {user.name}</i></span>
                                <span><i><b>Rol:</b> {user.role}</i></span>
                            </div>
                        </div>
                    </div>
                    {/* VIAJES PROXIMOS */}
                    <div className="col-12 col-md-5 mb-3">
                        <div className="card bg-white shadow-sm">
                            <div className="card-body text-center">
                                <h5>Proximos viajes programados</h5>
                                <div className="row square border-top mt-2">
                                    <div className="col-4 d-flex flex-column square border-end">
                                        <span>Hoy</span>
                                        <span>{todayTravelsCount}</span>
                                    </div>
                                    <div className="col-4 d-flex flex-column square border-end">
                                        <span>7 dias</span>
                                        <span>{weekTravelCount}</span>
                                    </div>
                                    <div className="col-4 d-flex flex-column">
                                        <span>30 dias</span>
                                        <span>{monthTravelCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* AGENTES REGISTRADOS */}
                    <div className="col-12 col-md-4 mb-3">
                        <div className="card bg-white shadow-sm">
                            <div className="card-body text-center">
                                <h5>Agentes registrados</h5>
                                <div className="row square border-top mt-2">
                                    <div className="col-6 d-flex flex-column square border-end">
                                        <span>Usuario</span>
                                        <span>{userRoleCount}</span>
                                    </div>
                                    <div className="col-6 d-flex flex-column square border-end">
                                        <span>Administrador</span>
                                        <span>{adminRoleCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* GRAFICO */}
                    <div className="col-12 col-md-6 mb-3 mb-md-0 ">
                        <div className="card bg-white shadow-sm">
                            <div className="card-body d-flex flex-column text-center">
                                <h5>Reservas registradas</h5>
                                <span></span>
                                <div className="row square border-top mt-2">
                                    <BarChart />

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* VIAJES PASADOS DEL USUARIO */}
                    <div className="col-12 col-md-6 mb-3 mb-md-0 ">
                        <div className="card bg-white shadow-sm">
                            <div className="card-body d-flex flex-column text-center">
                                <h5>Mis viajes realizados</h5>
                                <div className="row square border-top mt-2">
                                    <div className="table-wrapper">
                                        <table className="table table-striped">
                                            <thead className='table-dark'>
                                                <tr>
                                                    <th>Fechas</th>
                                                    <th>Destino</th>
                                                    <th>Cliente</th>
                                                    <th></th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {
                                                    events.map((event) => {
                                                        if (event.userId == user.uid && event.start >= twoMonthsAgo) {
                                                            return (
                                                                <tr key={event.id} className='text-start'>
                                                                    <td className="col-3">{dateFormat(event.start)} <br /> {dateFormat(event.start)}</td>
                                                                    <td>{event.destination}</td>
                                                                    <td>{event.nameClient}</td>
                                                                    <td>
                                                                        <button className="btn btn-success btn-sm me-3" title="Enviar encuesta" onClick={() => { sendSurvey(event.phone) }}>
                                                                            <i className="fa-solid fa-clipboard-list"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
