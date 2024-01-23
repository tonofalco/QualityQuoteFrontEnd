import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


export const KmsTable = ({ costsValue, costsValueWeekend, editKms, handleToggleKmsState, handleUpdateCosts, handleUpdateEsCosts }) => {

    const dispatch = useDispatch();

    // console.log(costsValueWeekend);
    // console.log(costsValue);

    const [formValuesEs, setFormValuesEs] = useState({
        gasoline: 0,
        salary: 0,
        booths: 0,
        maintenance: 0,
        utility: 0,
        supplement: 0,
    })

    const [formValues, setFormValues] = useState({
        gasoline: 0,
        salary: 0,
        booths: 0,
        maintenance: 0,
        utility: 0,
        supplement: 0,
    })

    const { gasoline: gasolineEs, salary: salaryEs, booths: boothsEs, maintenance: maintenanceEs, utility: utilityEs, supplement: supplementEs } = formValuesEs
    const { gasoline, salary, booths, maintenance, utility, supplement } = formValues

    // console.log(gasoline, gasolineEs);

    const cleanValue = (value) => {
        return isNaN(value) || value === '' ? 0 : parseFloat(value);
    };

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: cleanValue(target.value)
        });
    };

    const onInputChangedEs = ({ target }) => {
        setFormValuesEs({
            ...formValuesEs,
            [target.name]: cleanValue(target.value),
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await Promise.all([
            dispatch(handleUpdateCosts(formValues)),
            dispatch(handleUpdateEsCosts(formValuesEs)),
        ]);
    };

    useEffect(() => {
        if (costsValue !== null) {
            setFormValues({ ...costsValue });
        }

        if (costsValueWeekend !== null) {
            setFormValuesEs({ ...costsValueWeekend });
        }
    }, [costsValue, costsValueWeekend]);

    const destinos = [
        { nombre: 'Acapulco / Barra vieja', kms: 300 },
        { nombre: 'Taxco', kms: 300 },
        { nombre: 'Zoofari', kms: 350 },
        { nombre: 'Tepoztlan', kms: 450 },
        { nombre: 'Puerto vicente', kms: 500 },
        { nombre: 'Hacienda panoaya', kms: 550 },
        { nombre: 'CDMX', kms: 550 },
        { nombre: 'Puebla', kms: 600 },
        { nombre: 'Villa iluminada', kms: 600 },
        { nombre: 'Valquirico', kms: 650 },
        { nombre: 'Teotihuacan', kms: 650 },
        { nombre: 'Luciernagas', kms: 700 },
        { nombre: 'Nevado', kms: 750 },
        { nombre: 'Volcanic park', kms: 800 },
        { nombre: 'Bioparque', kms: 800 },
        { nombre: 'Chignahuapan y Zacatlan', kms: 850 },
        { nombre: 'Monarcas / valle de bravo', kms: 900 },
        { nombre: 'Tlalpujahua / El oro', kms: 900 },
        { nombre: 'Cuetzalan y tlatlauquitepec', kms: 1000 },
        { nombre: 'Geiser', kms: 1000 },
        { nombre: 'Tolantongo', kms: 1000 },
        { nombre: 'Queretaro / bernal', kms: 1050 },
        { nombre: 'Viñedos', kms: 1100 },
        { nombre: 'Veracruz', kms: 1200 },
        { nombre: 'Juquila y pto', kms: 1200 },
        { nombre: 'Ecoturismo Qro', kms: 1300 },
        { nombre: 'Morelia y patzcuaro', kms: 1300 },
        { nombre: 'Guanajuato y sillao o Allende', kms: 1300 },
        { nombre: 'Leon y Gto', kms: 1400 },
        { nombre: 'Oaxaca', kms: 1400 },
        { nombre: 'Zacatecas', kms: 2000 },
        { nombre: 'Huasteca', kms: 2200 },
        { nombre: 'Mty', kms: 2400 },
    ];

    let kms = 0;

    const directCost = gasoline + salary + booths;
    const totalCost = directCost + maintenance;
    const rentPrice = totalCost + utility;

    const directCost2 = gasolineEs + salaryEs + boothsEs;
    const totalCost2 = (directCost2 + maintenanceEs);
    const rentPrice2 = totalCost2 + utilityEs;


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
                                                <span>{gasolineEs}</span>

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
                                                            value={gasolineEs}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{salaryEs}</span>

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
                                                            value={salaryEs}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>

                                            {editKms ? (
                                                <span>{boothsEs}</span>

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
                                                            value={boothsEs}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>
                                            {directCost2}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{maintenanceEs}</span>

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
                                                            value={maintenanceEs}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>
                                            {totalCost2}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{utilityEs}</span>

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
                                                            value={utilityEs}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{supplementEs}</span>

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
                                                            value={supplementEs}
                                                            onChange={onInputChangedEs}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>
                                            {rentPrice2}
                                        </th>
                                    </tr>
                                    {/* fin de semana */}
                                    <tr>
                                        <th colSpan="1">Fin de semana</th>
                                        <th></th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{gasoline}</span>

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
                                                            value={gasoline}
                                                            onChange={onInputChanged}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{formValues.salary}</span>

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
                                                            value={formValues.salary}
                                                            onChange={onInputChanged}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{formValues.booths}</span>

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
                                                            value={formValues.booths}
                                                            onChange={onInputChanged}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>{directCost}</th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{formValues.maintenance}</span>

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
                                                            value={formValues.maintenance}
                                                            onChange={onInputChanged}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>{totalCost}</th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{formValues.utility}</span>

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
                                                            value={formValues.utility}
                                                            onChange={onInputChanged}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{formValues.supplement}</span>

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
                                                            value={formValues.supplement}
                                                            onChange={onInputChanged}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                        <th>{rentPrice}</th>
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
                                    {destinos.map((destino, index) => (
                                        <tr key={index}>
                                            <th scope="row">{destino.nombre}</th>
                                            <td>{destino.kms}</td>
                                            <td>{Math.round(destino.kms * gasoline)}</td>
                                            <td>{Math.round(destino.kms * salary)}</td>
                                            <td>{Math.round(destino.kms * booths)}</td>
                                            <td className='bg-secondary'>{Math.round(destino.kms * directCost)}</td>
                                            <td>{destino.kms * maintenance}</td>
                                            <td className='bg-secondary'>{Math.round(destino.kms * totalCost)}</td>
                                            <td>{Math.round(destino.kms * utility)}</td>
                                            <td>{destino.kms <= 400 ? Math.round(destino.kms * supplement) : 0}</td>
                                            <td className='bg-success'>{destino.kms <= 400
                                                ? Math.round(destino.kms * (rentPrice + supplement))
                                                : Math.round(destino.kms * rentPrice)}
                                            </td>
                                            <td className='bg-info'>{destino.kms <= 400
                                                ? Math.round((destino.kms * (rentPrice + supplement)) / 14)
                                                : Math.round((destino.kms * rentPrice) / 14)}
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
