import React, { Component } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';

import Spinner from '../../Components/UI/Spinner/Spinner';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import classes from './ContactData.css';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionCreators from '../../store/actions/order';
import Utility from '../../Utility/utility';

class ContactData extends Component {

    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                    autoFocus: 'autoFocus'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
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
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',                
                elementConfig: {
                    options: [
                        {value:'fastest', displayValue: 'Fastest'},
                        {value:'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest'
            }
        },
        formIsValid: false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = Utility.updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: Utility.checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const formData = Utility.updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValidUpdated = true;
        for (let key in formData) {
            if (formData[key].validation) {
                formIsValidUpdated = formIsValidUpdated && formData[key].valid;
            }
        }
        this.setState({
            orderForm: formData,
            formIsValid: formIsValidUpdated
        });
    }

    orderHandler = (event) => {
        event.preventDefault();        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.orderForm.name.value,
                address: {
                    street: this.state.orderForm.street.value,
                    zipcode: this.state.orderForm.postalCode.value,
                    country: this.state.orderForm.country.value
                },
                email: this.state.orderForm.email.value
            },
            userId: this.props.userId,
            deliveryMethod: this.state.orderForm.deliveryMethod.value
        };

        this.props.onPurchaseBurger(order, this.props.token);
    }

    render() {
        let loader = null;
        if (this.props.loading) {
            loader = <Spinner/>
        }
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let formFields = formElements.map(field=>{
            return <Input key={field.id} {...field.config} shouldValidate={field.config.validation} 
                changed={(event)=>this.inputChangedHandler(event, field.id)} />
        });
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {loader}
                <form onSubmit={this.orderHandler}>
                    {formFields}
                    <Button disabled={!this.state.formIsValid} type="Success">ORDER</Button>
                </form>
            </div>
        );        
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));