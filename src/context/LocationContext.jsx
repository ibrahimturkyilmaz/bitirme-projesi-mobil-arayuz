import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAddressFromCoords } from '../utils/geocoding';

const LocationContext = createContext();

export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null); // { lat, lng }
    const [address, setAddress] = useState(null); // "District, City"
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState('prompt'); // granted, denied, prompt
    const [isLoading, setIsLoading] = useState(false);

    // Initial Permission Check
    useEffect(() => {
        if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                setPermissionStatus(result.state);
                if (result.state === 'granted') {
                    // Auto-start if already granted
                    setLocationEnabled(true);
                }
            });
        }
    }, []);

    // Watch Location when enabled
    useEffect(() => {
        if (!locationEnabled) {
            setLocation(null);
            setAddress(null);
            setIsLoading(false);
            return;
        }

        if (!("geolocation" in navigator)) {
            console.error("Geolocation not supported");
            return;
        }

        setIsLoading(true);

        const watchId = navigator.geolocation.watchPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });
                setIsLoading(false);

                // Fetch Address
                const addr = await fetchAddressFromCoords(latitude, longitude);
                if (addr) setAddress(addr.short);
            },
            (error) => {
                console.error("Location Error:", error);
                setIsLoading(false);
                if (error.code === 1) { // PERMISSION_DENIED
                    setLocationEnabled(false);
                    setPermissionStatus('denied');
                }
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [locationEnabled]);

    const requestPermission = () => {
        if (!navigator.geolocation) {
            alert("Device does not support location");
            return;
        }

        // Trigger prompt by trying to get position once
        navigator.geolocation.getCurrentPosition(
            () => {
                setLocationEnabled(true);
                setPermissionStatus('granted');
            },
            (error) => {
                setLocationEnabled(false);
                setPermissionStatus('denied');
                console.error("Permission request denied", error);
            }
        );
    };

    return (
        <LocationContext.Provider value={{
            location,
            address,
            locationEnabled,
            setLocationEnabled,
            requestPermission,
            permissionStatus,
            isLoading
        }}>
            {children}
        </LocationContext.Provider>
    );
}

export const useLocation = () => useContext(LocationContext);
