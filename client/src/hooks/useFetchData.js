import {useState, useEffect, useCallback} from 'react';

export const useFetchData = (fetchFunction) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(0);

        const fetchData = useCallback(async  () => {
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
        }, [fetchFunction]);

        const refetch = useCallback(() => {
            setTrigger(prev => prev + 1);
        }, []);

        useEffect(() => {
            fetchData();
        }, [fetchData, trigger]);

    return {
        data,
        loading,
        error,
        refetch,
    };
};