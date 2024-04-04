import { createSlice } from '@reduxjs/toolkit';

export const configKmsTableSlice = createSlice({
    name: 'configKmsTable',
    initialState: {
        //estado
        editKms: true,

        costos: null, // Inicializa como null 
        costosFinSemana: null,


    },
    reducers: {
        onEditKms: (state) => {
            state.editKms = !state.editKms;
        },
        onLoadCostsSuccess: (state, { payload }) => {
            state.costos = payload;
            // state.loading = false; // Indicar que la carga ha finalizado
        },
        onLoadCostsEsSuccess: (state, { payload }) => {
            state.costosFinSemana = payload;
            // state.loading = false; // Indicar que la carga ha finalizado
        },

        onUpdateCostValue: (state, action) => {
            const { key, newValue } = action.payload; // Esperamos un objeto con "key" y "newValue"
            state.costos[key] = newValue; // Modificar el valor en el objeto "costos"
        },
    },
});


// Exporta el reducer
export const {
    onEditKms,
    onUpdateCostValue,
    onLoadCostsSuccess,
    onLoadCostsEsSuccess,
} = configKmsTableSlice.actions;

// Exporta el initialState
export default configKmsTableSlice.reducer;