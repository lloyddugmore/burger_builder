import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();//prevent the default of refreshing of the form 
        console.log(this.props.ingredients)
        this.setState({loading: true})

        //NOTE - best practice to calculate the price on the server, dont do it in the client, user could manipulate the price. 
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: "Bob",
                address: {
                    street: 'Teststreet 1',
                    zipCode: '4223',
                    country: 'New Zealand'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        //NOTE -- '.json' is for FIREBASE... special thing for firebase.
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false})

            // want to redirect back to home page
            // NOTE - line below wont work initially - because of how we are rendering the component on checkout.js
            // this.props.history.push('/'); 
            // SOLUTION 1. Wrap this ContactData component with WithRouter
            // SOLUTION 2. Pass props in the render method on Checkout component
            // SOLUTION 2. is the solution chosen, therefore can do the below
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }

    render () {
        let form = '';
        if (this.state.loading) {
            form = <Spinner></Spinner>
        } else { 
            form = <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="emai" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;