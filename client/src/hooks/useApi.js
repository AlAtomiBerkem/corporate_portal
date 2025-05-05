// src/hooks/useApi.js
import { useState } from 'react';
import api from '../api/axios';

export const useApi = (baseEndpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (method, endpoint = '', payload = null, options = {}) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api({
                method,
                url: `${baseEndpoint}${endpoint}`,
                data: payload,
                ...options
            });

            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        get: (endpoint = '') => request('GET', endpoint),
        post: (payload, endpoint = '', options) => request('POST', endpoint, payload, options),
        put: (payload, endpoint = '', options) => request('PUT', endpoint, payload, options),
        del: (endpoint = '', options) => request('DELETE', endpoint, null, options)
    };
};