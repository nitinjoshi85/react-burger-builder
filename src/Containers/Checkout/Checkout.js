import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../Components/Orders/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../Containers/ContactData/ContactData';
import Button from '../../Components/UI/Button/Button';

class checkout extends Component {
    
    componentWillMount() {
       console.log('checkout.js mounted');
    }

    checkoutCanceled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace(this.props.match.url + '/contact-data');
    }

    buildeMyBurger = () => {
        this.props.history.replace('/');
    }


    render () {
        if (!this.props.ingredients) {
            return (
                <div style={{textAlign: 'center'}}>
                    <p>Looks like you are lost!</p>
                    <Button type="Danger" style={{color: 'black'}} clicked={this.buildeMyBurger}>Go To Build My Burger</Button>
                </div>
            );
        }
        console.log('ingredients: ', this.props.ingredients);
        console.log('path: ', this.props.match.url);
        return (
            <div>
                <CheckoutSummary 
                    checkoutContinued={this.checkoutContinued}
                    checkoutCanceled={this.checkoutCanceled} 
                    price={this.props.price}
                    ingredients={this.props.ingredients}/>
                <Route path={this.props.match.url + '/contact-data'}>
                    <ContactData />
                </Route>    
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

export default connect(mapStateToProps)(checkout);