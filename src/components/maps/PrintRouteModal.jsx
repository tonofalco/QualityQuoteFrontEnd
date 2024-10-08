
import { useState } from 'react'
import Modal from 'react-modal'
import { PDFDownloadLink, pdf } from '@react-pdf/renderer'

import { format } from 'date-fns/esm';
import es from 'date-fns/locale/es';

// import { customDateFormat } from '../../helpers'
import { useForm, useUiStore } from "../../hooks"
import { QuotePDF } from './QuotePDF';
import { saveAs } from 'file-saver';


export const PrintRouteModal = ({ show, toggleModalPrint, precioFinal, precioFinalSpt, sourceRef, stopsQuote, destinationRef, startDate, endDate }) => {

    Modal.setAppElement('#root');



    const { customStyles } = useUiStore()

    const [formQuote, setFormQuote] = useState({
        recipient: 'A quien corresponda',
        vanPrice: precioFinal,
        sptPrice: precioFinalSpt,
    })

    const { recipient, vanPrice, sptPrice, onInputChange: onRegisterInputChange } = useForm(formQuote)


    //Funcion para validar campos
    const areFieldsFilledCreate = () => {
        return (
            recipient.trim() !== '' &&
            vanPrice.toString().trim() !== '' &&
            sptPrice.toString().trim() !== ''
        );
    };

    //Funcion para Visualizar PDF con datos 
    const handleOpenPDF = async () => {
        const blob = await pdf(
            <QuotePDF
                recipient={recipient}
                vanPrice={vanPrice}
                formattedStartDay={formattedStartDay}
                formattedEndDay={formattedEndDay}
                sourceRef={sourceRef}
                stopsQuote={stopsQuote}
                destinationRef={destinationRef}
            />
        ).toBlob();

        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    //Funcion para Crear PDF con datos
    const handleFormQuote = async (e) => {
        e.preventDefault();
        if (!areFieldsFilledCreate()) {
            Swal.fire('Campos vacíos', 'Por favor, completa todos los campos.', 'warning');
        }
        else {
            await setFormQuote({
                recipient: recipient,
                vanPrice: vanPrice,
                sptPrice: sptPrice
            });
        }
    };

    const fileNamePDF = `Cotizacion - ${recipient} - ${stopsQuote}`

    const formattedStartDay = format(startDate, "dd 'de' MMMM 'del' yyyy", { locale: es })
    const formattedEndDay = format(endDate, "dd 'de' MMMM 'del' yyyy", { locale: es })



    return (
        <Modal
            isOpen={show}
            onRequestClose={toggleModalPrint}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1 className='text-center'>Formulario Cotizacion </h1>
            <hr />

            <form onSubmit={handleFormQuote} className=" container mt-3">

                <div className="col-12">
                    <span>Destinatario</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Destinatario"
                        name='recipient'
                        value={recipient}
                        onChange={onRegisterInputChange}
                    />
                </div>

                <hr />

                <h3>Itinerario</h3>
                <p className='text-center'>Del {formattedStartDay} al {formattedEndDay}</p>

                <ol className='list-group list-group-numbered'>
                    <li className='list-group-item'>{sourceRef}</li>
                    {stopsQuote.map((stop, index) => <li key={index} className='list-group-item'>{stop}</li>)}
                    <li className='list-group-item'>{destinationRef}</li>
                </ol>



                <hr />

                <div className="row ">
                    <div className="col-6 mt-3">
                        <span>Precio Final Van</span>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Precio final Van"
                            name='vanPrice'
                            value={vanPrice}
                            onChange={onRegisterInputChange}
                        />
                    </div>

                    <div className="col-6 mt-3">
                        <span>Precio Final Sprinter</span>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Precio final Van"
                            name='sptPrice'
                            value={sptPrice}
                            onChange={onRegisterInputChange}
                        />
                    </div>
                </div>

                <hr />
                <div className="col-12 mt-3 d-flex justify-content-end">
                    <button type="button" className="btn btn-outline-primary me-3" onClick={handleOpenPDF}>
                        Visualizar PDF
                    </button>
                    <PDFDownloadLink
                        document={
                            <QuotePDF
                                recipient={recipient}
                                vanPrice={vanPrice}
                                formattedStartDay={formattedStartDay}
                                formattedEndDay={formattedEndDay}
                                sourceRef={sourceRef}
                                stopsQuote={stopsQuote}
                                destinationRef={destinationRef}
                            />
                        }
                        fileName={fileNamePDF}
                    >
                        {({ loading }) =>
                            loading ? (
                                <button type="button" className="btn btn-outline-success" disabled>
                                    Cargando
                                </button>
                            ) : (
                                <button type="button" className="btn btn-outline-success">
                                    Descargar PDF
                                </button>
                            )
                        }
                    </PDFDownloadLink>
                </div>
            </form>
            
        </Modal>
    )
}
