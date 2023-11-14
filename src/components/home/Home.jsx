import { useAuthStore } from "../../hooks"


export const Home = () => {

    const { user } = useAuthStore()

    return (
        <>
            <div className='content'>
                <h1>Dashboard</h1>
                <hr />
                <p>Bienvenido {user.name} </p>
            </div>
        </>
    )
}
