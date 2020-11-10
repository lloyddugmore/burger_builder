import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of queryParams.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState(
            {
                ingredients: ingredients,
                totalPrice: price
            }
        )
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <>
            <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}>
            </CheckoutSummary>
            <Route path={this.props.match.path + '/contact-data'} 
                   render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}></ContactData>)}>
            </Route>
            </>
        );
    }
}

export default Checkout;