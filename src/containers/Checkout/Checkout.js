import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary';

//using a custom axios instance - a project can have many of these.
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Checkout extends Component {

    state = {
        ingredients: {
            "bacon" :1
        },
        loading: false
    }

    componentDidMount() {
        console.log(this.props)
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of queryParams.entries()) {
            console.log('IN ', param)
            ingredients[param[0]] = +param[1]
        }
        console.log(ingredients)
        this.setState(
                {ingredients: ingredients}
            )
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.setState({loading: true});

        this.props.history.replace('/checkout/contact-data');
        //NOTE - best practice to calculate the price on the server, dont do it in the client, user could manipulate the price. 
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "Bob",
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '4223',
        //             country: 'New Zealand'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // //NOTE -- '.json' is for FIREBASE... special thing for firebase.
        // axios.post('/orders.json', order)
        // .then(response => {
        //     this.setState({loading: false, purchasing: false});
        // })
        // .catch(error => {
        //     this.setState({loading: false, purchasing: false});
        // });
    }

    render () {

        let output = '';
        if (this.state.loading) {
            output = <Spinner></Spinner>
        } else {
            output = <CheckoutSummary 
                        ingredients={this.state.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}>
                      </CheckoutSummary>
        }

        return (
            <>
                {output}
            </>
        );
    }
}

export default withErrorHandler(Checkout, axios);