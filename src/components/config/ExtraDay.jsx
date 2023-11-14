import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const ExtraDay = ({editDay, handleToggleDayEstado, costsValue, handleUpdateCosts}) => {

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        hotel_es: 0,
        food_es: 0,
        park_es: 0,
        renueve_es: 0,
        hotel_fs: 0,
        food_fs: 0,
        park_fs: 0,
    })

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: parseInt(target.value, 10)
        })
    }

    const onSubmit = async () => {
        event.preventDefault()
        await dispatch(handleUpdateCosts(formValues));
    }

    useEffect(() => {
        if (costsValue !== null) {
            setFormValues({ ...costsValue })
        }
    }, [costsValue])

    let sumaTotalEntreSemana = (formValues.hotel_es + formValues.food_es + formValues.park_es + formValues.renueve_es)
    let sumaTotalFinSemana = formValues.hotel_fs + formValues.food_fs + formValues.park_fs + formValues.renueve_fs

    return (
        <>
            <form className="container" onSubmit={onSubmit}>
                <div className="row">
                    
                    <div className="col-md-6 col-12">
                        <ul className="list-group list-group-flush">
                            <h3>Dia entre semana</h3>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="form-label">Hospedaje:</span>
                                {editDay ? (
                                    <span>{formValues.hotel_es}</span>
                                ) : (
                                    <input
                                        type="number"
                                        placeholder="Hospedaje"
                                        className="form-control d-inline-block w-auto text-center"
                                        name="hotel_es"
                                        autoComplete="off"
                                        value={formValues.hotel_es}
                                        onChange={onInputChanged}
                                    />
                                )}
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="form-label">Alimentos:</span>
                                {editDay ? (
                                    <span>{formValues.food_es}</span>
                                ) : (
                                    <input
                                        type="number"
                                        placeholder="Hospedaje"
                                        className="form-control d-inline-block w-auto text-center"
                                        name="food_es"
                                        autoComplete="off"
                                        value={formValues.food_es}
                                        onChange={onInputChanged}
                                    />
                                )}
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="form-label">Estacionamiento:</span>
                                {editDay ? (
                                    <span>{formValues.park_es}</span>
                                ) : (
                                    <input
                                        type="number"
                                        placeholder="Hospedaje"
                                        className="form-control d-inline-block w-auto text-center"
                                        name="park_es"
                                        autoComplete="off"
                                        value={formValues.park_es}
                                        onChange={onInputChanged}
                                    />
                                )}
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="form-label">Beneficio:</span>
                                {editDay ? (
                                    <span>{formValues.renueve_es}</span>
                                ) : (
                                    <input
                                        type="number"
                                        placeholder="Hospedaje"
                                        className="form-control d-inline-block w-auto text-center"
                                        name="renueve_es"
                                        autoComplete="off"
                                        value={formValues.renueve_es}
                                        onChange={onInputChanged}
                                    />
                                )}
                            </li>
                            {editDay ? (
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="form-label"><b>Total:</b></span>
                                    <span><b>{sumaTotalEntreSemana}</b></span>
                                </li>
                            ) : (
                                <span></span>
                            )}
                        </ul>
                    </div>

                    <div className="col-md-6 col-12">
                        <ul className="list-group list-group-flush">
                            <h3>Dia fin semana</h3>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="form-label">Hospedaje:</span>
                                {editDay ? (
                                    <span>{formValues.hotel_fs}</span>
                                ) : (
                                    <input
                                        type="number"
                                        placeholder="Hospedaje"
                                        className="form-control d-inline-block w-auto text-center"
                                        name="hotel_fs"
                                        autoComplete="off"
                                        value={formValues.hotel_fs}
                                        onChange={onInputChanged}
                                    />
                                )}
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="form-label">Alimentos:</span>
                                {editDay ? (
                                    <span>{formValues.food_fs}</span>
                                ) : (
                                    <input
                                        type="number"
                                        placeholder="Hospedaje"
                                        className="form-control d-inline-block w-auto text-center"
                                        name="food_fs"
                                        autoComplete="off"
                                        value={formValues.food_fs}
                                        onChange={onInputChanged}
                                    />
                                )}
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="form-label">Estacionamiento:</span>
                                {editDay ? (
                                    <span>{formValues.park_fs}</span>
                                ) : (
                                    <input
                                        type="number"
                                        placeholder="Hospedaje"
                                        className="form-control d-inline-block w-auto text-center"
                                        name="park_fs"
                                        autoComplete="off"
                                        value={formValues.park_fs}
                                        onChange={onInputChanged}
                                    />
                                )}
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="form-label">Beneficio:</span>
                                {editDay ? (
                                    <span>{formValues.renueve_fs}</span>
                                ) : (
                                    <input
                                        type="number"
                                        placeholder="Hospedaje"
                                        className="form-control d-inline-block w-auto text-center"
                                        name="renueve_fs"
                                        autoComplete="off"
                                        value={formValues.renueve_fs}
                                        onChange={onInputChanged}
                                    />
                                )}
                            </li>
                            {editDay ? (
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="form-label"><b>Total:</b></span>
                                    <span><b>{sumaTotalFinSemana}</b></span>
                                </li>
                            ) : (
                                <span></span>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="col-12 my-3 me d-flex align-items-end justify-content-end ">
                    {editDay ? (
                        <button type='submit' className="btn btn-primary" onClick={handleToggleDayEstado}>
                            Editar
                        </button>
                    ) : (
                        <button type='button' className="btn btn-success mt-3" onClick={handleToggleDayEstado}>
                            Guardar
                        </button>
                    )}
                </div>
            </form>
        </>
    );
};