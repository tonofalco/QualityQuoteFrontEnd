import { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useConfigExtraDayStore, useConfigKmsTableStore } from '../../hooks';
import { QuotePDF } from './QuotePDF';



export const RoutesCalculator = ({ sourceRef, destinationRef, stops, distance, duration, directionsResponse, totalDays, weekdaysCount, weekendCount, multKms, startDate, endDate }) => {

    // console.log(stops);

    const { costsValue, costsValueWeekend } = useConfigKmsTableStore();
    const { sumaCostoDiaExtraEs, sumaCostoDiaExtraFs, totalEs, totalFs, costs_extraDay } = useConfigExtraDayStore()

    const { gasoline, salary, booths, maintenance, utility, supplement } = costsValue
    const { gasoline: gasolineEs, salary: salaryEs, booths: boothsEs, maintenance: maintenanceEs, utility: utilityEs, supplement: supplementEs } = costsValueWeekend

    // Cargamos la informacion de los costos
    useEffect(() => { sumaCostoDiaExtraEs(), sumaCostoDiaExtraFs() }, [costs_extraDay]);

    const calcularCosto = (dias, costoPorDia) => (dias * costoPorDia) <= 0 ? 0 : (dias * costoPorDia);
    const calcularKms = (gasoline, salary, maintenance, booths, utility, supplement) => distancia <= 400 ? gasoline + salary + maintenance + booths + utility + supplement : gasoline + salary + maintenance + booths + utility;
    const currencyFormatMx = (value) => parseFloat(value).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    //CALCULO DISTANCIA TOTAL 
    const distancia = Math.round(parseFloat(distance))

    //CALCULO MULTKMS PRIMER DIA
    const multKmsValueEs = calcularKms(gasolineEs, salaryEs, boothsEs, maintenanceEs, utilityEs, supplementEs)
    const multKmsValueFs = calcularKms(gasoline, salary, maintenance, booths, utility, supplement)
    const multKmsValue = (multKms ? multKmsValueEs : multKmsValueFs)

    // console.log(multKms);
    // console.log(multKmsValue);
    // console.log(multKmsValueEs);
    // console.log(multKmsValueFs);


    //CALCULOS POR DIAS EXTRAS
    const diasEntreSemanaCosto = calcularCosto(weekdaysCount, totalEs);
    const diasFinSemanaCosto = calcularCosto(weekendCount, totalFs);
    const totalDiasCosto = diasEntreSemanaCosto + diasFinSemanaCosto

    //CALCULOS COSTO Y PRECIO VAN Y SPRINTER
    let plazas = 15
    const costoPrimerDia = (distancia * multKmsValue)
    const precioFinal = Math.round(parseFloat(costoPrimerDia) + parseFloat(totalDiasCosto))
    const formatMX_PrecioTotal = currencyFormatMx(precioFinal)
    const formatMX_PrecioUnitario = currencyFormatMx(precioFinal / plazas)

    let plazasSpt = 18
    const multKmsSpt = multKmsValue + 3
    const costoTotalSpt = (distancia * multKmsSpt)
    const precioTotalSpt = Math.round(parseFloat(costoTotalSpt) + parseFloat(totalDiasCosto))
    const formatMX_PrecioTotalSpt = currencyFormatMx(precioTotalSpt)
    const formatMX_PrecioUnitarioSpt = currencyFormatMx(precioTotalSpt / plazasSpt)


    return (
        <>
            <div className='me-3 ms-4 ms-md-0 mb-3' id='titulo'>

                {directionsResponse ? (
                    <div>
                        <hr />
                        {/* PRECIOS FINALES */}
                        <h4 className='text-muted'>PRECIOS ESTIMADOS:</h4>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Transporte</th>
                                    <th scope="col">Precio Final</th>
                                    <th scope="col">Pax</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{plazas}</th>
                                    <td>Van</td>
                                    <td className='bg-success text-light'><b>{formatMX_PrecioTotal}</b></td>
                                    <td>{formatMX_PrecioUnitario}</td>
                                </tr>
                                <tr>
                                    <th scope="row">{plazasSpt}</th>
                                    <td>Sprinter</td>
                                    <td className='bg-success text-light'><b>{formatMX_PrecioTotalSpt}</b></td>
                                    <td>{formatMX_PrecioUnitarioSpt}</td>
                                </tr>
                            </tbody>
                        </table>
                        <hr />
                        {/* INFORMACION GENERAL DEL VIAJE */}
                        <h4 className='text-muted'>DATOS DE LA COTIZACION:</h4>
                        <div className="row  mb-3">
                            <div className="col-12">
                                <span><b>Distancia total: </b>{distancia} kms</span><br />
                                <span><b>Duracion del viaje: </b>{totalDays} d</span><br />
                                <span><b>Tiempo total de manejo: </b>{duration}</span><br />
                            </div>
                        </div>
                        {/* INFORMACION DESGLOSADA  DEL VIAJE */}
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>RUTA CALCULADA</Accordion.Header>
                                <Accordion.Body style={{ padding: 0 }}>
                                    <br />
                                    <div className="row mx-1 ">
                                        <div className="col-12">
                                            <ol className='list-group list-group-numbered'>
                                                <li className='list-group-item'>{sourceRef.current.value}</li>
                                                {stops.map((stop, index) => <li key={index} className='list-group-item'>{stop}</li>)}
                                                <li className='list-group-item'>{destinationRef.current.value}</li>
                                            </ol>

                                            <div className='d-flex justify-content-end mt-3'>
                                                <PDFDownloadLink
                                                    document={
                                                        <QuotePDF
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            sourceRef={sourceRef.current.value} 
                                                            stops={stops}
                                                            destinationRef={destinationRef.current.value}
                                                            precioVan={formatMX_PrecioTotal}
                                                        />} fileName={'Cotizacion_'}>
                                                    {({ loading }) => loading
                                                        ? (<button className="btn btn-outline-primary" disabled>Cargando</button>)
                                                        : (<button className="btn btn-outline-primary">Descargar PDF</button>)
                                                    }
                                                </PDFDownloadLink>
                                            </div>

                                        </div>
                                    </div>
                                    <br />
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>DESGLOSE DE OPERACIONES</Accordion.Header>
                                <Accordion.Body style={{ padding: 0 }}>
                                    <div className="row mx-0 my-1">

                                        <div className="col-6">
                                            <span><b>Costes primer dia:</b></span><br />
                                            <span className=''>- <i>Entre semana:</i> kms * {multKmsValueEs}</span><br />
                                            <span className=''>- <i>Fin semana:</i> kms * {multKmsValueFs}</span><br />
                                        </div>

                                        <div className="col-6">
                                            <span><b>Costes Dia extra:</b></span><br />
                                            <span className=''>- <i>Entre semana</i>: ${totalEs}</span><br />
                                            <span className=''>- <i>Fin de semana:</i> ${totalFs}</span>
                                        </div>
                                        <hr />
                                        <div className="col-12">
                                            <span><b>Dias extras entre semana:</b> {weekdaysCount} * {totalEs} = ${diasEntreSemanaCosto}</span><br />
                                            <span><b>Dias extras fin de semana:</b> {weekendCount} * {totalFs} = ${diasFinSemanaCosto}</span><br />
                                            <span><b>Total dias extras:</b> {diasEntreSemanaCosto} + {diasFinSemanaCosto} = ${totalDiasCosto} </span>
                                        </div>
                                        <hr />
                                        <div className="col-12">
                                            <span><b>Formula:</b> (kms * mult) + dias</span><br />
                                            <span><b>precio final Van:</b> {distancia} * {multKmsValue} = {costoPrimerDia} + {totalDiasCosto} = {formatMX_PrecioTotal}</span><br />
                                            <span><b>precio final Spt:</b> {distancia} * {multKmsValue} = {costoTotalSpt} + {totalDiasCosto} = {formatMX_PrecioTotalSpt}</span>
                                        </div>

                                        {/* <div className="col-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <p>
                                                        <b>Formula:</b>
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
                                                        {distancia} * {multKmsValue} = {Math.round(costoPrimerDia)}
                                                        <br />
                                                        {Math.round(costoPrimerDia)} + {totalDiasCosto} = {formatMX_PrecioTotal}
                                                        <br />
                                                        {precioFinal} / {plazas} = {formatMX_PrecioUnitario}
                                                    </p>
                                                </div>
                                                <div className="col-12 mb-1">
                                                    <b>Sprinter:</b>
                                                    <br />
                                                    {distancia} * {multKmsSpt} = {Math.round(costoTotalSpt)}
                                                    <br />
                                                    {Math.round(costoTotalSpt)} + {totalDiasCosto} = {formatMX_PrecioTotalSpt}
                                                    <br />
                                                    {precioFinal} / {plazasSpt} = {formatMX_PrecioUnitarioSpt}
                                                </div>
                                            </div>
                                        </div> */}

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