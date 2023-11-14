import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

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

    const { isDateModalOpen, closeDateModal } = useUiStore()
    const { activeEvent, starSavingEvent, StartDeletingEvent } = useCalendarStore()

    const [formSubmitted, setformSubmitted] = useState(false)


    const [formValues, setFormValues] = useState({
        transport: '',
        seats: '',
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    })

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid'
    }, [formValues.title, formSubmitted])

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
    const onSubmit = async (event) => {
        event.preventDefault()
        setformSubmitted(true)

        const difference = differenceInSeconds(formValues.end, formValues.start)
        // console.log({ difference })

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return
        }

        if (formValues.title.length <= 0) return

        console.log(formValues)

        //TODO:
        await starSavingEvent(formValues)
        //cerrar modal
        closeDateModal()
        setformSubmitted(false)
        //remover errores en pantalla
    }

    registerLocale('es', es);


    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1>Nueva reserva</h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="row">
                    <div className="col-6">
                            <label>Transporte</label>
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
                    <div className="col-6">
                            <label>Plazas</label>
                            <input
                                type="number"
                                className={`form-control`}
                                placeholder="Plazas"
                                name="seats"
                                autoComplete="off"
                                value={formValues.seats}
                                onChange={onInputChanged}
                            />
                    </div>
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
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

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
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

                <hr />
                <div className="form-group mb-2">
                    <label>Destino</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Punto de destino"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">descripción del viaje</small> */}
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Descripcion"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <div className='d-flex justify-content-between'>
                    <button
                        type="submit"
                        className="btn btn-outline-success btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                    &nbsp;
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
                    </button>
                </div>

            </form>
        </Modal>
    )
}

