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

export const CreateUserModal = ({ show, toggleModalCreate }) => {

    const {startRegister} = useAuthStore();

    const { registerName, registerEmail, registerRole, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields)


    const areFieldsFilledCreate = () => {
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
        if (!areFieldsFilledCreate()) {
            Swal.fire('Campos vacíos', 'Por favor, completa todos los campos.', 'warning');
        } else if (!emailRegex.test(registerEmail)) {
            Swal.fire('Correo inválido', 'Por favor, introduce un correo electrónico válido.', 'error');
        } else if (registerPassword !== registerPassword2) {
            Swal.fire('Error en registro', '¡Las contraseñas no son iguales!', 'error');
        } else if (registerPassword.length <= 6) {
            Swal.fire('Error en registro', '¡La contraseña debe ser mayor a 6 caracteres', 'error');
        }
        else {
            await startRegister({
                name: registerName,
                email: registerEmail,
                role: registerRole,
                password: registerPassword
            });
            toggleModalCreate()

            Swal.fire({
                icon: 'success',
                title: '¡Usuario creado!',
                text: 'El usuario se ha creado exitosamente.',
                showConfirmButton: false,
                timer: 1900
            });
        }
    };



    const rolOptions = ['user', 'admin'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return (
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
    )
}
