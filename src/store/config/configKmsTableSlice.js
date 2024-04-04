import { createSlice } from '@reduxjs/toolkit';

export const configKmsTableSlice = createSlice({
    name: 'configKmsTable',
    initialState: {
        //estado
        editKms: true,
        totalKmsEs: 0,
        totalKmsFs: 0,
        costos: null, // Inicializa como null 
        costosFinSemana: null,

    },
    reducers: {
        onEditKms: (state) => {
            state.editKms = !state.editKms;
        },
        onLoadCostsSuccess: (state, { payload }) => {
            state.costosFinSemana = payload;
            // state.loading = false; // Indicar que la carga ha finalizado
        },
        onLoadCostsEsSuccess: (state, { payload }) => {
            state.costos = payload;
            // state.loading = false; // Indicar que la carga ha finalizado
        },
        onLoadTotalSumKmsTableEs: (state, { payload }) => {
            state.totalKmsEs = payload;
        },
        onLoadTotalSumKmsTableFs: (state, { payload }) => {
            state.totalKmsFs = payload;
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
    onLoadCostsSuccess,
    onLoadCostsEsSuccess,
    onLoadTotalSumKmsTableEs,
    onLoadTotalSumKmsTableFs,
    onUpdateCostValue,
} = configKmsTableSlice.actions;

// Exporta el initialState
export default configKmsTableSlice.reducer;