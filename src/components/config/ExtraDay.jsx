import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


export const ExtraDay = ({ editDay, handleToggleDayEstado, costsValue, handleUpdateCosts }) => {

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

    const {hotel_es, food_es, park_es, renueve_es, hotel_fs, food_fs, park_fs, renueve_fs} = formValues

    // console.log(formValues.hotel_es);


    const cleanValue = (value) => {
        return isNaN(value) || value === '' ? 0 : parseFloat(value);
    };

    // Función para manejar cambios en los campos de entrada
    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: cleanValue(target.value),
        });
    };

    // Función para enviar los datos actualizados
    const onSubmit = async () => {
        event.preventDefault();
        await dispatch(handleUpdateCosts(formValues));
    };

    // Actualización de formValues cuando se cargan datos de la base de datos
    useEffect(() => {
        if (costsValue !== null) {
            setFormValues({ ...costsValue });
        }
    }, [costsValue]);

    let sumaTotalEntreSemana = cleanValue(hotel_es + food_es + park_es + renueve_es)
    let sumaTotalFinSemana = cleanValue(hotel_fs + food_fs + park_fs + renueve_fs)


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
                                        <span>{hotel_es}</span>
                                    ) : (
                                        <input
                                            type="number"
                                            placeholder="Hospedaje"
                                            className="form-control d-inline-block w-auto text-center"
                                            name="hotel_es"
                                            autoComplete="off"
                                            value={hotel_es}
                                            onChange={onInputChanged}
                                        />
                                    )}
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="form-label">Alimentos:</span>
                                    {editDay ? (
                                        <span>{food_es}</span>
                                    ) : (
                                        <input
                                            type="number"
                                            placeholder="Alimentos"
                                            className="form-control d-inline-block w-auto text-center"
                                            name="food_es"
                                            autoComplete="off"
                                            value={food_es}
                                            onChange={onInputChanged}
                                        />
                                    )}
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="form-label">Estacionamiento:</span>
                                    {editDay ? (
                                        <span>{park_es}</span>
                                    ) : (
                                        <input
                                            type="number"
                                            placeholder="Estacionamiento"
                                            className="form-control d-inline-block w-auto text-center"
                                            name="park_es"
                                            autoComplete="off"
                                            value={park_es}
                                            onChange={onInputChanged}
                                        />
                                    )}
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="form-label">Beneficio:</span>
                                    {editDay ? (
                                        <span>{renueve_es}</span>
                                    ) : (
                                        <input
                                            type="number"
                                            placeholder="Beneficio"
                                            className="form-control d-inline-block w-auto text-center"
                                            name="renueve_es"
                                            autoComplete="off"
                                            value={renueve_es}
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
                                        <span>{hotel_fs}</span>
                                    ) : (
                                        <input
                                            type="number"
                                            placeholder="Hospedaje"
                                            className="form-control d-inline-block w-auto text-center"
                                            name="hotel_fs"
                                            autoComplete="off"
                                            value={hotel_fs}
                                            onChange={onInputChanged}
                                        />
                                    )}
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="form-label">Alimentos:</span>
                                    {editDay ? (
                                        <span>{food_fs}</span>
                                    ) : (
                                        <input
                                            type="number"
                                            placeholder="Alimentos"
                                            className="form-control d-inline-block w-auto text-center"
                                            name="food_fs"
                                            autoComplete="off"
                                            value={food_fs}
                                            onChange={onInputChanged}
                                        />
                                    )}
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="form-label">Estacionamiento:</span>
                                    {editDay ? (
                                        <span>{park_fs}</span>
                                    ) : (
                                        <input
                                            type="number"
                                            placeholder="Estacionamiento"
                                            className="form-control d-inline-block w-auto text-center"
                                            name="park_fs"
                                            autoComplete="off"
                                            value={park_fs}
                                            onChange={onInputChanged}
                                        />
                                    )}
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="form-label">Beneficio:</span>
                                    {editDay ? (
                                        <span>{renueve_fs}</span>
                                    ) : (
                                        <input
                                            type="number"
                                            placeholder="Beneficio"
                                            className="form-control d-inline-block w-auto text-center"
                                            name="renueve_fs"
                                            autoComplete="off"
                                            value={renueve_fs}
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