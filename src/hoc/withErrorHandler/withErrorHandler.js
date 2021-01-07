import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxilliary';
import useAxiosErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
   return props => {
        const [error, clearError] = useAxiosErrorHandler(axios)

        return (
            <Aux>
                <Modal show={error} modalClosed={clearError}>
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



