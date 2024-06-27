import { createSlice } from '@reduxjs/toolkit';

export const configSpecialCosts = createSlice({
    name: 'specialcosts',
    initialState: {
        //estado
        editCost: true,
        specialCost: [],
        activeCost: null,

    },
    reducers: {
        onSelectedSpecialCost: (state, { payload }) => {
            state.activeCost = payload
            // console.log(user.id, user.payload);
        },
        onLoadSpecialCosts: (state, { payload }) => {
            state.specialCost = payload;
            // state.loading = false; // Indicar que la carga ha finalizadoon Load Sum Total Extra Day Es
        },
        onUpdateSpecialcosts: (state, { payload }) => {
            state.specialCost = state.specialCost.map(cost => {
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
    onSelectedSpecialCost,
    onLoadSpecialCosts,
    onUpdateSpecialcosts,
} = configSpecialCosts.actions;

// Exporta el initialState
export default configSpecialCosts.reducer;