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
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {salad: 0.3, patty: 1.2, cheese: 0.3, bacon: 0.7};

class BurgerBuilder extends Component { 
    
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false        
    };

    componentDidMount() {
        axios.get('/ingredients.json').then( response => {
            const ingredients = response.data;
            let updatedPrice = 4;
            
            for (let type in ingredients) {
                const count = ingredients[type];
                const priceAddition = count * INGREDIENT_PRICES[type];
                updatedPrice += priceAddition;
            }            
            this.props.setIngredients(ingredients);           
            this.props.setTotalPrice(updatedPrice); 
        })
        .catch( error => {
            this.setState({error: true});
        });
    }

    updatePurchaseState = (updatedIngredients) => {
        const ingredients = {...updatedIngredients};
        const sum = Object.keys(ingredients).map((type) => {
            return ingredients[type];
        }).reduce((total, n)=>{ 
            return total + n;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.props.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.props.setIngredients(updatedIngredients);
        this.props.setTotalPrice(updatedPrice);
        this.updatePurchaseState(updatedIngredients);
        //axios.put('/ingredients.json',updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        if ( oldCount > 0 ) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {...this.props.ingredients};
            updatedIngredients[type] = updatedCount;
            const priceReduction = INGREDIENT_PRICES[type];
            const oldPrice = this.props.totalPrice;
            const updatedPrice = oldPrice - priceReduction;        
            this.props.setIngredients(updatedIngredients);
            this.props.setTotalPrice(updatedPrice);
            this.updatePurchaseState(updatedIngredients);
            //axios.put('/ingredients.json',updatedIngredients);
        }
    };
    
    summaryHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});   
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');        
    }

    render() {
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let orderSummary = null;
        
        let burgerContent = <Spinner />
        if (this.state.error) {
            burgerContent = <p style={{textAlign:'center'}}>Ingredients can't be loaded</p>
        }
        if (this.props.ingredients) {
            burgerContent = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.state.purchasable}
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        showSummary={this.summaryHandler} />
                </Aux>
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setIngredients: ingredients => dispatch({type: actionTypes.SET_INGREDIENTS, ingredients: ingredients}),
        setTotalPrice: price => dispatch({type: actionTypes.SET_PRICE, price: price})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));