import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useConfigExtraDayStore, useConfigKmsTableStore, useConfigSpecialCostsStore } from '../../hooks';
import { currencyFormatMx } from '../../helpers';
import { PrintRouteModal } from './PrintRouteModal';



export const RoutesCalculator = ({ sourceRef, destinationRef, stopsQuote, distance, duration, directionsResponse, totalDays, weekdaysCount, weekendCount, multKms, startDate, endDate }) => {

    const [show, setShow] = useState(false);
    const toggleModalPrint = () => setShow(prevShow => !prevShow);

    const { costsValue, costsValueWeekend } = useConfigKmsTableStore();
    const { sumaCostoDiaExtraEs, sumaCostoDiaExtraFs, totalEs, totalFs, costs_extraDay } = useConfigExtraDayStore()
    const { special_costs } = useConfigSpecialCostsStore()


    const { gasoline, salary, booths, maintenance, utility, supplement } = costsValue
    const { gasoline: gasolineEs, salary: salaryEs, booths: boothsEs, maintenance: maintenanceEs, utility: utilityEs, supplement: supplementEs } = costsValueWeekend

    // Cargamos la informacion de los costos
    useEffect(() => { sumaCostoDiaExtraEs(), sumaCostoDiaExtraFs() }, [costs_extraDay]);

    const calcularCosto = (dias, costoPorDia) => (dias * costoPorDia) <= 0 ? 0 : (dias * costoPorDia);
    const calcularKms = (gasoline, salary, maintenance, booths, utility, supplement) => distancia <= 400 ? gasoline + salary + maintenance + booths + utility + supplement : gasoline + salary + maintenance + booths + utility;

    //CALCULO DISTANCIA TOTAL 
    const distancia = Math.round(parseFloat(distance))

    //CALCULO MULTKMS PRIMER DIA
    const multKmsValueEs = calcularKms(gasolineEs, salaryEs, boothsEs, maintenanceEs, utilityEs, supplementEs)
    const multKmsValueFs = calcularKms(gasoline, salary, maintenance, booths, utility, supplement)

    //CALCULOS POR DIAS EXTRAS
    const diasEntreSemanaCosto = calcularCosto(weekdaysCount, totalEs);
    const diasFinSemanaCosto = calcularCosto(weekendCount, totalFs);
    const diasSprinterGeneral = calcularCosto(totalDays - 1, 3000)
    const totalDiasCosto = diasEntreSemanaCosto + diasFinSemanaCosto



    let tripType = ''
    let multKmsValue = 0
    let sumKmsValue = 0

    if (distancia <= special_costs[0].kms) {

        tripType = 'Cercano'
        multKmsValue = special_costs[0].mult
        sumKmsValue = special_costs[0].sum

    } else if (distancia >= special_costs[1].kms) {

        tripType = 'Lejano'
        multKmsValue = special_costs[1].mult
        sumKmsValue = special_costs[1].sum

    } else if (distancia > special_costs[0].kms && distancia < special_costs[1].kms) {

        tripType = 'Normal'
        multKmsValue = (multKms ? multKmsValueFs : multKmsValueEs)
        
        console.log(multKms)

    }

    //CALCULOS COSTO Y PRECIO VAN Y SPRINTER
    let plazas = 15
    const costoPrimerDia = (distancia * multKmsValue) + sumKmsValue
    const precioFinal = Math.round(parseFloat(costoPrimerDia) + parseFloat(totalDiasCosto))

    let plazasSpt = 20
    const multKmsSpt = 16
    const costoPrimerDiaSpt = (distancia * multKmsSpt)
    const precioFinalSpt = Math.round(parseFloat(costoPrimerDiaSpt) + parseFloat(diasSprinterGeneral))


    // const multKmsValue = (multKms ? multKmsValueEs : multKmsValueFs)

    return (
        <>
            <div className='me-3 ms-4 ms-md-0 mb-3' id='titulo'>

                {directionsResponse ? (
                    <div>
                        {/* <hr /> */}
                        {/* PRECIOS FINALES */}
                        <h4 className='text-muted mt-3'>PRECIOS ESTIMADOS:</h4>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col"><i className="fa-solid fa-bus"></i></th>
                                    <th scope="col">Transporte</th>
                                    <th scope="col">Precio Final</th>
                                    <th scope="col">Pax</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{plazas}</th>
                                    <td>Van</td>
                                    <td className='bg-success text-light'><b>{currencyFormatMx(precioFinal)}</b></td>
                                    <td>{currencyFormatMx(precioFinal / plazas)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">{plazasSpt}</th>
                                    <td>Sprinter</td>
                                    <td className='bg-success text-light'><b>{currencyFormatMx(precioFinalSpt)}</b></td>
                                    <td>{currencyFormatMx(precioFinalSpt / plazasSpt)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <hr />
                        {/* INFORMACION GENERAL DEL VIAJE */}
                        <h4 className='text-muted'>DATOS DE LA COTIZACION:</h4>
                        <div className="row  mb-3">
                            <div className="col-12">
                                <span><b>Tipo de viaje: </b>{tripType}</span><br />
                                <span><b>Distancia total: </b>{distancia} kms</span><br />
                                <span><b>Duracion del viaje: </b>{totalDays} d</span><br />
                                <span><b>Tiempo total de manejo: </b>{duration}</span><br />
                            </div>
                        </div>
                        {/* INFORMACION DESGLOSADA  DEL VIAJE */}
                        <Accordion defaultActiveKey="0">
                            {/* RUTA CALCULADA */}
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>RUTA CALCULADA</Accordion.Header>
                                <Accordion.Body style={{ padding: 0 }}>
                                    <br />
                                    <div className="row mx-1 ">
                                        <div className="col-12">
                                            <ol className='list-group list-group-numbered'>
                                                <li className='list-group-item'>{sourceRef.current.value}</li>
                                                {stopsQuote.map((stop, index) => <li key={index} className='list-group-item'>{stop}</li>)}
                                                <li className='list-group-item'>{destinationRef.current.value}</li>
                                            </ol>

                                            <div className='d-flex justify-content-end mt-3'>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-info me-3"
                                                    onClick={() => { toggleModalPrint() }}
                                                >Imprimir
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    <br />
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* DESGLOSE DE OPERACIONES */}
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>DESGLOSE DE OPERACIONES</Accordion.Header>
                                <Accordion.Body style={{ padding: 0 }}>
                                    {
                                        tripType == 'Normal'
                                            ?
                                            <div className="row mx-0 my-1">
                                                <span><b>Precio Van:</b> {distancia} * {multKmsValue} <br /> = {costoPrimerDia} + {totalDiasCosto} = {currencyFormatMx(precioFinal)}</span> <hr />
                                                <span><b>Precio Sprinter:</b> {distancia} * {multKmsSpt} <br /> = {costoPrimerDiaSpt} + {diasSprinterGeneral} = {currencyFormatMx(precioFinalSpt)}</span>
                                            </div>
                                            :

                                            <div className="row mx-0 my-1">
                                                <span><b>Precio Van:</b> ({distancia} * {multKmsValue}) + {sumKmsValue} <br /> = {costoPrimerDia} + {totalDiasCosto} = {currencyFormatMx(precioFinal)}</span> <hr />
                                                <span><b>Precio Sprinter:</b> {distancia} * {multKmsSpt} <br /> = {costoPrimerDiaSpt} + {diasSprinterGeneral} = {currencyFormatMx(precioFinalSpt)}</span>
                                            </div>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* COSTES RENTAS */}
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>COSTES RENTAS</Accordion.Header>
                                <Accordion.Body style={{ padding: 0 }}>
                                    <div className="row mx-0 my-1">

                                        <div className="col-12">
                                            <span><b>Formula: </b> (kms * Mult) + Dias</span>
                                        </div>

                                        <div className="col-6">
                                            <span><b>Costes primer dia:</b></span><br />
                                            <span className=''>- <i>Entre semana:</i> kms * {multKmsValueEs}</span><br />
                                            <span className=''>- <i>Fin semana:</i> kms * {multKmsValueFs}</span><br />
                                        </div>

                                        <div className="col-6">
                                            <span><b>Costes dia extra:</b></span><br />
                                            <span className=''>- <i>Entre semana</i>: ${totalEs}</span><br />
                                            <span className=''>- <i>Fin de semana:</i> ${totalFs}</span>
                                        </div>
                                        <hr />


                                        <div className="col-6">
                                            <span className=''><b>Destino cercano <br /> menor a {special_costs[0].kms} kms:</b> <br /> - <i>(kms * {multKmsValue = special_costs[0].mult}) + {special_costs[0].sum}</i></span><br />
                                            {/* <span className=''><b>Destino lejano mayor a {special_costs[1].kms} kms:</b> <br /> kms * {multKmsValue = special_costs[1].mult} + {special_costs[1].sum}</span><br /> */}

                                        </div>
                                        <div className="col-6">
                                            {/* <span><b>Formula normal:</b> (kms * Mult) + Dias</span><br /> */}
                                            {/* <span className=''><b>Destino cercano menor a {special_costs[0].kms} kms:</b> <br /> kms * {multKmsValue = special_costs[0].mult} + {special_costs[0].sum}</span><br /> */}
                                            <span className=''><b>Destino lejano <br /> mayor a {special_costs[1].kms} kms:</b> <br /> - <i>(kms * {multKmsValue = special_costs[1].mult}) + {special_costs[1].sum}</i></span><br />
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        {/* MODAL IMPRIMIR PDF */}
                        <PrintRouteModal
                            show={show}
                            toggleModalPrint={toggleModalPrint}
                            precioFinal={precioFinal}
                            precioFinalSpt={precioFinalSpt}
                            startDate={startDate}
                            endDate={endDate}
                            sourceRef={sourceRef.current.value}
                            stopsQuote={stopsQuote}
                            destinationRef={destinationRef.current.value}
                        />

                    </div>
                ) : <h2 className='text-center mt-3'>Esperando cotizacion...</h2>}
            </div >


        </>
    )
}