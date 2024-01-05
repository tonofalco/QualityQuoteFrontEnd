import { useDispatch, useSelector } from "react-redux"
import { serverApi } from "../api"
import { clearErrorMessage, onSelectedUser, onChecking, onLogin, onLogout, onLogoutCalendar, onLoadUsers, onDeleteUser, onUpdateUser } from '../store'


export const useAuthStore = () => {

    const { status, user, errorMessage, activeUser } = useSelector(state => state.auth)
    const usersValue = useSelector((state) => state.auth.users)

    const dispatch = useDispatch()

    const setActiveUser = (userSelected) => {
        const userActive = usersValue.find(user => user.id == userSelected)
        dispatch(onSelectedUser(userActive))
    }

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking())

        try {

            const { data } = await serverApi.post('/auth', { email, password })
            // console.log({ resp })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))


        } catch (error) {
            dispatch(onLogout('¡Los datos de acceso son incorrectos!'))

            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 100);
        }

    }

    const startRegister = async ({ name, email, role, password }) => {

        dispatch(onChecking())

        try {

            const { data } = await serverApi.post('/auth/new', { name, email, role, password })
            // console.log(user.name);
            dispatch(onLogin({ name: user.name, uid: user.uid }))

        } catch (error) {

            dispatch(onLogout(error.response.data?.msg || '--'))

            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 100);

        }

    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch(onLogout())

        try {

            const { data } = await serverApi.get('auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {

            localStorage.clear()
            dispatch(onLogout())

        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogoutCalendar())
        dispatch(onLogout())
    }

    const startLoadingUsers = async () => {
        try {
            const { data } = await serverApi.get('/auth');
            const usuarios = data.usuarios;
            dispatch(onLoadUsers(usuarios)); // Pasar 'usuarios' como argumento
        } catch (error) {
            console.log('Error cargando usuarios');
            console.log(error);
        }
    };

    const deleteUser = async (userId) => {
        // dispatch(onDeleteUser(userId)); // Llama al action creator para eliminar un usuario por su ID
        try {
            const { data } = await serverApi.delete(`/auth/${userId}`)
            dispatch(onDeleteUser(userId));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')
        }
    };

    const updateUser = async (userId, updatedUserInfo) => {
        try {
            const { data } = await serverApi.put(`/auth/${userId}`, updatedUserInfo);
            // Suponiendo que la API devuelve la información actualizada del usuario
            dispatch(onUpdateUser({ userId, updatedUserInfo: data })); // Actualizar el usuario en el estado
        } catch (error) {
            // console.log(userId, data);
            console.log(error);
            Swal.fire('Error al actualizar', error.response.data?.msg, 'error');
        }
    };

    return {
        //* propiedades
        errorMessage,
        status,
        user,
        usersValue,
        activeUser,

        //* Metodos
        setActiveUser,
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
        startLoadingUsers,
        deleteUser,
        updateUser,
    }

}