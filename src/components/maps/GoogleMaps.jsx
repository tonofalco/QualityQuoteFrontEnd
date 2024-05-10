import React from 'react';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';

export const GoogleMaps = ({ mapKey, directionsResponse }) => {
    const center = { lat: 17.5470274, lng: -99.5032994 };

    let startPoint = null;

    if (directionsResponse) {
        const startLocation = directionsResponse.routes[0].legs[0].start_location;

        // Ajustar la posición del marcador del punto de partida
        startPoint = {
            lat: startLocation.lat()- 0.005,
            lng: startLocation.lng() - 0.00001 // Mover hacia la izquierda 0.01 grados
        };
    }

    return (
        <GoogleMap
            key={mapKey}
            center={center}
            zoom={13}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
                streetViewControl: false,
                zoomControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
        >
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            {startPoint && (
                <Marker
                    position={startPoint}
                    // icon={{
                    //     url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // Icono verde
                    //     labelOrigin: new window.google.maps.Point(20, 15), // Ajuste de la posición de la etiqueta
                    //     scaledSize: new window.google.maps.Size(40, 40) // Tamaño del ícono (ancho x alto)
                    // }}
                    label={{
                        text: 'A',
                        color: 'white', // Color blanco para la etiqueta
                        fontSize: '14px', // Tamaño de fuente
                        fontWeight: 'bold' // Negrita
                        
                    }}
                />
            )}
        </GoogleMap>
    );
};



