import { createSlice } from '@reduxjs/toolkit';

export const configExtraDaySlice = createSlice({
    name: 'configExtraDay',
    initialState: {
        //estado
        editDay: true,
        costsExtraDay: [],
        totalEs: 0,
        totalFs: 0,
        activeCost: null,

    },
    reducers: {
        onSelectedCost: (state, { payload }) => {
            state.activeCost = payload
            // console.log(user.id, user.payload);
        },
        onLoadCostsExtraDay: (state, { payload }) => {
            state.costsExtraDay = payload;
            // state.loading = false; // Indicar que la carga ha finalizadoon Load Sum Total Extra Day Es
        },
        onLoadTotalSumExtraDayEs: (state, { payload }) => {
            state.totalEs = payload;
        },
        onLoadTotalSumExtraDayFs: (state, { payload }) => {
            state.totalFs = payload;
        },
        onDeleteCostExtraDay: (state, { payload }) => {
            state.costsExtraDay = state.costsExtraDay.filter(user => user.id !== payload); // Elimina el usuario por su ID
        },
        onUpdateCostExtraDay: (state, { payload }) => {
            state.costsExtraDay = state.costsExtraDay.map(cost => {
                if (cost.id === payload.id) {
                    return payload
                }
                // console.log(cost.id, payload.id);
                return cost
            })
        },
    },
});


export const {
    onSelectedCost,
    onLoadTotalSumExtraDayEs,
    onLoadTotalSumExtraDayFs,
    onLoadCostsExtraDay,
    onDeleteCostExtraDay,
    onUpdateCostExtraDay,
} = configExtraDaySlice.actions;

// Exporta el initialState
export default configExtraDaySlice.reducer;