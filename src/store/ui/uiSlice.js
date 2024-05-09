import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
        isModalViewOpen: false,

        customStyles: {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',

            },
        },
    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true
        },

        onCloseDateModal: (state) => {
            state.isDateModalOpen = false
        },

        onOpenViewModal: (state) => {
            state.isModalViewOpen = true
        },

        onCloseViewModal: (state) => {
            state.isModalViewOpen = false
        },
    }
});


export const { onOpenDateModal, onCloseDateModal, onOpenViewModal, onCloseViewModal } = uiSlice.actions;