import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Utility from '../../Utility/utility';

class Auth extends Component {
    
    state = {
        controls : {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 16
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignup: false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = Utility.updateObject(this.state.controls[inputIdentifier], {
            value: event.target.value,
            valid: Utility.checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
            touched: true
        });
        const controlsData = Utility.updateObject(this.state.controls, {[inputIdentifier]: updatedFormElement});

        let formIsValidUpdated = true;
        for (let key in controlsData) {
            if (controlsData[key].validation) {
                formIsValidUpdated = formIsValidUpdated && controlsData[key].valid;
            }
        }
        this.setState({
            controls: controlsData,
            formIsValid: formIsValidUpdated
        });
    }

    submitHandler = (event) => {
        event.preventDefault();        
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthMethodHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            };
        });
    }

    render() {

        let formFields = null;
        if (this.props.loading) {
            formFields = <Spinner />;
        } else {
            const formElements = [];
            for (let key in this.state.controls) {
                formElements.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
            formFields = formElements.map(field=>{
                return <Input 
                            key={field.id} 
                            {...field.config} 
                            shouldValidate={field.config.validation} 
                            changed={(event)=>this.inputChangedHandler(event, field.id)} />
            });
        }
        let errorMessage = null;
        let redirect = null;
        if (this.props.error) {
            errorMessage = <p style={{color:'red'}}>{this.props.error.message}</p>;
        } if (this.props.token) {
            redirect =  <Redirect to={this.props.authRedirectPath}/>            
            formFields = null;
        }
        return (
            <div className={classes.Auth}>
                <h4>Authentication</h4>
                <form onSubmit={this.submitHandler}>
                    {formFields}
                    <Button disabled={!this.state.formIsValid || this.state.loading} type="Success">Submit</Button>
                </form>
                {errorMessage}
                {redirect}
                <Button 
                    clicked={this.switchAuthMethodHandler}
                    disabled={this.props.loading}
                    type="Danger">Switch To {this.state.isSignup ? 'SIGNIN': 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        loggedOut: state.auth.loggedOut,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.authenticate(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);