import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../Components/Orders/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../Containers/ContactData/ContactData';

class checkout extends Component {
    
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
        if (!this.props.ingredients || this.props.purchased) {
            return ( <Redirect to="/" /> );
        }
        return (
            <div>
                <CheckoutSummary 
                    checkoutContinued={this.checkoutContinued}
                    checkoutCanceled={this.checkoutCanceled} 
                    price={this.props.price}
                    ingredients={this.props.ingredients}/>
                <Route path={this.props.match.url + '/contact-data'}>
                    <ContactData history={this.props.history} />
                </Route>    
            </div>
        );    
    }    
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(checkout);