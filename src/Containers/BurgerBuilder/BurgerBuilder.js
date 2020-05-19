import React, {Component} from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Utility from '../../Utility/utility';
import classes from './BurgerBuilder.css';

class BurgerBuilder extends Component { 
    
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
        this.props.onInitPurchaseBurger();        
    }
    
    summaryHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
            this.props.onAuthRedirectPath('/');
        } else {
            // set redirect path to checkout for auth redirect
            this.props.onAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});   
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');        
    }

    render() {
        const disabledInfo = Utility.updateObject(this.props.ingredients, {});
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let orderSummary = null;
        
        let burgerContent = <Spinner />
        if (this.props.error) {
            burgerContent = <p style={{textAlign:'center'}}>Ingredients can't be loaded</p>
        }
        if (this.props.ingredients) {
            burgerContent = (
                <div className={classes.BurgerBuilder}>
                    <h4>Welcome! Build your own Burger</h4>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.props.purchasable}
                        ingredientAdded={this.props.onAddIngredient} 
                        ingredientRemoved={this.props.onRemoveIngredient}
                        isAuth={this.props.isAuthenticated}
                        showSummary={this.summaryHandler} />
                </div>
            );
            orderSummary = <OrderSummary 
                totalPrice={this.props.totalPrice}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                ingredients={this.props.ingredients} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerContent}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchasable,
        error: state.burgerBuilder.error,
        loading: state.burgerBuilder.loading,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: name => dispatch(actionCreators.addIngredient(name)),
        onRemoveIngredient: name => dispatch(actionCreators.removeIngredient(name)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchaseBurger: () => dispatch(actionCreators.initPurchaseBurger()),
        onAuthRedirectPath: (path) => dispatch(actionCreators.authRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));