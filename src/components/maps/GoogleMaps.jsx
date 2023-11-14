import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';


export const GoogleMaps = ({mapKey, directionsResponse }) => {

    const center = { lat: 17.5470274, lng: -99.5032994 };

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
            <Marker position={center} />

            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
    )
}
