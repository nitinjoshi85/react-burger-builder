import React, { Component } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';

import Spinner from '../../Components/UI/Spinner/Spinner';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import classes from './ContactData.css';


class ContactData extends Component {

    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
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
        loading: false,
        formIsValid: false
    }

    checkValidity(value, rules) {
        var isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.minLength) {
                isValid = value.trim().length >= rules.minLength && isValid;
            }
            if (rules.maxLength) {
                isValid = value.trim().length <= rules.maxLength && isValid;
            }
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const formData = {...this.state.orderForm};
        const updatedFormElement = {
            ...formData[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        formData[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
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
        console.log(this.props.ingredients);    
        
        this.setState({loading: true});
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
            deliveryMethod: this.state.orderForm.deliveryMethod.value
        };
        axios.post('/orders.json', order).then(response=>{
            setTimeout(_=>{
                this.setState({loading: false});
                this.props.history.push('/');
            },100);
        })
        .catch(error=>{
            setTimeout(_=>this.setState({loading: false}),100);
        });
    }

    render() {
        console.log('path',this.props);
        let loader = null;
        if (this.state.loading) {
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
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);