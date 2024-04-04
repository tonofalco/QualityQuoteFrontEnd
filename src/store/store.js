import { configureStore,  } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice, authSlice, navBarSlice, configKmsTableSlice, configExtraDaySlice } from "./";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
        navBar: navBarSlice.reducer,
        configKmsTable: configKmsTableSlice.reducer,
        configExtraDay: configExtraDaySlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})