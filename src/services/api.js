import { PRODUCTS, STORES, USER_PROFILE } from '../data/mockData';

const DELAY_MS = 800;

// BACKEND INTEGRATION PLAN
// ------------------------
// Currently, this file uses 'mockData.js' to simulate a database.
// To connect to a real Backend (Firebase, Supabase, or REST API), follows these steps:

// 1. Install Axios: npm install axios
// 2. Configure Base URL: const API = axios.create({ baseURL: 'https://api.yourretailapp.com/v1' });

export const api = {
    fetchStores: async () => {
        // TODO: Replace with Real API Call
        // return API.get('/stores').then(res => res.data);

        return new Promise((resolve) => {
            setTimeout(() => resolve(STORES), DELAY_MS);
        });
    },

    fetchProducts: async () => {
        // TODO: Replace with Real API Call
        // return API.get('/products').then(res => res.data);

        return new Promise((resolve) => {
            setTimeout(() => resolve(PRODUCTS), DELAY_MS);
        });
    },

    fetchUserProfile: async () => {
        // TODO: Replace with Real API Call
        // return API.get('/user/profile').then(res => res.data);

        return new Promise((resolve) => {
            setTimeout(() => resolve(USER_PROFILE), DELAY_MS);
        });
    }
};
