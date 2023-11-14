import { createSlice } from '@reduxjs/toolkit';

export const navBarSlice = createSlice({
    name: 'navBar',
    initialState: {
        isnavBarOpen: false,
        value: 0
    },
    reducers: {
        onOpenNavBar: (state) => {
            state.isnavBarOpen = true
        },

        onCloseNavBar: (state) => {
            state.isnavBarOpen = false
        },
        selectLink: (state, action) => {
            state.value = action.payload;
        }

    }
});


export const { onOpenNavBar, onCloseNavBar, selectLink } = navBarSlice.actions;