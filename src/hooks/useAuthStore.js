import { useDispatch, useSelector } from "react-redux"
import { serverApi } from "../api"
import { clearErrorMessage, onSelectedUser, onChecking, onLogin, onLogout, onLogoutCalendar, onLoadUsers, onDeleteUser, onUpdateUser } from '../store'


export const useAuthStore = () => {

    const EndpointRouteName = 'users'

    const { status, user, errorMessage, activeUser } = useSelector(state => state.auth)
    const usersValue = useSelector((state) => state.auth.users)

    const dispatch = useDispatch()

    // COMPROBRAR JWT
    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch(onLogout())

        try {

            const { data } = await serverApi.get(`${EndpointRouteName}/renew`)
            // console.log('Renew response:', data);
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid, role: data.role }))

        } catch (error) {

            localStorage.clear()
            dispatch(onLogout())

        }
    }

    // ACEDER A LA APLICACION WEB
    const startLogin = async ({ email, password }) => {

        dispatch(onChecking())

        try {
            const { data } = await serverApi.post(`/${EndpointRouteName}`, { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid, role: data.role }))

        } catch (error) {
            dispatch(onLogout('¡Los datos de acceso son incorrectos!'))

            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 100);
        }

    }

    // SALIR DE LA APLICACION WEB
    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogoutCalendar())
        dispatch(onLogout())
    }

    // OBTENER USUARIOS
    const startLoadingUsers = async () => {
        try {
            const { data } = await serverApi.get(`${EndpointRouteName}`);
            // console.log(data);
            const usuarios = data.usuarios;
            dispatch(onLoadUsers(usuarios)); // Pasar 'usuarios' como argumento
        } catch (error) {
            console.log('Error cargando usuarios');
            console.log(error);
        }
    };

    // OBTENER VALORES DEL USUARIO SELECIONADO
    const setActiveUser = (userSelected) => {
        const userActive = usersValue.find(user => user.id == userSelected)
        dispatch(onSelectedUser(userActive))
    }

    // REGISTRAR UN NUEVO USUARIO
    const startRegister = async ({ name, email, role, password }) => {

        try {
            await serverApi.post(`${EndpointRouteName}/new`, { name, email, role, password })
            // console.log(user.name);
            dispatch(onLogin({ name: user.name, uid: user.uid, role: user.role }))
            startLoadingUsers()

        } catch (error) {
            console.log('Error creando nuevo usuario');
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')

            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 100);
        }
    }

    //ELIMINAR USUARIO POR ID
    const deleteUser = async (userId) => {
        // dispatch(onDeleteUser(userId)); // Llama al action creator para eliminar un usuario por su ID
        try {
            await serverApi.delete(`/${EndpointRouteName}/${userId}`)
            dispatch(onDeleteUser(userId));
            startLoadingUsers()
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')
        }
    };

    //ACTUALIZAR USUARIO POR ID
    const updateUser = async (userId, updatedUserInfo) => {
        try {
            const { data } = await serverApi.put(`/${EndpointRouteName}/${userId}`, updatedUserInfo);
            dispatch(onUpdateUser({ userId, updatedUserInfo: data })); // Actualizar el usuario en el estado
            startLoadingUsers()
        } catch (error) {
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