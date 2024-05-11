import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Pagination } from 'react-bootstrap';
import { format } from 'date-fns/esm';
import es from 'date-fns/locale/es';

import { useCalendarStore, useUiStore } from '../../hooks';
import { CalendarModal } from '../calendar/CalendarModal';

export const CalendarList = () => {


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 15))); // FECHA POR DEFECTO
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortBy, setSortBy] = useState('start'); // Ordenar por defecto por nombre de cliente
    const [sortDirection, setSortDirection] = useState('asc'); // Dirección de ordenamiento por defecto ascendente

    const { events, setActiveEventInList, startLoadingEvent, activeEvent } = useCalendarStore();
    const { openViewModal } = useUiStore()

    // Función para manejar la selección de usuario po id
    const onSelect = async (event) => {
        setActiveEventInList(event);
        openViewModal()
    }

    const dateFormat = (date) => format(date, "dd'-'MMM'-'yyyy", { locale: es });
    const currencyFormatMx = (value) => parseFloat(value).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 });


    const handleStartDateChange = (date) => setStartDate(date);
    const handleEndDateChange = (date) => setEndDate(date)

    // Filtrar eventos según el criterio seleccionado
    const sortedEvents = events.filter(event => {
        // Filtrar eventos que están dentro del rango de fechas seleccionado
        return new Date(event.start) >= startDate.setHours(0,0,0,0) && new Date(event.end) <= endDate;
    }).sort((a, b) => {
        const factor = sortDirection === 'asc' ? 1 : -1;
        if (a[sortBy] < b[sortBy]) return -1 * factor;
        if (a[sortBy] > b[sortBy]) return 1 * factor;
        return 0;
    });

    const handleNextMonth = () => {
        const nextMonthStartDate = new Date();
        nextMonthStartDate.setMonth(nextMonthStartDate.getMonth());

        const nextMonthEndDate = new Date(nextMonthStartDate);
        nextMonthEndDate.setMonth(nextMonthEndDate.getMonth() + 1);

        setStartDate(nextMonthStartDate);
        setEndDate(nextMonthEndDate);
    };

    const handleNextWeek = () => {
        const currentDate = new Date();
        const nextWeekStartDate = new Date(currentDate);
        nextWeekStartDate.setDate(currentDate.getDate());

        const nextWeekEndDate = new Date(nextWeekStartDate);
        nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 7); // Agrega 7 días para obtener la fecha de fin de la próxima semana

        setStartDate(nextWeekStartDate);
        setEndDate(nextWeekEndDate);
    };

    const handleNextfortnight = () => {
        const currentDate = new Date();
        const nextWeekStartDate = new Date(currentDate);
        nextWeekStartDate.setDate(currentDate.getDate());

        const nextWeekEndDate = new Date(nextWeekStartDate);
        nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 15); // Agrega 7 días para obtener la fecha de fin de la próxima semana

        setStartDate(nextWeekStartDate);
        setEndDate(nextWeekEndDate);
    };

    // Cambia a la página seleccionada
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Cambia el criterio de ordenamiento y la dirección
    const handleSort = (criteria) => {
        if (sortBy === criteria) {
            // Si el mismo criterio se selecciona nuevamente, cambia la dirección de ordenamiento
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Si se selecciona un nuevo criterio, cambia el criterio y establece la dirección ascendente
            setSortBy(criteria);
            setSortDirection('asc');
        }
    };

    useEffect(() => { startLoadingEvent() }, []);

    // Calcula el índice del primer y último evento en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedEvents.slice(indexOfFirstItem, indexOfLastItem);

    // Calcula el número total de páginas
    const totalPaginationPages = Math.ceil(sortedEvents.length / itemsPerPage);

    return (
        <>
            <div className="row">

                {/* CAMPOS DE FECHAS */}
                <div className="mb-3 col-12" style={{ position: 'relative', zIndex: '10' }}>

                    <div className='d-flex justify-content-end align-items-center'>
                        <span>Fechas:&nbsp;&nbsp; </span>
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd/MM/yyyy"
                        />
                        <span className="mx-2">-</span>
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>

                {/* RANGOS DE FECHAS DEFINIDOS */}
                <div className='col-12 my-3'>
                    <div className='d-flex justify-content-end aling-items-center'>
                        <button
                            className=" ms-3 btn btn-outline-secondary"
                            onClick={handleNextWeek}>
                            Semana
                        </button>
                        <button
                            className=" ms-3 btn btn-outline-secondary"
                            onClick={handleNextfortnight}>
                            Quincena
                        </button>
                        <button
                            className=" ms-3 btn btn-outline-secondary"
                            onClick={handleNextMonth}>
                            Mes
                        </button>
                    </div>
                </div>

                {/* LISTA DE PROXIMOS VIAJES  */}
                <div className="table-wrapper" style={{ position: 'relative' }}>
                    <table className="table table-striped">
                        <thead className='table-dark'>
                            <tr className='text-start'>
                                <th scope='row' onClick={() => handleSort('start')} style={{ cursor: 'pointer' }}>
                                    {sortBy === 'start' && (
                                        <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    )}
                                    Fecha salida{' '}
                                </th>
                                <th scope='row' onClick={() => handleSort('end')} style={{ cursor: 'pointer' }}>
                                    {sortBy === 'end' && (
                                        <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    )}
                                    Fecha regreso{' '}
                                </th>
                                <th scope='row' onClick={() => handleSort('nameClient')} style={{ cursor: 'pointer' }}>
                                    {sortBy === 'nameClient' && (
                                        <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    )}
                                    Cliente{' '}
                                </th>
                                <th scope='row' onClick={() => handleSort('destination')} style={{ cursor: 'pointer' }}>
                                    {sortBy === 'destination' && (
                                        <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    )}
                                    Destino{' '}
                                </th>
                                <th scope='row' onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
                                    {sortBy === 'price' && (
                                        <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    )}
                                    Precio total{' '}
                                </th>
                                <th scope='row' onClick={() => handleSort('advance')} style={{ cursor: 'pointer' }}>
                                    {sortBy === 'advance' && (
                                        <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    )}
                                    Anticipo{' '}
                                </th>
                                <th scope='row'>Deuda</th>
                                <th>Vendedor</th>
                                <th scope='row'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((event) => (
                                <tr key={event.id} className='text-start'>
                                    <td>{dateFormat(event.start)}</td>
                                    <td>{dateFormat(event.end)}</td>
                                    <td className="col-3">{event.nameClient}</td>
                                    <td className="col-3">{event.destination}</td>
                                    <td>{currencyFormatMx(event.price)}</td>
                                    <td>{currencyFormatMx(event.advance)}</td>
                                    <td>{currencyFormatMx(event.price - event.advance)}</td>
                                    <td>{event.Usuario.name}</td>
                                    <td className='ps-1'>
                                        <button className="btn btn-primary btn-sm me-3" onClick={() => { onSelect(event.id) }}>
                                            <i className="fa-regular fa-file-lines"></i>
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINACION DE LISTA */}
                <Pagination>
                    {[...Array(totalPaginationPages).keys()].map((number) => (
                        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                            {number + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>

                {/* Modal */}
                <CalendarModal />
            </div>
        </>
    );
};
