import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('academiatrack_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    const tenantId = localStorage.getItem('academiatrack_tenant_id');
    if (tenantId) {
        config.headers['X-Tenant-Id'] = tenantId;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('academiatrack_token');
            localStorage.removeItem('academiatrack_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
