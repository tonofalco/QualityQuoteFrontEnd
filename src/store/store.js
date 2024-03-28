import { configureStore,  } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice, authSlice, navBarSlice, configSlice, configExtraDaySlice } from "./";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
        navBar: navBarSlice.reducer,
        config: configSlice.reducer,
        configExtraDay: configExtraDaySlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})