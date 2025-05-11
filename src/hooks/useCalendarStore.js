import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { serverApi } from "../api"
import { convertToDateEvents } from "../helpers"
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store"


export const useCalendarStore = () => {

    const EndpointRouteName = 'earthEvents'

    const dispatch = useDispatch()

    const { activeEvent, events } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    //OBTENER ID DE EVENTO SELECIONADO
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    //OBTENER VALORES DEL EVENTO SELECIONADO
    const setActiveEventInList = (calendarEvent) => {
        const eventActive = events.find(user => user.id == calendarEvent)
        dispatch(onSetActiveEvent(eventActive))
    }

    const starSavingEvent = async (calendarEvent) => {
        //TODO: llegar al backend

        //* todo bien
        // TODO: update event

        try {

            if (calendarEvent.id) {
                // Actualizando
                const { data } = await serverApi.put(`/${EndpointRouteName}/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                return;
            }
            // Creando
            const { data } = await serverApi.post(`/${EndpointRouteName}`, calendarEvent)
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))

        } catch (error) {

            console.log(error)
            Swal.fire('Error al guardar', error.response.data?.msg, 'error')

        }

    }

    const StartDeletingEvent = async () => {
        //TODO: llegar al backend

        try {
            const { data } = await serverApi.delete(`/${EndpointRouteName}/${activeEvent.id}`)
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')
        }

    }

    const startLoadingEvent = async () => {
        try {
            const { data } = await serverApi.get(`${EndpointRouteName}`)
            const events = convertToDateEvents(data.eventos)
            dispatch(onLoadEvents(events))
            // console.log(data)

        } catch (error) {
            console.log('error cargando eventos')
            console.log(error)
        }
    }

    return {
        //* propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Metodos
        setActiveEvent,
        setActiveEventInList,
        starSavingEvent,
        StartDeletingEvent,
        startLoadingEvent,

    }
}
