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
    registerRole: '',
    registerPassword: '',
    registerPassword2: '',
}


Modal.setAppElement('#root');



export const AdminUsers = () => {

    const { usersValue, startLoadingUsers, startRegister, errorMessage } = useAuthStore();
    const { registerName, registerEmail,  registerRole, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields)

    const [isLoading, setIsLoading] = useState(false);

    const registerSubmit = (e) => {
        e.preventDefault()
        if (registerPassword !== registerPassword2) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error')
        }
        startRegister({ name: registerName, email: registerEmail,  role: registerRole, password: registerPassword, })
    }

    const rolOptions = ['user', 'admin'];

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticacion', errorMessage, 'error')
        }
    }, [errorMessage])

    useEffect(() => {
        if (!isLoading) {
            const fetchData = async () => {
                setIsLoading(true);
                await startLoadingUsers();
            };

            fetchData();
        }
    }, [isLoading, startLoadingUsers]);
    // const {id, name, email, password, role} = usersValue

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // console.log(registerName, registerEmail, registerRole, registerPassword);

    return (
        <>
            <Modal
                isOpen={show}
                onRequestClose={handleClose}
                style={customStyles}
                className='modal'
                overlayClassName='modal-fondo'
                closeTimeoutMS={200}
            >
                <h1>Nuevo usuario</h1>
                <hr />
                <div className="container">
                    <div className="row">

                        <form onSubmit={registerSubmit}>
                            <div className="col-12">
                                <span>Nombre de usuario:</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name='registerName'
                                    value={registerName}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Correo:</span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo"
                                    name='registerEmail'
                                    value={registerEmail}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Rol:</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="role"
                                    name='registerRole'
                                    value={registerRole}
                                    onChange={onRegisterInputChange}
                                />
                                {/* <select
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
                                </select> */}
                            </div>
                            <div className="col-12 mt-3">
                                <span>Contraseña:</span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name='registerPassword'
                                    value={registerPassword}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Revalidar contraseña</span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repita la contraseña"
                                    name='registerPassword2'
                                    value={registerPassword2}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="d-grid">
                                <input
                                    type="submit"
                                    className="btnSubmit"
                                    value="Crear cuenta" />
                            </div>
                        </form>
                    </div>
                </div>

            </Modal>


            <div className="container">
                <div className="d-flex mb-3">
                    <h3 className="me-3">Usuarios registrados</h3>
                    <button type="button" className="btn btn-success" onClick={handleShow}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div className="row">
                    <div className="col-12">
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
                                            <button className="btn btn-danger me-3"><i className="fa-solid fa-trash"></i></button>
                                            <button className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i></button>
                                        </td>
                                        {/* Agrega más celdas según tus datos de usuario */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

