import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,//have to add this manually as true...
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();//prevent the default of refreshing of the form 
        this.setState({loading: true})
        
        //grab the form data
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        //NOTE - best practice to calculate the price on the server, dont do it in the client, user could manipulate the price. 
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
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

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
             isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        // console.log(inputIdentifier);

        //because it is bad practice to update state like this, we make a 
        //clone and have to do something special to do a 'deep copy'.
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //deep copy of nested values
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        //update the 'value' to the input value
        updatedFormElement.value = event.target.value;
        //check validity of value 
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        //update the 'touched' value, which lets the form know that user has attempted to enter a value
        updatedFormElement.touched = true;

        //check the overall form is valid - loop through all inputs 
        let formValid = true;
        for (let input in updatedOrderForm){
           formValid = updatedOrderForm[input].valid && formValid;
        }

        //update the form object
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        //now add that to the state
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formValid
        });
    }

    render () {

        //loop through state to create form
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = '';
        if (this.state.loading) {
            form = <Spinner></Spinner>
        } else { 
            form = <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementtype={formElement.config.elementType} 
                        elementconfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);