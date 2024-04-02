import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { useConfigExtraDayStore } from '../../hooks';

import { CreateExtaDayModal } from './CreateExtaDayModal';
import { UpdateExtaDayModal } from './UpdateExtaDayModal';


export const ExtraDay = () => {

    const { sumaCostoDiaExtraEs, sumaCostoDiaExtraFs, totalEs, totalFs, setActiveCost, deleteCostExtraDay, costs_extraDay } = useConfigExtraDayStore()

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    
    const toggleModalCreate = () => setShow(prevShow => !prevShow);
    const toggleModalUpdate = () => setShow2(prevShow => !prevShow);

    //Función para manejar la selección de usuario en redux
    const onSelect = async (costId) => {
        setActiveCost(costId)
    };

    //Funcion para eliminar un costo
    const handleDeleteCost = (costId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar costo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCostExtraDay(costId);
                Swal.fire(
                    '¡Eliminado!',
                    'El costo ha sido eliminado.',
                    'success'
                );
            }
        });
    };

    //Funcion para no recargar la tabla
    const onSubmit = event => event.preventDefault();
    
    // Cargamos la informacion de los costos
    useEffect(() => {sumaCostoDiaExtraEs(), sumaCostoDiaExtraFs()}, [costs_extraDay]);


    return (
        <>
            <form onSubmit={onSubmit}>

                <div className="d-flex mb-3">
                    <h3 className="me-3">DIA EXTRA</h3>
                    <button type="button" className="btn btn-success" onClick={toggleModalCreate}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                {/* Tabla de costos en dia extra  */}
                <div className="row">
                    <div className="col">
                        <table className="table table-auto text-center">
                            <thead>
                                <tr>
                                    {/* <th scope='row'>Id</th> */}
                                    <th scope='row'>Coste</th>
                                    <th scope='row'>Entre Semana</th>
                                    <th scope='row'>Fin Semana</th>
                                    <th scope='row'>Acciones</th>

                                    {/* <th>Acciones</th> */}
                                    {/* Agrega más encabezados de columna según tus datos de usuario */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    costs_extraDay.map((cost) => (
                                        <tr key={cost.id}>
                                            <td>{cost.cost}</td>
                                            <td>{cost.valueEs}</td>
                                            <td>{cost.valueFs}</td>
                                            <td>
                                                {/* Utiliza una arrow function para pasar el id del usuario a la función */}
                                                <button className="btn btn-primary me-3" onClick={() => { onSelect(cost.id); toggleModalUpdate() }}>
                                                    <i className="fa-solid fa-pen"></i>
                                                </button>
                                                <button className="btn btn-danger" onClick={() => handleDeleteCost(cost.id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td><b>Total:</b></td>
                                    <td><b>{totalEs}</b></td>
                                    <td><b>{totalFs}</b></td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </form>

            <CreateExtaDayModal
                show={show}
                toggleModalCreate={toggleModalCreate}
            />

            <UpdateExtaDayModal
                show2={show2}
                toggleModalUpdate={toggleModalUpdate}
            />
        </>
    );
};