import { useState, useEffect } from 'react';

export const useFetchData = (fetchFunction) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchFunction();
                setData(response.data || response);
            } catch (err) {
                setError(err);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFunction]);

    return { data, loading, error };
};