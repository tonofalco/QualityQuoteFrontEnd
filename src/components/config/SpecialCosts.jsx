import { useState, useEffect } from 'react';

import { useConfigSpecialCostsStore } from '../../hooks';
import { UpdateSpecialCost } from './UpdateSpecialCost';

export const SpecialCosts = ({ special_costs }) => {

    const { activeCost, setActiveCost } = useConfigSpecialCostsStore()


    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const toggleModalCreate = () => setShow(prevShow => !prevShow);
    const toggleModalUpdate = () => setShow2(prevShow => !prevShow);

    //Función para manejar la selección de usuario en redux
    const onSelect = async (costId) => {
        setActiveCost(costId)
    };

    //Funcion para no recargar la tabla
    const onSubmit = event => event.preventDefault();

    // Cargamos la informacion de los costos
    useEffect(() => { }, [special_costs]);

    // console.log(special_costs)

    return (
        <>
            <form onSubmit={onSubmit}>

                <div className="d-flex mb-3">
                    <h3 className="me-3">REGLAS POR KMS</h3>
                </div>
                {/* Tabla de costos en dia extra  */}
                <div className="row">
                    <div className="col">
                        <table className="table table-auto text-center">
                            <thead>
                                <tr>

                                    <th scope='row'>Regla</th>
                                    <th scope='row'>Formula entre semana</th>
                                    <th scope='row'>Formula fin semana</th>
                                    <th scope='row'>Acciones</th>


                                </tr>
                            </thead>
                            <tbody>
                                {special_costs.map((cost, index) => (
                                    <tr key={cost.id}>
                                        <td>{index % 2 === 0 ? `kms < ${cost.kms}` : `kms > ${cost.kms}`}</td>
                                        <td>{`(kms * ${cost.mult}) + ${cost.sumEs}`}</td>
                                        <td>{`(kms * ${cost.mult}) + ${cost.sum}`}</td>

                                        <td>
                                            <button className="btn btn-primary me-3" onClick={() => { onSelect(cost.id); toggleModalUpdate() }}>
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </form>


            <UpdateSpecialCost
                show2={show2}
                toggleModalUpdate={toggleModalUpdate}
            /> 
        </>
    )
}
