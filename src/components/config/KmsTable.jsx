import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


export const KmsTable = ({ costsValue, editKms, handleToggleKmsState, handleUpdateCosts }) => {

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        gasoline: 0,
        salary: 0,
        booths: 0,
        maintenance: 0,
        utility: 0,
        supplement: 0,

        hotel_es: 0,
        food_es: 0,
        park_es: 0,
        renueve_es: 0,
        hotel_fs: 0,
        food_fs: 0,
        park_fs: 0
    })

    const { gasoline, salary, booths, maintenance, utility, supplement } = formValues

    const cleanValue = (value) => {
        return isNaN(value) || value === '' ? 0 : parseFloat(value);
    };

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: cleanValue(target.value),
        });
    };

    const onSubmit = async () => {
        event.preventDefault();
        await dispatch(handleUpdateCosts(formValues));
    };

    useEffect(() => {
        if (costsValue !== null) {
            setFormValues({ ...costsValue });
        }
    }, [costsValue]);

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
const cleanedGasoline = cleanValue(gasoline);
const cleanedSalary = cleanValue(salary);
const cleanedBooths = cleanValue(booths);
const directCost = parseFloat(cleanedGasoline + cleanedSalary + cleanedBooths).toFixed(1);
const totalCost = parseFloat(directCost) + cleanValue(maintenance);
const rentPrice = totalCost + cleanValue(utility);


    return (
        <>
            <form className="container" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-12">
                        <h3 className='mt-3'>Tabla KMS</h3>
                        <div className='table-wrapper'>
                            <table className="table table-striped table-hover text-center">
                                <thead className='sticky-header'>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th scope='col'>
                                            {editKms ? (
                                                <span>{formValues.gasoline}</span>

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
                                                            value={formValues.gasoline}
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
