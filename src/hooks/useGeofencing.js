import { useState, useEffect } from 'react';
import { calculateDistance } from '../utils/location';
import { useLocation } from '../context/LocationContext';

export function useGeofencing(stores) {
    const { location, locationEnabled, address } = useLocation();
    const [notification, setNotification] = useState(null);
    const [isSimulated, setIsSimulated] = useState(false);

    // Simulation Functions
    const simulateEnterRegion = (storeId) => {
        if (!locationEnabled) {
            setNotification({
                title: "⚠️ Uyarı",
                message: "Kullanıcının konumu kapalı, bildirim gönderilemiyor.",
                action: { label: "Ayarları Aç", onClick: () => console.log("Open settings...") }
            });
            return;
        }
        setIsSimulated(true);
        const store = stores.find(s => s.id === storeId);
        if (!store) return;

        setNotification({
            title: "📍 150m Yakınlardasınız!",
            message: "Sepetinizde unuttuğunuz 'Vintage Ceket' Nişantaşı mağazamızda stokta! Denemek için harika bir zaman.",
            action: { label: "Mağazayı Gör", onClick: () => console.log("Navigating to store...") }
        });
    };

    const simulateInStore = () => {
        if (!locationEnabled) {
            setNotification({
                title: "⚠️ Uyarı",
                message: "Kullanıcının konumu kapalı, bildirim gönderilemiyor.",
                action: null
            });
            return;
        }
        setIsSimulated(true);
        setNotification({
            title: "🤭 Duyduk ki Mağazamızdaymışsın!",
            message: "Beğendiğin ürünü şimdi uygulama üzerinden al, kasada sıra bekleme ve anında %10 indirim + 2X Puan kazan!",
            action: null
        });
    };

    // Real Loop for Geofencing
    useEffect(() => {
        if (!locationEnabled || !location || !stores) {
            if (!locationEnabled) setNotification(null);
            return;
        }

        // Check distance to all stores
        stores.forEach(store => {
            const distance = calculateDistance(location.lat, location.lng, store.lat, store.lng);
            // Threshold: 150 meters
            if (distance < 150) {
                setNotification(prev => {
                    if (prev?.storeId === store.id) return prev;
                    return {
                        storeId: store.id,
                        title: "📍 150m Yakınlardasınız!",
                        message: `${store.name} mağazasına ${(distance).toFixed(0)}m mesafedesiniz. Sepetinizdeki ürünleri denemek için harika bir zaman!`,
                        action: { label: "Mağazayı Gör", onClick: () => console.log("Navigating to store...") }
                    };
                });
            }
        });
    }, [location, stores, locationEnabled]);

    return {
        // We pass through location/address for convenience if needed, but components can also get them from context directly
        // Keeping them here minimizes breakage if App.jsx expects them from this hook
        location,
        address,
        notification,
        simulateEnterRegion,
        simulateInStore,
        dismissNotification: () => setNotification(null)
    };
}
