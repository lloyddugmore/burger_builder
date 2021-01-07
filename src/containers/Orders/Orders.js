import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {

    const {fetchOrders, token, userId} = props;

    useEffect(() => {
        fetchOrders(token, userId);
    }, [fetchOrders, token, userId]);

    let orders = props.loading ? <Spinner/> : 
                <div>
                    {props.orders.map(order => (
                        <Order key={order.id} 
                               ingredients={order.ingredients} 
                               price={+order.price}></Order>
                    ))}
                </div>

    return (
        orders
    );
    
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));