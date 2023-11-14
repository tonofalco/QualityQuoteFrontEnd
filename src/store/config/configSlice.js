import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
    name: 'navBar',
    initialState: {
        //estado
        editDay: true,
        editKms: true,

        costos: {}

    },
    reducers: {
        onEditDayCosts: (state) => {
            state.editDay = !state.editDay; // Cambia el valor de "edit" al opuesto
        },
        onEditKms: (state) => {
            state.editKms = !state.editKms;
        },

        onLoadCosts: (state, { payload }) => {
            state.costos = payload; // Actualizar la lista de usuarios en el estado
        },
        onUpdateCostValue: (state, action) => {
            const { key, newValue } = action.payload; // Esperamos un objeto con "key" y "newValue"
            state.costos[key] = newValue; // Modificar el valor en el objeto "costos"
        },
    },
});




// Exporta el reducer
export const {
    onEditDayCosts,
    onEditKms,
    onUpdateCostValue,

    onLoadCosts,
    updateCostsSuccess,
    updateCostsError
} = configSlice.actions;

// Exporta el initialState
export default configSlice.reducer;