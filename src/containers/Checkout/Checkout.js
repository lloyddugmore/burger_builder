import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

const Checkout = (props) => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/"/>
    if (props.ings) {
        const purchasedRediect = props.purchased ? <Redirect to="/"/> : null
        summary = (
            <>
            {purchasedRediect}
            <CheckoutSummary 
                ingredients={props.ings}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}>
            </CheckoutSummary>
            <Route path={props.match.path + '/contact-data'} 
                   component={ContactData}>
            </Route>
            </>
        );
    }

    return (
        summary
    );
    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);