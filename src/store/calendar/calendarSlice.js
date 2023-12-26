import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';


// const tempEvent = {
//     id: new Date().getTime(),
//     title: 'Viaje a cuba',
//     notes: 'Hay que comprar vuelo',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         id: '123',
//         name: 'Antonio'
//     }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            // tempEvent,
        ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
        onAddNewEvent: (state, { payload }) => {
            const newEvent = { ...payload }; // Crear una nueva copia del evento
            state.events.push(newEvent);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            // console.log(state.events);
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload
                }
                // console.log(event.id, payload.id);
                return event
            })
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent.id)
                state.activeEvent = null
            }
        },
        onLoadEvents: (state, { payload }) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id)
                if (!exists) {
                    state.events.push(event)
                }
            });
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true
            state.events = []
            state.activeEvent = null
        }
    }
});


export const { onSetActiveEvent,
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onUpdateEvent,
} = calendarSlice.actions;