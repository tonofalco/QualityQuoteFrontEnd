import { useState, useEffect } from 'react';
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

export const UpdateExtaDayModal = ({show2, toggleModalUpdate}) => {

    const [selectCost, setSelectCost] = useState({
        updateCost: '',
        updateValueEs: 0,
        updateValueFs: 0,
    })

    const { activeCost, updateCostExtraDay } = useConfigExtraDayStore()

    const { updateCost, updateValueEs, updateValueFs, onInputChange: onUpdateInputChange } = useForm(selectCost)

    //Funcion para validar campos 
    const areFormFieldsFilledUpdate = () => {
        return (
            updateCost.trim() !== '' &&
            updateValueEs.toString().trim() &&
            updateValueFs.toString().trim()
        );
    };

    //Actualiza valores de costo actual
    useEffect(() => {
        if (activeCost !== null) {
            setSelectCost({
                updateCost: activeCost.cost,
                updateValueEs: activeCost.valueEs,
                updateValueFs: activeCost.valueFs,
            })
        }
        // console.log(activeCost);
    }, [activeCost])

    //Funcion para actualizar un costo
    const handleUpdateCostExtraDay = async (e) => {
        e.preventDefault();
        if (!areFormFieldsFilledUpdate()) {
            Swal.fire('Campos vacíos', 'Por favor, completa todos los campos.', 'warning');
        } else {
            await updateCostExtraDay(activeCost.id, {
                cost: updateCost,
                valueEs: updateValueEs,
                valueFs: updateValueFs,
            });

            toggleModalUpdate();
            Swal.fire({
                icon: 'success',
                title: '¡Coste actualizado!',
                text: 'El costo se ha actualizado exitosamente.',
                showConfirmButton: false,
                timer: 1900
            });
        }
    };


    return (
        <>
        {/* <h1>modal actualizar costo</h1> */}
        {/* MODAL ACTUALIZAR USUARIO */}
        <Modal
                isOpen={show2}
                onRequestClose={toggleModalUpdate}
                style={customStyles}
                className='modal'
                overlayClassName='modal-fondo'
                closeTimeoutMS={200}
            >
                <h2>Form: Editar Costo</h2>
                <hr />
                <div className="container">
                    <div className="row">
                        <form onSubmit={handleUpdateCostExtraDay} className="mt-3">
                            <div className="col-12">
                                <span>Costo</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del costo"
                                    name='updateCost'
                                    value={updateCost}
                                    onChange={onUpdateInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>valor entre semana</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="valor del costo entre semana"
                                    name='updateValueEs'
                                    value={updateValueEs}
                                    onChange={onUpdateInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>valor fin de semana</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="valor del costo fin de semana"
                                    name='updateValueFs'
                                    value={updateValueFs}
                                    onChange={onUpdateInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3 d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="btn btn-outline-success btn-block"
                                    value="Actualizar costo"
                                >
                                    <span> Actualizar costo </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}
