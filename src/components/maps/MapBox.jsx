import { Autocomplete } from '@react-google-maps/api';
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

    const clearRoute = () => {
        setDirectionsResponse(null);
        setDistance('');
        setDuration('');
        setStartDate(null); // Reset start date
        setEndDate(null);   // Reset end date
        setStops([])
        sourceRef.current.value = ''; // Clear source input
        destinationRef.current.value = ''; // Clear destination input
        setMapKey((prevKey) => prevKey + 1); // Incrementar mapKey para forzar el desmontaje y remontaje del componente GoogleMap

    };

    registerLocale('es', es);

    return (
        <form onSubmit={calculateRoute}>
            <div className='row map-box d-flex justify-content-between '>

                <div className=' col-12'> {/* Ruta y fechas */}
                    <h5>Ruta del viaje</h5>
                    <Autocomplete className='mb-3'>
                        <input className='form-control' type='text' placeholder='Ingresa origen' ref={sourceRef} />
                    </Autocomplete>

                    <Autocomplete
                        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                        onPlaceSelected={(place) => {
                            if (place.formatted_address) {
                                setCurrentStop(place.formatted_address);
                            }
                        }}
                    >
                        <div className="input-group"> {/* Contenedor para input y botón */}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Parada (opcional)"
                                value={currentStop}
                                onChange={(e) => setCurrentStop(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        addStop();
                                    }}
                                ><i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </Autocomplete>

                    <ul className="border border-black rounded"> {/* Lista de paradas */}
                        {stops.map((stop, index) => (

                            <li key={index} className=" d-flex justify-content-between align-items-center my-2">

                                {stop}
                                <button className="btn btn-danger"
                                    onClick={() => {
                                        removeStop(index);       // Llama a la primera función
                                        clearRoute(); // Llama a la segunda función después de la primera
                                    }} >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <Autocomplete>
                        <input className='form-control mb-3' type='text' placeholder='Ingresa destino' ref={destinationRef} />
                    </Autocomplete>

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