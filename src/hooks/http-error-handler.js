import { useState, useEffect } from 'react';

export default axiosClient => {
    const [error, setError] = useState(null);

    // want to clear the errors object on every request
    const reqInterceptor = axiosClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    // want to set the errors object if there are errores on the response
    // NOTE - res => res is the shortest way of returning the response.
    const respInterceptor = axiosClient.interceptors.response.use(res => res, err => {
        setError(err);
    });
    

    //When using a HOC component like this, and using interceptors, its best practice to
    //tidy up the interceptors. Otherwise you could eventually get a memory leak of sorts.
    useEffect(() => {
        return () => {
            axiosClient.interceptors.request.eject(reqInterceptor);
            axiosClient.interceptors.request.eject(respInterceptor);
        }
    }, [reqInterceptor, respInterceptor, axiosClient.interceptors.request]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
}