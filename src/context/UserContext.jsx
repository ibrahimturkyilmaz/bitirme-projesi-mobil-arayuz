import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initUser = async () => {
            try {
                const userData = await api.fetchUserProfile();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user", error);
            } finally {
                setLoading(false);
            }
        };

        initUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
