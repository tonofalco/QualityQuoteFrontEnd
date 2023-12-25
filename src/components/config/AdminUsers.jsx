import { useEffect, useState } from "react"
import { useAuthStore, useForm } from "../../hooks"
import Swal from 'sweetalert2';
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerRole: 'user',
    registerPassword: '',
    registerPassword2: '',
}

export const AdminUsers = () => {

    const { usersValue, startLoadingUsers, startRegister, errorMessage, deleteUser, updateUser } = useAuthStore();
    const { registerName, registerEmail, registerRole, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields)
    
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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
    }, [errorMessage, isLoading, startLoadingUsers]);
    

    const areFieldsFilled = () => {
        return (
            registerName.trim() !== '' &&
            registerEmail.trim() !== '' &&
            registerRole.trim() !== '' &&
            registerPassword.trim() !== '' &&
            registerPassword2.trim() !== ''
        );
    };

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        if (!areFieldsFilled()) {
            Swal.fire('Campos vacíos', 'Por favor, completa todos los campos.', 'warning');
        } else if (registerPassword !== registerPassword2) {
            Swal.fire('Error en registro', '¡Las contraseñas no son iguales!', 'error');
        } else {
            await startRegister({ name: registerName, email: registerEmail, role: registerRole, password: registerPassword });
            Swal.fire({
                icon: 'success',
                title: '¡Usuario creado!',
                text: 'El usuario se ha creado exitosamente.',
                showConfirmButton: false,
                timer: 1900
            });
        }
    };

    // const handleEditUser = (user) => {
    //     setSelectedUser(user);
    //     toggleModalUpdate();
    // };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!areFieldsFilled()) {
            Swal.fire('Campos vacíos', 'Por favor, completa todos los campos.', 'warning');
        } else if (registerPassword !== registerPassword2) {
            Swal.fire('Error en registro', '¡Las contraseñas no son iguales!', 'error');
        } else {
            await updateUser(selectedUser.id, {
                name: registerName,
                email: registerEmail,
                role: registerRole,
                password: registerPassword
            });
            // Restablece el estado del usuario seleccionado y cierra el modal
            setSelectedUser(null);
            toggleModalUpdate();
            Swal.fire({
                icon: 'success',
                title: '¡Usuario actualizado!',
                text: 'El usuario se ha actualizado exitosamente.',
                showConfirmButton: false,
                timer: 1900
            });
        }
    };

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

    const rolOptions = ['user', 'admin'];
    const toggleModalCreate = () => setShow(prevShow => !prevShow);
    const toggleModalUpdate = () => setShow2(prevShow => !prevShow);


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
                                        {/* <td>{user.id}</td> */}
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button className="btn btn-primary me-3" onClick={() => toggleModalUpdate()}><i className="fa-solid fa-user-pen"></i></button>
                                            <button className="btn btn-danger " onClick={() => handleDeleteUser(user.id)}><i className="fa-solid fa-user-minus"></i></button>
                                        </td>
                                        {/* Agrega más celdas según tus datos de usuario */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL CREAR USUARIO */}
            <Modal
                isOpen={show}
                onRequestClose={toggleModalCreate}
                style={customStyles}
                className='modal'
                overlayClassName='modal-fondo'
                closeTimeoutMS={200}
            >
                <h2>Form: Nuevo usuario</h2>
                <hr />
                <div className="container">
                    <div className="row">

                        <form onSubmit={handleRegisterUser} className="mt-3">
                            <div className="col-12">
                                <span>Nombre</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre de usuario"
                                    name='registerName'
                                    value={registerName}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Correo</span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo de usuario"
                                    name='registerEmail'
                                    value={registerEmail}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Rol</span>
                                <select
                                    type="text"
                                    className="form-select"
                                    aria-label="Seleccione una ciudad"
                                    name='registerRole'
                                    value={registerRole}
                                    onChange={onRegisterInputChange}
                                >
                                    <option value="" disabled>Seleccione un rol</option>
                                    {rolOptions.map((city) => (
                                        <option value={city} key={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 mt-3">
                                <span>Contraseña</span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña de usuario"
                                    name='registerPassword'
                                    value={registerPassword}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Confirmar contraseña</span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repita la misma contraseña"
                                    name='registerPassword2'
                                    value={registerPassword2}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3 d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="btn btn-outline-success btn-block"
                                    value="Crear cuenta"
                                >
                                    <span> Crear usuario </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </Modal>

            {/* MODAL ACTUALIZAR USUARIO */}
            <Modal
                isOpen={show2}
                onRequestClose={toggleModalUpdate}
                style={customStyles}
                className='modal'
                overlayClassName='modal-fondo'
                closeTimeoutMS={200}
            >
                <h2>Form: Editar usuario</h2>
                <hr />
                <div className="container">
                    <div className="row">
                        <form onSubmit={handleUpdateUser}>
                            <div className="col-12">
                                <span>Nombre</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre de usuario"
                                    name='updateName'
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Correo</span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo de usuario"
                                    name='registerEmail'
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Rol</span>
                                <select
                                    type="text"
                                    className="form-select"
                                    aria-label="Seleccione una ciudad"
                                    name='registerRole'
                                >
                                    <option value="" disabled>Seleccione un rol</option>
                                    <option value="user">Usuario</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                            <div className="col-12 mt-3">
                                <span>Contraseña</span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña de usuario"
                                    name='registerPassword'
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Confirmar contraseña</span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repita la misma contraseña"
                                    name='registerPassword2'
                                />
                            </div>
                            <div className="col-12 mt-3 d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="btn btn-outline-success btn-block"
                                    value="Actualizar usuario"
                                >
                                    <span> Actualizar usuario </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

