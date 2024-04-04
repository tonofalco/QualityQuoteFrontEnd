import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useConfigStore } from '../../hooks';
import { destinations } from '../../helpers';


export const KmsTable = ({ costsValue, costsValueWeekend }) => {

    const dispatch = useDispatch();
    const { editKms, handleToggleKmsState, handleUpdateFsCosts, handleUpdateEsCosts } = useConfigStore();

    const [formValues, setFormValues] = useState({
        es: {
            gasoline: 0,
            salary: 0,
            booths: 0,
            maintenance: 0,
            utility: 0,
            supplement: 0,
        },
        fs: {
            gasoline: 0,
            salary: 0,
            booths: 0,
            maintenance: 0,
            utility: 0,
            supplement: 0,
        }
    });

    const { es, fs } = formValues

    //Actualizar valores de formValues a BD 
    const onInputChanged = (part) => ({ target }) => {

        const cleanValue = (value) => isNaN(value) || value === '' ? 0 : parseFloat(value);

        setFormValues(prevFormValues => ({
            ...prevFormValues,
            [part]: {
                ...prevFormValues[part],
                [target.name]: cleanValue(target.value)
            }
        }));
    };

    // Usar la función para fs y es
    const onInputChangedFs = onInputChanged('fs');
    const onInputChangedEs = onInputChanged('es');

    //Funcion para no recargar la tabla con dispatch
    const onSubmit = async (event) => {
        event.preventDefault();

        await Promise.all([
            dispatch(handleUpdateFsCosts(fs)), // Envía solo los valores relevantes para 'fs'
            dispatch(handleUpdateEsCosts(es)), // Envía solo los valores relevantes para 'es'
        ]);
    };

    // Cargamos la informacion de los costos por kms
    useEffect(() => {
        if (costsValueWeekend !== null) {
            setFormValues(prevState => ({
                ...prevState,
                es: { ...costsValueWeekend }
            }));
        }

        if (costsValue !== null) {
            setFormValues(prevState => ({
                ...prevState,
                fs: { ...costsValue }
            }));
        }
    }, [costsValue, costsValueWeekend]);

    const directCostFs = (fs.gasoline + fs.salary + fs.booths);
    const totalCostFs = (directCostFs + fs.maintenance);
    const rentPriceFs = totalCostFs + fs.utility;

    const directCostEs = es.gasoline + es.salary + es.booths;
    const totalCostEs = (directCostEs + es.maintenance);
    const rentPriceEs = totalCostEs + es.utility;;

    return (
        <>
            <form className="container" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-12">
                        <h3 className='mt-3'>Tabla KMS</h3>
                        <span></span>
                        <div className='table-wrapper'>
                            <table className="table table-striped table-hover text-center">
                                <thead className='sticky-header'>
                                    {/* Entre semana */}
                                    <tr>
                                        <th colSpan="1">Entre semana</th>
                                        <th></th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{es.gasoline}</span>
                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="gasoline"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="gasoline"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={es.gasoline}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{es.salary}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="salary"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="salary"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={es.salary}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>

                                            {editKms ? (
                                                <span>{es.booths}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="booths"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="booths"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={es.booths}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>
                                            {directCostEs}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{es.maintenance}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="maintenance"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="maintenance"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={es.maintenance}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>
                                            {totalCostEs}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{es.utility}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="utility"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="utility"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={es.utility}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{es.supplement}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="supplement"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="supplement"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={es.supplement}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>
                                            {rentPriceEs}
                                        </th>
                                        <th>{/* Espacio en blanco */}</th>
                                    </tr>
                                    {/* fin de semana */}
                                    <tr>
                                        <th colSpan="1">Fin de semana</th>
                                        <th></th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{fs.gasoline}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="gasoline"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="gasoline"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={fs.gasoline}
                                                            onChange={onInputChangedFs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{fs.salary}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="salary"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="salary"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={fs.salary}
                                                            onChange={onInputChangedFs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{fs.booths}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="booths"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="booths"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={fs.booths}
                                                            onChange={onInputChangedFs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>
                                            {directCostFs}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{fs.maintenance}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="maintenance"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="maintenance"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={fs.maintenance}
                                                            onChange={onInputChangedFs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>
                                            {totalCostFs}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{fs.utility}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="utility"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="utility"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={fs.utility}
                                                            onChange={onInputChangedFs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{fs.supplement}</span>

                                            ) : (
                                                <div className='d-flex justify-content-center'>
                                                    <div style={{ width: '65px' }} className='input-group'>
                                                        <input
                                                            type="number"
                                                            placeholder="supplement"
                                                            className="form-control d-inline-block w-auto text-center"
                                                            name="supplement"
                                                            autoComplete="off"
                                                            step="any"
                                                            value={fs.supplement}
                                                            onChange={onInputChangedFs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>
                                            {rentPriceFs}
                                        </th>
                                        <th scope='col' className='d-flex justify-content-end'>
                                            {editKms ? (
                                                <button
                                                    type='submit'
                                                    className="btn btn-primary"
                                                    onClick={handleToggleKmsState}
                                                > Editar
                                                </button>
                                            ) : (
                                                <button
                                                    type='button'
                                                    className="btn btn-success"
                                                    onClick={handleToggleKmsState}>
                                                    Guardar
                                                </button>
                                            )}
                                        </th>
                                    </tr>
                                    {/* Titulo de tabla */}
                                    <tr className='table-dark'>
                                        <th scope="col ">Destino</th>
                                        <th scope="col">kms</th>
                                        <th scope="col">Gasolina</th>

                                        <th scope="col">Sueldo</th>
                                        <th scope="col">Casetas</th>
                                        <th scope="col" className='bg-secondary'>Costo directo</th>
                                        <th scope="col">Mantenimiento</th>
                                        <th scope="col" className='bg-secondary'>Costo total</th>
                                        <th scope="col">Utilidad</th>
                                        <th scope="col">Sup. cercano</th>
                                        <th scope="col" className='bg-success'>Precio renta</th>
                                        <th scope="col" className='bg-info'>precio pax</th>
                                    </tr>
                                </thead>
                                {/* datos de la tabla */}
                                <tbody>
                                    {destinations.map((destino, index) => (
                                        <tr key={index}>
                                            <th scope="row">{destino.nombre}</th>
                                            <td>{destino.kms}</td>
                                            <td>{Math.round(destino.kms * es.gasoline)}</td>
                                            <td>{Math.round(destino.kms * es.salary)}</td>
                                            <td>{Math.round(destino.kms * es.booths)}</td>
                                            <td className='bg-secondary'>{Math.round(destino.kms * directCostFs)}</td>
                                            <td>{destino.kms * es.maintenance}</td>
                                            <td className='bg-secondary'>{Math.round(destino.kms * totalCostFs)}</td>
                                            <td>{Math.round(destino.kms * es.utility)}</td>
                                            <td>{destino.kms <= 400 ? Math.round(destino.kms * es.supplement) : 0}</td>
                                            <td className='bg-success'>{destino.kms <= 400
                                                ? Math.round(destino.kms * (rentPriceFs + es.supplement))
                                                : Math.round(destino.kms * rentPriceFs)}
                                            </td>
                                            <td className='bg-info'>{destino.kms <= 400
                                                ? Math.round((destino.kms * (rentPriceFs + es.supplement)) / 14)
                                                : Math.round((destino.kms * rentPriceFs) / 14)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
