import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Pagination } from 'react-bootstrap';
import { format } from 'date-fns/esm';
import es from 'date-fns/locale/es';

import { useCalendarStore } from '../../hooks';

export const CalendarList = () => {

    const [startDate, setStartDate] = useState(new Date()); // Por defecto, la fecha de inicio es hoy
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 15))); // Por defecto, la fecha de fin es dentro de un mes
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortBy, setSortBy] = useState('start'); // Ordenar por defecto por nombre de cliente
    const [sortDirection, setSortDirection] = useState('asc'); // Dirección de ordenamiento por defecto ascendente

    const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();

    useEffect(() => {
        startLoadingEvent();
    }, []);

    const fechaInicio = (date) => {
        return format(date, "dd'-'MMM'-'yyyy", { locale: es });
    };

    // Manejador de cambios para la fecha de inicio
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    // Manejador de cambios para la fecha de fin
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    // Ordenar eventos según el criterio seleccionado y la dirección
    const sortedEvents = events.filter(event => {
        // Filtrar eventos que están dentro del rango de fechas seleccionado
        return new Date(event.start) >= startDate && new Date(event.end) <= endDate;
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

    // Calcula el índice del primer y último evento en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedEvents.slice(indexOfFirstItem, indexOfLastItem);

    // Calcula el número total de páginas
    const totalPaginationPages = Math.ceil(sortedEvents.length / itemsPerPage);

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

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="">
                        <div className="mb-3 col-12">
                            <div className='d-flex justify-content-end aling-items-center'>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    style={{ zIndex: '10' }}
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
                                    style={{ zIndex: '10' }}
                                />
                            </div>
                        </div>

                        <div className='col-12 mt-3'>
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

                        <table className="table table-auto">
                            <thead>
                                <tr className='text-start'>
                                    <th scope='row' onClick={() => handleSort('start')} style={{ cursor: 'pointer' }}>
                                        Fecha salida{' '}
                                        {sortBy === 'start' && (
                                            <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                        )}
                                    </th>
                                    <th scope='row' onClick={() => handleSort('end')} style={{ cursor: 'pointer' }}>
                                        Fecha regreso{' '}
                                        {sortBy === 'end' && (
                                            <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                        )}
                                    </th>
                                    <th scope='row' onClick={() => handleSort('nameClient')} style={{ cursor: 'pointer' }}>
                                        Cliente{' '}
                                        {sortBy === 'nameClient' && (
                                            <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                        )}
                                    </th>
                                    <th scope='row' onClick={() => handleSort('destination')} style={{ cursor: 'pointer' }}>
                                        Destino{' '}
                                        {sortBy === 'destination' && (
                                            <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                        )}
                                    </th>
                                    <th scope='row' onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
                                        Precio total{' '}
                                        {sortBy === 'price' && (
                                            <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                        )}
                                    </th>
                                    <th scope='row' onClick={() => handleSort('advance')} style={{ cursor: 'pointer' }}>
                                        Anticipo{' '}
                                        {sortBy === 'advance' && (
                                            <i className={`fas ${sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                        )}
                                    </th>
                                    <th scope='row'>Deuda</th>
                                    <th scope='row'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((event) => (
                                    <tr key={event.id} className='text-center'>
                                        <td>{fechaInicio(event.start)}</td>
                                        <td>{fechaInicio(event.end)}</td>
                                        <td className="col-3">{event.nameClient}</td>
                                        <td className="col-3">{event.destination}</td>
                                        <td>{event.price}</td>
                                        <td>{event.advance}</td>
                                        <td>{event.price - event.advance}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm me-3">
                                                <i className="fa-regular fa-file-lines"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination>
                            {[...Array(totalPaginationPages).keys()].map((number) => (
                                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    );
};
