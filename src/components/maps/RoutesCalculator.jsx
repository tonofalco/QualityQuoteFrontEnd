import { useState, useEffect } from 'react';
import { useConfigStore } from '../../hooks';


export const RoutesCalculator = ({ distance, duration, directionsResponse, totalDays, weekdaysCount, weekendCount, }) => {

    const [multi, setMulti] = useState(2);
    const [isChecked, setIsChecked] = useState(false);


    const { costsValue, loading } = useConfigStore();
    const { hotel_es, food_es, park_es, renueve_es, hotel_fs, food_fs, park_fs, renueve_fs, gasoline, salary, booths, maintenance, utility, supplement } = costsValue


    const calcularCosto = (dias, costoPorDia) => {
        let costo = (dias * costoPorDia);
        return costo <= 0 ? 0 : costo;
    };

    const handleChangeMult = (event) => {
        setIsChecked(event.target.checked);
        setMulti(event.target.checked ? 1 : 2);
    };

    //CALCULOS POR DIAS EXTRAS
    const diaExtraEntreSemanaBase = hotel_es + food_es + park_es + renueve_es
    const diaExtraFinSemanaBase = hotel_fs + food_fs + park_fs + renueve_fs
    const diasEntreSemanaCosto = calcularCosto(weekdaysCount, diaExtraEntreSemanaBase);
    const diasFinSemanaCosto = calcularCosto(weekendCount, diaExtraFinSemanaBase);
    const totalDiasCosto = diasEntreSemanaCosto + diasFinSemanaCosto
    //CALCULO DISTANCIA FINAL
    const distancia = Math.round(parseFloat(distance) * parseInt(multi))
    //CALCULOS COSTO Y PRECIO VAN Y SPRINTER
    let plazas = 14
    const multKms = distancia <= 400 ? gasoline + salary + maintenance + booths + utility + supplement : gasoline + salary + maintenance + booths + utility;
    const costoTotal = (distancia * multKms)
    const precioTotal = Math.round(parseFloat(costoTotal) + parseFloat(totalDiasCosto))
    const formattedPrecioTotal = parseFloat(precioTotal).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });;
    const precioUnitatio = (precioTotal / plazas)
    const formattedPrecioUnitario = parseFloat(precioUnitatio).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    let plazasSpt = 18
    const multKmsSpt = multKms + 3
    const costoTotalSpt = (distancia * multKmsSpt)
    const precioTotalSpt = Math.round(parseFloat(costoTotalSpt) + parseFloat(totalDiasCosto))
    const formattedPrecioTotalSpt = parseFloat(precioTotalSpt).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });;
    const precioUnitatioSpt = (precioTotal / plazasSpt)
    const formattedPrecioUnitarioSpt = parseFloat(precioUnitatioSpt).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    if (loading || costsValue == {}) {
        return <div>Cargando aplicacion...</div>
    }

    return (
        <>
            <div className='me-3 ms-4 ms-md-0 mb-3' id='titulo'>

                {directionsResponse ? (
                    <div>
                        <h2 className='text-center mt-3'>Cotizacion de transportes</h2>
                        <br />

                {/* INFORMACION DEL VIAJE */}

                <div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckIndeterminate"
                                    checked={isChecked} // Asigna el valor del estado al atributo "checked" del checkbox
                                    onChange={handleChangeMult} // Asigna el controlador de eventos al evento "onChange"
                                />
                                <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                    calcular solo ida
                                </label>
                            </div>
                            <div><b>Distancia: </b> {distancia} kms</div>
                            <div><b>Duracion: </b> {duration}</div>
                            <div><b>Dias: </b>{totalDays}</div>
                        </div>
                <hr />

                {/* PRECIOS FINALES */}

                <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Transporte</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Pax</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{plazas}</th>
                                    <td>Van</td>
                                    <td>{formattedPrecioTotal}</td>
                                    <td>{formattedPrecioUnitario}</td>
                                </tr>
                                <tr>
                                    <th scope="row">{plazasSpt}</th>
                                    <td>Sprinter</td>
                                    <td>{formattedPrecioTotalSpt}</td>
                                    <td>{formattedPrecioUnitarioSpt}</td>
                                </tr>
                            </tbody>
                        </table>
                        <hr />

                {/* DESGLOSE DE OPERACIONES*/}

                <div className='bg-secondary text-white'>
                            <h3 className='mx-1 my-1'>Desglose</h3>
                            <br />
                            <div className="row mx-1 ">

                                <div className="col-5">
                                    <div className="row">
                                        <div className="col-12">
                                            <p>
                                                <b>Total kms:</b>
                                                <br />
                                                kms * {multi}
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <p>
                                                <b>Dias extras:</b>
                                                <br />
                                                Entre semana:
                                                <br />&nbsp;
                                                {weekdaysCount} * {diaExtraEntreSemanaBase}
                                                <br />
                                                Fin semana:
                                                <br />&nbsp;
                                                {weekendCount} * {diaExtraFinSemanaBase}
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <p>
                                                <b>Costo:</b>
                                                <br />
                                                kms * base
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-7">
                                    <div className="row">
                                        <div className="col-12">
                                            <p>
                                                <b>Van:</b>
                                                <br />
                                                {distancia} * {multKms} = {Math.round(costoTotal)}
                                                <br />
                                                {Math.round(costoTotal)} + {totalDiasCosto} = {formattedPrecioTotal}
                                                <br />
                                                {precioTotal} / {plazas} = {formattedPrecioUnitario}
                                            </p>
                                        </div>
                                        <div className="col-12 mb-1">
                                            <b>Sprinter:</b>
                                            <br />
                                            {distancia} * {multKmsSpt} = {Math.round(costoTotalSpt)}
                                            <br />
                                            {Math.round(costoTotalSpt)} + {totalDiasCosto} = {formattedPrecioTotalSpt}
                                            <br />
                                            {precioTotal} / {plazasSpt} = {formattedPrecioUnitarioSpt}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                ) : <h2 className='text-center mt-3'>Esperando cotizacion...</h2>}
            </div >
        </>
    )
}