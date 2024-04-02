import { useState } from 'react';
import { useConfigExtraDayStore, useConfigStore } from '../../hooks';
import Accordion from 'react-bootstrap/Accordion';



export const RoutesCalculator = ({ distance, duration, directionsResponse, totalDays, weekdaysCount, weekendCount, multKms }) => {

    const [multi, setMulti] = useState(2);
    const [isChecked, setIsChecked] = useState(true);

    const { costsValue, costsValueWeekend } = useConfigStore();
    const {totalEs, totalFs} = useConfigExtraDayStore()
    
    const { gasoline, salary, booths, maintenance, utility, supplement } = costsValue
    const { gasoline: gasolineEs, salary: salaryEs, booths: boothsEs, maintenance: maintenanceEs, utility: utilityEs, supplement: supplementEs } = costsValueWeekend



    const calcularCosto = (dias, costoPorDia) => {
        let costo = (dias * costoPorDia);
        return costo <= 0 ? 0 : costo;
    };

    const handleChangeMult = (event) => {
        setIsChecked(event.target.checked);
        setMulti(event.target.checked ? 2 : 1);
    };

    //CALCULO DISTANCIA FINAL
    const distancia = Math.round(parseFloat(distance) * parseInt(multi))

    //CALCULO MULTKMS PRIMER DIA
    const multKmsValueEs = distancia <= 400 ? gasolineEs + salaryEs + boothsEs + maintenanceEs + utilityEs + supplementEs : gasolineEs + salaryEs + maintenanceEs + boothsEs + utilityEs;
    const multKmsValueFs = distancia <= 400 ? gasoline + salary + maintenance + booths + utility + supplement : gasoline + salary + maintenance + booths + utility;
    const multKmsValue = (multKms ? multKmsValueEs : multKmsValueFs)

    //CALCULOS POR DIAS EXTRAS
    const diasEntreSemanaCosto = calcularCosto(weekdaysCount, totalEs);
    const diasFinSemanaCosto = calcularCosto(weekendCount, totalFs);
    const totalDiasCosto = diasEntreSemanaCosto + diasFinSemanaCosto

    //CALCULOS COSTO Y PRECIO VAN Y SPRINTER
    let plazas = 14
    const costoTotal = ( distancia * multKmsValue)
    const precioTotal = Math.round(parseFloat(costoTotal) + parseFloat(totalDiasCosto))
    const formattedPrecioTotal = parseFloat(precioTotal).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const precioUnitatio = (precioTotal / plazas)
    const formattedPrecioUnitario = parseFloat(precioUnitatio).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    let plazasSpt = 18
    const multKmsSpt = multKmsValue + 3
    const costoTotalSpt = (distancia * multKmsSpt)
    const precioTotalSpt = Math.round(parseFloat(costoTotalSpt) + parseFloat(totalDiasCosto))
    const formattedPrecioTotalSpt = parseFloat(precioTotalSpt).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const precioUnitatioSpt = (precioTotal / plazasSpt)
    const formattedPrecioUnitarioSpt = parseFloat(precioUnitatioSpt).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 });


    return (
        <>
            <div className='me-3 ms-4 ms-md-0 mb-3' id='titulo'>

                {directionsResponse ? (
                    <div>
                        <h2 className='text-center mt-3'>COTIZACION DEL VIAJE</h2>
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
                                    Calcular kms * 2
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
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>DESGLOSE DE OPERACIONES</Accordion.Header>
                                <Accordion.Body style={{ padding: 0 }}>
                                    <br />
                                    <div className="row mx-1 ">

                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <p>
                                                        <b>Formula:</b>
                                                        <br />
                                                        kms * {multi}
                                                        <br />
                                                        (kms * mult) + dias
                                                    </p>
                                                </div>
                                                <div className="col-12">
                                                    <p>
                                                        <b>Dias extras:</b>
                                                        <br />
                                                        Entre semana:
                                                        <br />&nbsp;
                                                        {weekdaysCount} * {totalEs}
                                                        <br />
                                                        Fin semana:
                                                        <br />&nbsp;
                                                        {weekendCount} * {totalFs}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <p>
                                                        <b>Van:</b>
                                                        <br />
                                                        {distancia} * {multKmsValue} = {Math.round(costoTotal)}
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
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </div>

                ) : <h2 className='text-center mt-3'>Esperando cotizacion...</h2>}
            </div >
        </>
    )
}