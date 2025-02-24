import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import Swal from 'sweetalert2';

import { useConfigSpecialCostsStore, useForm, useUiStore } from '../../hooks';

export const UpdateSpecialCost = ({ show2, toggleModalUpdate }) => {

    Modal.setAppElement('#root');

    const [selectCost, setSelectCost] = useState({
        updateKms: 0,
        updateMult: 0,
        updateSum: 0,
        updateSumEs: 0,

    })

    const { activeCost, updateCostSpecialCost } = useConfigSpecialCostsStore()
    const { customStyles } = useUiStore()

    const { updateKms, updateMult, updateSum, updateSumEs, onInputChange: onUpdateInputChange } = useForm(selectCost)

    //Funcion para validar campos 
    const areFormFieldsFilledUpdate = () => {
        return (
            updateKms.toString().trim() !== '' &&
            updateMult.toString().trim() &&
            updateSum.toString().trim() &&
            updateSumEs.toString().trim()
        );
    };

    //Actualiza valores de costo actual
    useEffect(() => {
        if (activeCost !== null) {
            setSelectCost({
                updateKms: activeCost.kms,
                updateMult: activeCost.mult,
                updateSum: activeCost.sum,
                updateSumEs: activeCost.sumEs
            })
        }
        // console.log(activeCost);
    }, [activeCost])

    //Funcion para actualizar un costo
    const handleUpdatespecialCost = async (e) => {
        e.preventDefault();
        if (!areFormFieldsFilledUpdate()) {
            Swal.fire('Campos vacíos', 'Por favor, completa todos los campos.', 'warning');
        } else {
            await updateCostSpecialCost(activeCost.id, {
                kms: updateKms,
                mult: updateMult,
                sum: updateSum,
                sumEs: updateSumEs,
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
                        <form onSubmit={handleUpdatespecialCost} className="mt-3">
                            <div className="col-12">
                                <span>kms base</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="kms regla"
                                    name='updateKms'
                                    value={updateKms}
                                    onChange={onUpdateInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>multiplicador de kms</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="valor del kms"
                                    name='updateMult'
                                    value={updateMult}
                                    onChange={onUpdateInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>suma entre semana</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="suma extra de kms"
                                    name='updateSumEs'
                                    value={updateSumEs}
                                    onChange={onUpdateInputChange}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <span>suma fin de semana</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="suma extra de kms"
                                    name='updateSum'
                                    value={updateSum}
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
