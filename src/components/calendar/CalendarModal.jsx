import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'


import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';
import { PDF } from './PDF';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal, isModalViewOpen, closeViewModal, openDateModal } = useUiStore()
    const { activeEvent, starSavingEvent, StartDeletingEvent } = useCalendarStore()

    const [formSubmitted, setformSubmitted] = useState(false)
    // const [eventView, setEventView] = useState(false);


    const [formValues, setFormValues] = useState({
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
        Usuario: {
            name: ''
        }
        // title: '',
    })
    // console.log(formValues.notes.length);

    // console.log(formValues.start.toLocaleDateString());

    const departureClass = useMemo(() => {
        if (!formSubmitted || !formValues.departure) return '';  // Agregamos verificación de formValues.departure

        return (formValues.departure.trim().length > 0)
            ? ''
            : 'is-invalid';
    }, [formValues.departure, formSubmitted]);

    useEffect(() => {

        if (activeEvent !== null) {
            setFormValues({ ...activeEvent })
        }

    }, [activeEvent])

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
        setformSubmitted(true);

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
            Swal.fire('Campos obligatorios incompletos', 'Por favor, completa todos los campos obligatorios.', 'error');
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

        // Resto del código para guardar el evento y cerrar el modal
        await starSavingEvent(formValues);
        closeDateModal();
        setformSubmitted(false);
    };

    registerLocale('es', es);

    const dueValue = formValues.price - formValues.advance


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
                <h1>Editar reserva</h1>
                <hr />
                <form className="container" onSubmit={onSubmit}>

                    <div className="row mb-3">
                        <div className="col-3 d-flex align-items-center justify-content-center ">
                            <label htmlFor="transportNumber">#&nbsp;</label>
                            <input
                                type="text"
                                className="form-control"
                                id="transportNumber"
                                placeholder="Numero de Transportes"
                                name="transportNumber"
                                autoComplete="off"
                                value={formValues.transportNumber}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-7 d-flex align-items-center justify-content-center">
                            <label htmlFor="transport">Transporte:&nbsp;</label>
                            <input
                                type="text"
                                className={`form-control`}
                                placeholder="Tipo de Transporte"
                                name="transport"
                                autoComplete="off"
                                value={formValues.transport}
                                onChange={onInputChanged}
                            />
                        </div>
                        <div className="col-5 d-flex align-items-center justify-content-center">
                            <label htmlFor="seats">plazas:&nbsp;</label>
                            <input
                                type="number"
                                className={`form-control`}
                                placeholder="asientos"
                                name="seats"
                                autoComplete="off"
                                value={formValues.seats}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>


                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <label htmlFor="nameClient">Nombre:&nbsp;</label>
                            <input
                                type="text"
                                className={`form-control`}
                                placeholder="Nombre del cliente"
                                name="nameClient"
                                autoComplete="off"
                                value={formValues.nameClient}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <label htmlFor="phone">Telefono:&nbsp;</label>
                            <input
                                type="text"
                                className={`form-control`}
                                placeholder="Telefono del cliente"
                                name="phone"
                                autoComplete="off"
                                value={formValues.phone}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>

                    <hr />

                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <label htmlFor="departure">Salida:&nbsp;&nbsp;&nbsp;</label>
                            <input
                                type="text"
                                className={`form-control ${departureClass}`}
                                placeholder="Punto de salida"
                                name="departure"
                                autoComplete="off"
                                value={formValues.departure}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <label htmlFor="destination">Destino:&nbsp;</label>
                            <input
                                type="text"
                                className={`form-control`}
                                placeholder="Punto de destino"
                                name="destination"
                                autoComplete="off"
                                value={formValues.destination}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-start">
                            <label>Fecha y hora salida:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <DatePicker
                                selected={formValues.start}
                                onChange={(event) => onDateChanged(event, 'start')}
                                className='form-control'
                                dateFormat='Pp'
                                showTimeSelect
                                locale='es'
                                timeCaption='Hora'
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 d-flex align-items-center justify-content-start">
                            <label>Fecha y hora regreso:&nbsp;</label>
                            <DatePicker
                                minDate={formValues.start}
                                selected={formValues.end}
                                onChange={(event) => onDateChanged(event, 'end')}
                                className='form-control'
                                dateFormat='Pp'
                                showTimeSelect
                                locale='es'
                                timeCaption='Hora'
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
                            value={formValues.notes}
                            onChange={onInputChanged}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <hr />

                    <div className="row mb-4">
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <label htmlFor="price">Precio:&nbsp;</label>
                            <input
                                type="number"
                                className={`form-control`}
                                placeholder="$$$"
                                name="price"
                                autoComplete="off"
                                value={formValues.price}
                                onChange={onInputChanged}
                            />
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <label htmlFor="advance">Anticipo:&nbsp;</label>
                            <input
                                type="number"
                                className={`form-control`}
                                placeholder="$$$"
                                name="advance"
                                autoComplete="off"
                                value={formValues.advance}
                                onChange={onInputChanged}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex align-items-center justify-content-start">
                            <label>Saldo pendiente:&nbsp;</label>
                            <span>${dueValue}</span>
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
                        {/* &nbsp;
                        <button
                            type="button"
                            className="btn btn-link"
                            style={{ color: 'red' }}
                            onClick={() => {
                                StartDeletingEvent(activeEvent);
                                onCloseModal();
                            }}
                        >
                            <span> Eliminar</span>
                        </button> */}
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
                <h1>Reserva registrada</h1>
                <hr />

                <div className="container">
                    <div className="row">
                        <span className="col-12 mb-3"><b>#:&nbsp;</b>{formValues.transportNumber}</span>
                        <span className="col-6 mb-3"><b>Tipo de Transporte:&nbsp;</b>{formValues.transport}</span>
                        <span className="col-6"><b>Plazas:&nbsp;</b>{formValues.seats}</span>
                        <span className="col-12 mb-3"><b>Nombre del cliente:&nbsp;</b>{formValues.nameClient}</span>
                        <span className="col-12 mb-3"><b>Telefono del cliente:&nbsp;</b>{formValues.phone}</span>
                        <hr />
                        <span className="col-12 mb-3"><b>Salida:&nbsp;</b>{formValues.departure}</span>
                        <span className="col-12 mb-3"><b>Destino:&nbsp;</b>{formValues.destination}</span>
                        <span className="col-12 mb-3"><b>Fecha y hora salida:&nbsp;</b>{formValues.start.toLocaleString()}</span>
                        <span className="col-12 mb-3"><b>Fecha y hora salida:&nbsp;</b>{formValues.end.toLocaleString()}</span>
                        <span className="col-12"><b>Nota:&nbsp;</b>{formValues.notes}</span>
                        <hr />
                        <span className="col-6 mb-3"><b>Precio:&nbsp;</b>{formValues.price}</span>
                        <span className="col-6"><b>Anticipo:&nbsp;</b>{formValues.advance}</span>
                        <span className="col-12"><b>Saldo pendiente:&nbsp;</b>{dueValue}</span>
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
                                            transportNumber={formValues.transportNumber}
                                            transport={formValues.transport}
                                            seats={formValues.seats}
                                            nameClient={formValues.nameClient}
                                            phone={formValues.phone}
                                            departure={formValues.departure}
                                            destination={formValues.destination}
                                            dateStart={formValues.start.toLocaleDateString()}
                                            dateEnd={formValues.end.toLocaleDateString()}
                                            timeStart={formValues.start.toLocaleTimeString()}
                                            timeEnd={formValues.end.toLocaleTimeString()}
                                            notes={formValues.notes}
                                            price={formValues.price}
                                            advance={formValues.advance}
                                            due={dueValue}
                                        />} fileName='Pokemon.pdf'>
                                    {({ loading, url, error, blog }) => loading
                                        ? (<button className="btn btn-outline-primary">Cargando</button>)
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

