import { useAuthStore } from "../../hooks"


export const General = () => {
    
    const { user } = useAuthStore()


    return (
        <>
            <p><i>Bienvenido {user.name} - Rol {user.role}</i></p>
            <p>widgets en desarrollo</p>
            <p>...</p>
        </>
    )
}
