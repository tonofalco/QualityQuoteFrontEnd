import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer'

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';
import { PDF } from './PDF';
import { currencyFormatMx } from '../../helpers';

Modal.setAppElement('#root');

export const CalendarModal = () => {

    registerLocale('es', es);

    const { isDateModalOpen, closeDateModal, isModalViewOpen, closeViewModal, openDateModal, customStyles } = useUiStore()
    const { activeEvent, starSavingEvent, StartDeletingEvent } = useCalendarStore()
    const { user } = useAuthStore()

    const [formValues, setFormValues] = useState({
        Usuario: '',
        transportNumber: '',
        transport: '',
        seats: '',
        nameClient: '',
        phone: '',
        departure: '',
        destination: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        notes: '',
        price: '',
        advance: '',
        // title: '',
    })

    const { transportNumber, transport, seats, nameClient, phone, departure, destination, start, end, notes, price, advance, Usuario } = formValues

    useEffect(() => { activeEvent !== null && setFormValues({ ...activeEvent }) }, [activeEvent])

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onCloseModal = () => {
        // console.log('cerrando modal');
        closeDateModal()
    }

    const onCloseModalView = () => {
        // console.log('cerrando modal');
        closeViewModal()
    }

    const handleDeleteEvent = () => {
        // Mostrar confirmación con SweetAlert
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, proceder con la eliminación
                StartDeletingEvent(activeEvent);
                onCloseModal();
            }
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        // setformSubmitted(true);

        // Verificar campos obligatorios
        if (
            !formValues.transportNumber ||
            !formValues.transport ||
            !formValues.seats ||
            !formValues.nameClient ||
            !formValues.phone ||
            !formValues.departure ||
            !formValues.destination ||
            !formValues.price ||
            !formValues.advance
        ) {
            Swal.fire('Campos incompletos', 'Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisa las fechas ingresadas', 'error');
            return;
        }

        if (dueValue < 0) {
            Swal.fire('Saldo pendiente incorrecto', 'El anticipo no debe ser mayor al precio', 'error');
            return
        }
        await starSavingEvent(formValues);
        closeDateModal();

        if (activeEvent.Usuario.name == user.name || activeEvent.user.name == user.name) {
            Swal.fire({
                icon: 'success',
                title: '¡Guardado exitoso!',
                text: 'La reserva se ha guardado exitosamente.',
                showConfirmButton: false,
                timer: 1900
            });
        }
    };

    const namePDF = nameClient.split(' ')[1] ? `${nameClient.split(' ')[0]}_${nameClient.split(' ')[1]}` : `${nameClient.split(' ')[0]}`
    const destinationPDF = destination.split(' ')[1] ? `${destination.split(' ')[0]}_${destination.split(' ')[1]}` : `${destination.split(' ')[0]}`
    const fileName = `${namePDF} - ${transport} - ${destinationPDF} - ${start.toLocaleDateString()}`

    const dueValue = price - advance;
    const formattedPrice = currencyFormatMx(price);
    const formattedAdvance = currencyFormatMx(advance);
    const formattedDue = currencyFormatMx(dueValue);


    return (
        <>
            {/* Crear y Actualizar evento */}
            <Modal
                isOpen={isDateModalOpen}
                onRequestClose={onCloseModal}
                style={customStyles}
                className='modal'
                overlayClassName='modal-fondo'
                closeTimeoutMS={200}
            >
                {/* {formValues.Usuario.name.length >= 1 ? <h1>Editar reserva</h1> : <h1>Crear reserva</h1> } */}

                <h1>Formulario reserva</h1>
                <hr />
                <form className="container" onSubmit={onSubmit}>

                    <div className="row mb-3">
                        <div className="col-7 d-flex align-items-center justify-content-center ">
                            <label htmlFor="transportNumber">Cantidad&nbsp;de&nbsp;transportes*:&nbsp;</label>
                            <input
                                type="text"
                                className="form-control"
                                id="transportNumber"
                                placeholder="Num. de Transportes"
                                name="transportNumber"
                                autoComplete="off"
                                value={transportNumber}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-7 d-flex align-items-center justify-content-center">
                            <label htmlFor="transport">Transporte*:&nbsp;</label>
                            <input
                                type="text"
                                className={`form-control`}
                                placeholder="Tipo de Transporte"
                                name="transport"
                                autoComplete="off"
                                value={transport}
                                onChange={onInputChanged}
                            />
                        </div>
                        <div className="col-5 d-flex align-items-center justify-content-center">
                            <label htmlFor="seats">plazas*:&nbsp;</label>
                            <input
                                type="number"
                                className={`form-control`}
                                placeholder="asientos"
                                name="seats"
                                autoComplete="off"
                                value={seats}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>


                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <label htmlFor="nameClient">Nombre*:&nbsp;</label>
                            <input
                                type="text"
                                className={`form-control`}
                                placeholder="Nombre del cliente"
                                name="nameClient"
                                autoComplete="off"
                                value={nameClient}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <label htmlFor="phone">Telefono*:&nbsp;</label>
                            <input
                                type="text"
                                className={`form-control`}
                                placeholder="Telefono del cliente"
                                name="phone"
                                autoComplete="off"
                                value={phone}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>

                    <hr />

                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <label htmlFor="departure">Salida*:&nbsp;&nbsp;&nbsp;</label>
                            <input
                                type="text"
                                className={`form-control `}
                                placeholder="Punto de salida"
                                name="departure"
                                autoComplete="off"
                                value={departure}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <label htmlFor="destination">Destino*:&nbsp;</label>
                            <input
                                type="text"
                                className={`form-control`}
                                placeholder="Punto de destino"
                                name="destination"
                                autoComplete="off"
                                value={destination}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-start">
                            <label>Fecha y hora salida*:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <DatePicker
                                selected={start}
                                onChange={(event) => onDateChanged(event, 'start')}
                                className='form-control'
                                dateFormat='Pp'
                                showTimeSelect
                                locale='es'
                                timeCaption='Hora'
                                timeIntervals={15}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-start">
                            <label>Fecha y hora regreso*:&nbsp;</label>
                            <DatePicker
                                minDate={start}
                                selected={end}
                                onChange={(event) => onDateChanged(event, 'end')}
                                className='form-control'
                                dateFormat='Pp'
                                showTimeSelect
                                locale='es'
                                timeCaption='Hora'
                                timeIntervals={15}
                            />
                        </div>
                    </div>

                    <div className="form-group mb-2">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="2"
                            name="notes"
                            value={notes}
                            onChange={onInputChanged}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <hr />

                    <div className="row mb-4">
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <label htmlFor="price">Precio*:&nbsp;</label>
                            <input
                                type="number"
                                className={`form-control`}
                                placeholder="$$$"
                                name="price"
                                autoComplete="off"
                                value={price}
                                onChange={onInputChanged}
                            />
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <label htmlFor="advance">Anticipo*:&nbsp;</label>
                            <input
                                type="number"
                                className={`form-control`}
                                placeholder="$$$"
                                name="advance"
                                autoComplete="off"
                                value={advance}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex align-items-center justify-content-start">
                            <label>Saldo pendiente:&nbsp;</label>
                            <span>{formattedDue}</span>
                        </div>
                    </div>

                    <hr />

                    <div className='d-flex justify-content-between'>
                        <button
                            type="submit"
                            className="btn btn-outline-success btn-block"
                        >
                            <i className="far fa-save"></i>
                            <span> Guardar</span>
                        </button>
                    </div>

                </form>
            </Modal>

            {/* Visualizar evento */}
            <Modal
                isOpen={isModalViewOpen}
                onRequestClose={onCloseModalView}
                style={customStyles}
                className='modal'
                overlayClassName='modal-fondo'
                closeTimeoutMS={200}
            >
                <h1 className='text-center'>Reserva registrada</h1>
                <h6 className='text-center'>Creada por {Usuario.name}</h6>
                <hr />

                <div className="container">
                    <div className="row">
                        <span className="col-12 mb-3"><b>Trasnportes solicitados:&nbsp;</b>{transportNumber}</span>
                        <span className="col-6 mb-3"><b>Tipo de Transporte:&nbsp;</b>{transport}</span>
                        <span className="col-6"><b>Plazas:&nbsp;</b>{seats}</span>
                        <span className="col-12 mb-3"><b>Nombre del cliente:&nbsp;</b>{nameClient}</span>
                        <span className="col-12 mb-3"><b>Telefono del cliente:&nbsp;</b>{phone}</span>
                        <hr />
                        <span className="col-12 mb-3"><b>Salida:&nbsp;</b>{departure}</span>
                        <span className="col-12 mb-3"><b>Destino:&nbsp;</b>{destination}</span>
                        <span className="col-12 mb-3"><b>Fecha y hora de salida:&nbsp;</b>{start.toLocaleString()}</span>
                        <span className="col-12 mb-3"><b>Fecha y hora de regreso:&nbsp;</b>{end.toLocaleString()}</span>
                        <span className="col-12"><b>Nota:&nbsp;</b>{notes}</span>
                        <hr />
                        <span className="col-6 mb-3"><b>Precio:&nbsp;</b>{formattedPrice}</span>
                        <span className="col-6"><b>Anticipo:&nbsp;</b>{formattedAdvance}</span>
                        <span className="col-12"><b>Saldo pendiente:&nbsp;</b>{formattedDue}</span>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            <div className="d-flex">
                                <button
                                    type="button"
                                    className="btn btn-outline-warning me-2"
                                    onClick={() => {
                                        onCloseModalView();
                                        openDateModal();
                                    }}
                                >
                                    Editar
                                </button>
                                <PDFDownloadLink
                                    document={
                                        <PDF
                                            transportNumber={transportNumber}
                                            transport={transport}
                                            seats={seats}
                                            nameClient={nameClient}
                                            phone={phone}
                                            departure={departure}
                                            destination={destination}
                                            dateStart={start.toLocaleDateString()}
                                            dateEnd={end.toLocaleDateString()}
                                            timeStart={start.toLocaleTimeString()}
                                            timeEnd={end.toLocaleTimeString()}
                                            notes={notes}
                                            price={formattedPrice}
                                            advance={formattedAdvance}
                                            due={formattedDue}
                                        />} fileName={fileName}>
                                    {({ loading }) => loading
                                        ? (<button className="btn btn-outline-primary" disabled>Cargando</button>)
                                        : (<button className="btn btn-outline-primary">Descargar PDF</button>)
                                    }
                                </PDFDownloadLink>
                            </div>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-sm btn-link"
                                style={{ color: 'red' }}
                                onClick={() => {
                                    handleDeleteEvent();
                                    onCloseModalView();
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>

            </Modal>
        </>
    )
}

