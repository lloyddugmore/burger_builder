import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {

    //Anonymous class here
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount () {
            //want to clear the errors object on every request
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });

            //want to set the errors object if there are errores on the response
            //NOTE - res => res is the shortest way of returning the response.
            this.respInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            });
        }

        //When using a HOC component like this, and using interceptors, its best practice to
        //tidy up the interceptors. Otherwise you could eventually get a memory leak of sorts.
        componentWillUnmount (){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.respInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? 
                            <p>{this.state.error.message}</p> : 
                            null }
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );      
        }
    } 
}

export default withErrorHandler;



