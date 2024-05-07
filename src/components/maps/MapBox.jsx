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

    // console.log(startDate);
    // console.log(stops.length);
    // console.log(autocompleteRef);
    // console.log(setMapKey);

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
                        <div className="input-group"> {/* Contenedor para input y botón */}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese una ruta"
                                value={currentStop}
                                // ref={autocompleteRef}
                                onChange={(e) => setCurrentStop(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    type={stops.length <= 1 ? "button" : "submit"}
                                    className="btn btn-success"
                                    onClick={() => {
                                        addStop()
                                        // calculateRoute() // Llama a la segunda función después de la primera
                                    }}
                                ><i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </Autocomplete>

                    <ul className="border border-black rounded" style={{ paddingLeft: 10 }}> {/* Lista de paradas */}
                        {stops.map((stop, index) => (

                            <li key={index} className="d-flex justify-content-between align-items-center my-2">

                                <span className='hidden-text'>{stop}</span>
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        removeStop(index);       // Llama a la primera función
                                        // calculateRoute(); // Llama a la segunda función después de la primera
                                    }} >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <Autocomplete>
                        {/* <input className='form-control mb-3' type='text' placeholder='Ingresa destino' ref={destinationRef} /> */}
                        <select
                            type='text'
                            className='form-select mb-3'
                            placeholder='Ingresa origen'
                            ref={destinationRef}
                        ><option value="" disabled>Seleccione destino</option>
                            {routesOptions.map((route) => (
                                <option value={route} key={route}>{route}</option>
                            ))}
                        </select>
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