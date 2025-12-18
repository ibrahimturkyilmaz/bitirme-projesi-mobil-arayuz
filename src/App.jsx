import { useState, useEffect } from 'react';
import BottomNav from './components/layout/BottomNav';
import HomeScreen from './components/screens/HomeScreen';
import ShopScreen from './components/screens/ShopScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import NotificationOverlay from './components/ui/NotificationOverlay';
import StatusBar from './components/ui/StatusBar';
import { api } from './services/api';
import { useGeofencing } from './hooks/useGeofencing';
import { LocationProvider } from './context/LocationContext';
import { UserProvider, useUser } from './context/UserContext';

function MainLayout() {
  const { user, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Custom Hook now consumes LocationContext internally
  const { notification, dismissNotification, simulateEnterRegion, simulateInStore } = useGeofencing(stores);

  useEffect(() => {
    const initData = async () => {
      const [productData, storeData] = await Promise.all([
        api.fetchProducts(),
        api.fetchStores()
      ]);
      setProducts(productData);
      setStores(storeData);
    };

    initData();
  }, []);

  const renderScreen = () => {
    // If user is loading, we could show a spinner here
    // if (userLoading) return <div>Loading...</div>;

    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            user={user}
            onSimulateEnter={() => simulateEnterRegion('store_001')}
            onSimulateInStore={simulateInStore}
          />
        );
      case 'shop':
        return <ShopScreen products={products} />;
      case 'profile':
        return (
          <ProfileScreen
            notificationsEnabled={notificationsEnabled}
            setNotificationsEnabled={setNotificationsEnabled}
          />
        );
      default:
        return <HomeScreen user={user} />;
    }
  };

  const statusBarTheme = activeTab === 'profile' ? 'dark' : 'light';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <NotificationOverlay notification={notification} onClose={dismissNotification} />
      <main className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative">
        <StatusBar theme={statusBarTheme} />
        {renderScreen()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <LocationProvider>
        <MainLayout />
      </LocationProvider>
    </UserProvider>
  );
}
