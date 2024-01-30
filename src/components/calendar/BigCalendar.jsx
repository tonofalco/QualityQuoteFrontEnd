import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew } from '../'

import { localizer, getMessagesES } from '../../helpers'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'
import 'react-big-calendar/lib/css/react-big-calendar.css';


export const BigCalendar = () => {

    const { user } = useAuthStore()
    const { openViewModal } = useUiStore()
    const { events, setActiveEvent, startLoadingEvent } = useCalendarStore()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const eventStyleGetter = (event, start, end, isSelected) => {

        const isMyEvent = user && event.Usuario && (user.name === event.Usuario.name || user.name === event.user?.name);
        


        const style = {
            backgroundColor: isMyEvent ? '#347cf7' : '#465670',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        // console.log({ doubleClick: event })
        // openDateModal()
        openViewModal()
        
    }

    const onSelect = (event) => {
        // console.log({ click: event })
        // console.log(user);
        // console.log(event);
        setActiveEvent(event)
    }

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event)
        setLastView(event)
    }

    useEffect(() => {
        startLoadingEvent()
    }, [])


    return (
        <>
            <Calendar
                culture='es'
                // views={views}
                views={{ month: true, week: true, agenda: true }}
                // components={{ month: renderView, week: renderView, agenda: renderView, crud: renderView }}
                step={90}
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal />
            <FabAddNew />
            {/* <FabDelete /> */}
        </>
    )
}

