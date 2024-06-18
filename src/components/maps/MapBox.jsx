import { Autocomplete } from '@react-google-maps/api';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/maps.css';


export const MapBox = (
    {
        calculateRoute,
        sourceRef,
        destinationRef,
        setDirectionsResponse,
        setDistance,
        setDuration,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        stops,
        setStops,
        currentStop,
        setCurrentStop,
        addStop,
        removeStop,
        autocompleteRef,
        setMapKey
    }) => {

    // console.log(startDate);
    // console.log(stops.length);
    // console.log(autocompleteRef);
    // console.log(setMapKey);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedStops = Array.from(stops);
        const [movedStop] = reorderedStops.splice(result.source.index, 1);
        reorderedStops.splice(result.destination.index, 0, movedStop);

        setStops(reorderedStops);
    };

    const clearRoute = () => {
        setDirectionsResponse(null);
        setDistance('');
        setDuration('');
        setStartDate(null); // Reset start date
        setEndDate(null);   // Reset end date
        setStops([])
        // autocompleteRef.current.setVal('');
        sourceRef.current.value = ''; // Clear source input
        destinationRef.current.value = ''; // Clear destination input
        setMapKey((prevKey) => prevKey + 1); // Incrementar mapKey para forzar el desmontaje y remontaje del componente GoogleMap
    };

    const routesOptions = ['Chilpancingo de los Bravo'];

    registerLocale('es', es);

    return (
        <form onSubmit={calculateRoute}>
            <div className='row map-box d-flex justify-content-between '>

                <div className=' col-12'> {/* Ruta y fechas */}
                    <h5>Ruta del viaje</h5>
                    {/* <Autocomplete className='mb-3'> */}
                    <select
                        type='text'
                        className='form-select mb-3'
                        placeholder='Ingresa origen'
                        ref={sourceRef}
                    ><option value="" disabled>Seleccione origen</option>
                        {routesOptions.map((route) => (
                            <option value={route} key={route}>{route}</option>
                        ))}
                    </select>
                    {/* </Autocomplete> */}

                    <Autocomplete
                        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                        onPlaceSelected={(place) => {
                            if (place.name) {
                                setCurrentStop(place.name);
                            }
                        }}
                    >
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese una parada"
                                value={currentStop}
                                onChange={(e) => setCurrentStop(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={addStop}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </Autocomplete>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="stops">
                            {(provided) => (
                                <ul className="border border-black rounded" style={{ paddingLeft: 10 }} {...provided.droppableProps} ref={provided.innerRef}>
                                    {stops.map((stop, index) => (
                                        <Draggable key={`${stop}-${index}`} draggableId={`${stop}-${index}`} index={index}>
                                            {(provided) => (
                                                <li className="d-flex justify-content-between align-items-center my-2"
                                                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <span className='hidden-text'>{stop}</span>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => removeStop(index)}
                                                    >
                                                        <i className="fa-solid fa-minus"></i>
                                                    </button>
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>


                    {/* <input className='form-control mb-3' type='text' placeholder='Ingresa destino' ref={destinationRef} /> */}
                    <select
                        type='text'
                        className='form-select mb-3'
                        placeholder='Ingresa destino'
                        ref={destinationRef}
                    ><option value="" disabled>Seleccione destino</option>
                        {routesOptions.map((route) => (
                            <option value={route} key={route}>{route}</option>
                        ))}
                    </select>

                    <hr />

                    <h5>Fechas del viaje</h5>

                    <DatePicker
                        className='form-control mb-3'
                        placeholderText='Fecha inicio'
                        selected={startDate} onChange={date => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                    />

                    <DatePicker
                        className='form-control'
                        placeholderText='Fecha regreso'
                        selected={endDate} onChange={date => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                        minDate={startDate || new Date()}
                    />
                </div>

                <div className='col-12 d-flex justify-content-between mt-3'> {/* acciones btn */}
                    <button className='btn btn-danger' type='button' onClick={clearRoute}><i className="fa-solid fa-x"></i></button>
                    <button className='btn btn-primary' type='submit'><i className="fa-solid fa-turn-up fa-rotate-90"></i></button>
                </div>

            </div>
        </form>
    );
};