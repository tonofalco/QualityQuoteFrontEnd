import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
    name: 'navBar',
    initialState: {
        //estado
        editDay: true,
        editKms: true,

        costos: null, // Inicializa como null 
        costosFinSemana: null,

        loading: false, // Estado para indicar si los datos se están cargando

    },
    reducers: {
        onSetActiveUser: (state, { payload }) => {
            state.activeEvent = payload
        },
        onEditDayCosts: (state) => {
            state.editDay = !state.editDay; // Cambia el valor de "edit" al opuesto
        },
        onEditKms: (state) => {
            state.editKms = !state.editKms;
        },

        onUpdateCostValue: (state, action) => {
            const { key, newValue } = action.payload; // Esperamos un objeto con "key" y "newValue"
            state.costos[key] = newValue; // Modificar el valor en el objeto "costos"
        },
        onLoadCostsStart: (state) => {
            state.loading = true; // Indicar que se está cargando la información
        },
        onLoadCostsSuccess: (state, { payload }) => {
            state.costos = payload;
            state.loading = false; // Indicar que la carga ha finalizado
        },
        onLoadCostsEsSuccess: (state, { payload }) => {
            state.costosFinSemana = payload;
            state.loading = false; // Indicar que la carga ha finalizado
        },
        onLoadCostsFailure: (state) => {
            state.loading = false; // Indicar que ha ocurrido un error al cargar los datos
        },
    },
});



// Exporta el reducer
export const {
    onEditDayCosts,
    onEditKms,
    onUpdateCostValue,

    updateCostsSuccess,
    updateCostsError,

    onLoadCostsStart,
    onLoadCostsSuccess,
    onLoadCostsEsSuccess,
    onLoadCostsFailure,

    onSetActiveUser,
} = configSlice.actions;

// Exporta el initialState
export default configSlice.reducer;