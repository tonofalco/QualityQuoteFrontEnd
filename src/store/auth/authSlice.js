import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticated', 'not-authenticated'
        user: {},
        errorMessage: undefined,
        users: [], // Agregado: estado para almacenar los usuarios
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        onLoadUsers: (state, { payload }) => {
            state.users = payload; // Actualizar la lista de usuarios en el estado
        },
        onDeleteUser: (state, { payload }) => {
            state.users = state.users.filter(user => user.id !== payload); // Elimina el usuario por su ID
        },
        onUpdateUser: (state, { payload }) => {
            const { userId, updatedUserInfo } = payload;
            // Buscar el usuario por su ID y actualizar la información
            state.users = state.users.map(user =>
                user.id === userId ? { ...user, ...updatedUserInfo } : user
            );
        },
    },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage, onLoadUsers, onDeleteUser, onUpdateUser } = authSlice.actions;

// Exporta el initialState
export default authSlice.reducer;
