import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
   return props => {
        
        const [error, setError] = useState(null);

        // want to clear the errors object on every request
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        // want to set the errors object if there are errores on the response
        // NOTE - res => res is the shortest way of returning the response.
        const respInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });
        

        //When using a HOC component like this, and using interceptors, its best practice to
        //tidy up the interceptors. Otherwise you could eventually get a memory leak of sorts.
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.request.eject(respInterceptor);
            }
        }, [reqInterceptor, respInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        };

        return (
            <Aux>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error 
                        ? <p>{error.message}</p> 
                        : null 
                    }
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        );      
    } 
}

export default withErrorHandler;



