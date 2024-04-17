import { useEffect, useState } from "react"
import Modal from 'react-modal'
import Swal from 'sweetalert2';

import { useAuthStore, useForm, useUiStore } from "../../hooks"


export const UpdateUserModal = ({ show2, toggleModalUpdate }) => {

    const { activeUser, updateUser } = useAuthStore();
    const { customStyles } = useUiStore()

    const [selectUser, setSelectUser] = useState({
        updateName: '',
        updateEmail: '',
        updateRole: '',
    })

    const { updateName, updateEmail, updateRole, onInputChange: onUpdateInputChange } = useForm(selectUser)

    useEffect(() => {
        if (activeUser !== null) {
            setSelectUser({
                updateName: activeUser.name,
                updateEmail: activeUser.email,
                updateRole: activeUser.role,
                registerPassword: activeUser.password,
                registerPassword2: activeUser.password,
            })
        }
        // console.log(formValues);
    }, [activeUser])

    const areFieldsFilledUpdate = () => {
        return (
            updateName.trim() !== '' &&
            updateEmail.trim() !== '' &&
            updateRole.trim() !== ''
        );
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!areFieldsFilledUpdate()) {
            Swal.fire('Campos vacíos', 'Por favor, completa todos los campos.', 'warning');
        } else if (!emailRegex.test(updateEmail)) {
            Swal.fire('Correo inválido', 'Por favor, introduce un correo electrónico válido.', 'error');
        }
        else {
            await updateUser(activeUser.id, {
                name: updateName,
                email: updateEmail,
                role: updateRole,
            });

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

    const rolOptions = ['user', 'admin'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
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
                    <form onSubmit={handleUpdateUser} className="mt-3">
                        <div className="col-12">
                            <span>Nombre</span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre de usuario"
                                name='updateName'
                                value={updateName}
                                onChange={onUpdateInputChange}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <span>Correo</span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo de usuario"
                                name='updateEmail'
                                value={updateEmail}
                                onChange={onUpdateInputChange}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <span>Rol</span>
                            <select
                                type="text"
                                className="form-select"
                                aria-label="Seleccione una ciudad"
                                name='updateRole'
                                value={updateRole}
                                onChange={onUpdateInputChange}
                            >
                                <option value="" disabled>Seleccione un rol</option>
                                {rolOptions.map((city) => (
                                    <option value={city} key={city}>{city}</option>
                                ))}
                            </select>
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
    )
}
