import { createSlice } from '@reduxjs/toolkit';

export const configExtraDaySlice = createSlice({
    name: 'extraDayCosts',
    initialState: {
        //estado
        editDay: true,
        currentCost: {},
        allCosts: [],
        loading: false, // Estado para indicar si los datos se están cargando

    },
    reducers: {
        onLoadCostsExtraDay: (state, { payload }) => {
            state.allCosts = payload; // Actualizar la lista de usuarios en el estado
        },
    },
});


export const {
    onLoadCostsExtraDay,
} = configExtraDaySlice.actions;

// Exporta el initialState
export default configExtraDaySlice.reducer;