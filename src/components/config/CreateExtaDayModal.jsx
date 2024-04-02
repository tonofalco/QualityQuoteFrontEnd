import { useConfigExtraDayStore, useForm } from '../../hooks';

import Modal from 'react-modal'
import Swal from 'sweetalert2';


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
    registerCost: '',
    registerValueEs: 0,
    registerValueFs: 0,
}


export const CreateExtaDayModal = ({show, toggleModalCreate}) => {

    const {  startRegisterCost } = useConfigExtraDayStore()

    const { registerCost, registerValueEs, registerValueFs, onInputChange: onRegisterInputChange } = useForm(registerFormFields)
    
    //Funcion para validar campos
    const areFormFieldsFilledCreate = () => {
        return (
            registerCost.trim() !== '' &&
            registerValueEs.trim() !== '' &&
            registerValueFs.trim() !== ''
        );
    };

    //Funcion para agregar un nuevo costo
    const handleRegisterCost = async (e) => {
        e.preventDefault();
        if (!areFormFieldsFilledCreate()) {
            Swal.fire('Campos vacíos', 'Por favor, completa todos los campos.', 'warning');
        } else {
            await startRegisterCost({
                cost: registerCost,
                valueEs: registerValueEs,
                valueFs: registerValueFs,
            });

            toggleModalCreate()
            Swal.fire({
                icon: 'success',
                title: 'Costo agregado!',
                text: 'El Costo se ha agregado con exito.',
                showConfirmButton: false,
                timer: 1900
            });
        }
    };


    return (
        <>
            {/* <h1>modal crear costo</h1> */}
            {/* MODAL CREAR USUARIO */}
            <Modal
                isOpen={show}
                onRequestClose={toggleModalCreate}
                style={customStyles}
                className='modal'
                overlayClassName='modal-fondo'
                closeTimeoutMS={200}
            >
                <h2>Form: Nuevo Costo</h2>
                <hr />
                <div className="container">
                    <div className="row">

                        <form onSubmit={handleRegisterCost} className="mt-3">
                            <div className="col-12">
                                <span>Costo</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del costo"
                                    name='registerCost'
                                    value={registerCost}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Valor entre semana</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Valor del costo entre semana"
                                    name='registerValueEs'
                                    value={registerValueEs}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>Valor fin de semana</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    aria-label="Valor del costo en fin de semana"
                                    name='registerValueFs'
                                    value={registerValueFs}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3 d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="btn btn-outline-success btn-block"
                                    value="Agregar costo"
                                >
                                    <span> Agregar costo </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </Modal>
        </>
    )
}
