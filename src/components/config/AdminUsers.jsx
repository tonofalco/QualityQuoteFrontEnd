import { useEffect, useState } from "react"
import { useAuthStore } from "../../hooks"
import Swal from 'sweetalert2';
import { CreateUserModal } from "./CreateUserModal";
import { UpdateUserModal } from "./UpdateUserModal";


export const AdminUsers = () => {

    const { usersValue, startLoadingUsers, errorMessage, deleteUser, setActiveUser } = useAuthStore();

    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const toggleModalCreate = () => setShow(prevShow => !prevShow);
    const toggleModalUpdate = () => setShow2(prevShow => !prevShow);

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticacion', errorMessage, 'error');
        } else if (!isLoading) {
            const fetchData = async () => {
                setIsLoading(true);
                await startLoadingUsers();
            };

            fetchData();
        }
    }, [isLoading, startLoadingUsers]);

    // Función para manejar la selección de usuario po id
    const onSelect = async (userId) => setActiveUser(userId);


    const handleDeleteUser = (userId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar usuario',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(userId);
                Swal.fire(
                    '¡Eliminado!',
                    'El usuario ha sido eliminado.',
                    'success'
                );
            }
        });
    };


    return (
        <>
            {/* TABLA DE USUARIOS */}
            <div className="container">
                <div className="d-flex mb-3">
                    <h3 className="me-3">Lista de usuarios</h3>
                    <button type="button" className="btn btn-success" onClick={toggleModalCreate}>
                        <i className="fa-solid fa-user-plus"></i>
                    </button>
                </div>
                <div className="row">
                    <div className="col-12 mt-3">
                        <table className="table table-auto text-center">
                            <thead>
                                <tr>
                                    {/* <th scope='row'>Id</th> */}
                                    <th scope='row'>Nombre</th>
                                    <th scope='row'>Email</th>
                                    <th scope='row'>Rol</th>
                                    <th>Acciones</th>
                                    {/* Agrega más encabezados de columna según tus datos de usuario */}
                                </tr>
                            </thead>
                            <tbody>
                                {usersValue.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            {/* Utiliza una arrow function para pasar el id del usuario a la función */}
                                            <button className="btn btn-primary me-3" onClick={() => { onSelect(user.id); toggleModalUpdate() }}>
                                                <i className="fa-solid fa-user-pen"></i>
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
                                                <i className="fa-solid fa-user-minus"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL CREAR USUARIO */}
            <CreateUserModal
                show={show}
                toggleModalCreate={toggleModalCreate}
            />

            {/* MODAL ACTUALIZAR USUARIO */}
            <UpdateUserModal
                show2={show2}
                toggleModalUpdate={toggleModalUpdate}
            />
        </>
    )
}
