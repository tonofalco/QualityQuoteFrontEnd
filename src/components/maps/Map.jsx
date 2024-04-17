import { useState, useRef, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { eachDayOfInterval, getDay } from 'date-fns';
import { AppProvider } from '../../context/AppContext';
import { MapBox, RoutesCalculator, GoogleMaps } from '../';
import Swal from 'sweetalert2'
import { useConfigKmsTableStore } from '../../hooks';


const libraries = ['places'];

export const Map = () => {

    const { costsValue, costsValueWeekend, startLoadingFsCosts, startLoadingEsCosts, loading } = useConfigKmsTableStore();

    const [mapKey, setMapKey] = useState(0); // Nuevo estado mapKey
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalDays, setTotalDays] = useState(0);
    const [weekdaysCount, setWeekdaysCount] = useState(null);
    const [weekendCount, setWeekendCount] = useState(null);
    const [multKms, setMultKms] = useState(false)
    const [stops, setStops] = useState([]);
    const [currentStop, setCurrentStop] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sourceRef = useRef();
    const destinationRef = useRef();
    const autocompleteRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
        libraries: libraries
    });

    useEffect(() => {
        if (!isLoading) {
            const fetchData = async () => {
                setIsLoading(true);
                await Promise.all([
                    startLoadingFsCosts(),
                    startLoadingEsCosts()
                ]);
            };
            fetchData();
        }
    }, []);

    const addStop = () => {
        if (stops.length < 5) {
            if (autocompleteRef.current) {
                const place = autocompleteRef.current.getPlace();
                if (place && place.formatted_address) {
                    setStops([...stops, place.formatted_address]);
                    setCurrentStop(''); // Restablecer el campo de entrada
                } else {
                    Swal.fire('Ingrese una parada válida', '', 'warning');
                }
            }
        } else {
            Swal.fire('Si desea cotizar mas de 1 parada porfavor comuniquese con un agente de ventas', '', 'warning');
        }
    };

    const removeStop = (index) => {
        const updatedStops = [...stops];
        updatedStops.splice(index, 1);
        setStops(updatedStops);
    };

    // console.log(multKms);

    const calculateRoute = async (e) => {
        e.preventDefault();

        // Limpiar la respuesta de direcciones actual
        setMapKey((prevKey) => prevKey + 1);
        setDirectionsResponse(null);

        const SourceAndDestination = [sourceRef.current.value, destinationRef.current.value];

        // Sweetalert2
        if (SourceAndDestination.some(value => !value) || !destinationRef.current.value || !startDate || !endDate) {
            Swal.fire('Faltan campos por llenar', ' Por favor llena todos los campos obligatorios para calcular la ruta', 'error',);
            return; // No continúes con el cálculo si falta algún campo
        }

        const waypoints = stops.map((stop) => ({
            location: stop,
            stopover: true,
        }));

        const directionsRequest = {
            origin: SourceAndDestination.shift(),
            destination: SourceAndDestination.pop(),
            waypoints,
            travelMode: 'DRIVING'
        };

        const generatePath = (response, status) => {
            if (status === 'OK') {
                setDirectionsResponse(response);

                const route = response.routes[0];
                let totalDistance = 0;
                let totalDuration = 0;


                for (let i = 0; i < route.legs.length; i++) {
                    totalDistance += route.legs[i].distance.value;
                    totalDuration += route.legs[i].duration.value;
                }

                // Conversión de minutos a horas y minutos
                const hours = Math.floor((totalDuration / 60) / 60);
                const minutes = totalDuration % 60;

                setDistance((totalDistance / 1000).toFixed(1)); // Convertir a km y redondear
                setTime(`${hours} h ${minutes} min`); // Formato de horas y minutos

                if (startDate && endDate) {
                    const daysInterval = eachDayOfInterval({ start: startDate, end: endDate });
                    const totalDaysValue = daysInterval.length;
                    const weekdaysCountValue = daysInterval.slice(1).filter(date => getDay(date) >= 1 && getDay(date) <= 5).length;
                    const weekendCountValue = totalDaysValue - weekdaysCountValue - 1; // Restamos el día inicial

                    setTotalDays(totalDaysValue);
                    setWeekdaysCount(weekdaysCountValue);
                    setWeekendCount(weekendCountValue);

                    (startDate.getDay() >= 1 && startDate.getDay() <= 5 ? setMultKms(true) : setMultKms(false))


                }
            } else {
                console.error('Error al calcular la ruta:', status);
            }
        };



        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(directionsRequest, generatePath);
    }

    if (loading || costsValue == null || costsValueWeekend == null) {
        return <h5>Cargando aplicacion...</h5>
    } else if (!isLoaded) {
        return <h5>Cargando Mapa...</h5>;
    }


    return (
        <>
            {costsValue ? (
                <AppProvider>

                    <div>
                        <div>
                            {/* Contenido de la caja del formulario */}
                            <MapBox
                                calculateRoute={calculateRoute}
                                sourceRef={sourceRef}
                                destinationRef={destinationRef}
                                setDistance={setDistance}
                                setDuration={setTime}
                                stops={stops}
                                setStops={setStops}
                                currentStop={currentStop}
                                setCurrentStop={setCurrentStop}
                                addStop={addStop}
                                removeStop={removeStop}
                                setDirectionsResponse={setDirectionsResponse}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                autocompleteRef={autocompleteRef}
                                setMapKey={setMapKey}
                            />
                        </div>


                        <div className='row '> {/* Mapa de google */}
                            <div className='col-sm-8 col-12' style={{ height: 'calc(100vh - 60px)' }}>
                                <GoogleMaps
                                    directionsResponse={directionsResponse}
                                    mapKey={mapKey}
                                />
                            </div>

                            <div className="col-sm-4 col-12">
                                <RoutesCalculator
                                    sourceRef={sourceRef}
                                    destinationRef={destinationRef}
                                    stops={stops}
                                    distance={distance}
                                    duration={time}
                                    directionsResponse={directionsResponse}
                                    totalDays={totalDays}
                                    weekdaysCount={weekdaysCount}
                                    weekendCount={weekendCount}
                                    multKms={multKms}
                                />
                            </div>
                        </div>
                    </div>

                </AppProvider>
            ) : (
                <div>
                    <br />
                    <h5>Conectando con DB...</h5>
                    <hr />
                </div>
            )}
        </>
    )
}
