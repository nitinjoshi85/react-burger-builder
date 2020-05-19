import * as actionTypes from '../actions/actionTypes';
import Utility from '../../Utility/utility';

const BASE_PRICE = 4;
const INGREDIENT_PRICES = {
    salad: 0.3, 
    patty: 1.2, 
    cheese: 0.3, 
    bacon: 0.7
};

const initialState = {
    ingredients : null,
    totalPrice: BASE_PRICE,
    purchasable: false,
    error: false
};

const isPurchasable = (ingredients) => {
    const sum = Object.keys(ingredients).map((type) => {
        return ingredients[type];
    }).reduce((total, n) => {
        return total + n;
    }, 0);
    return sum > 0;
};

const addIngredient = (state, action) => {
    const oldCount = state.ingredients[action.name] || 0;
    let updatedPrice = state.totalPrice;    
    const updatedIngredients = Utility.updateObject(state.ingredients, {[action.name]: oldCount + 1}); 
    updatedPrice += INGREDIENT_PRICES[action.name];
    return Utility.updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        purchasable: isPurchasable(updatedIngredients)
    });
};

const removeIngredient = (state, action) => {
    const oldCount = state.ingredients[action.name] || 0;
    const updatedIngredients = Utility.updateObject(state.ingredients, {[action.name]: (oldCount - 1)});
    let updatedPrice = state.totalPrice;    
    updatedPrice -= INGREDIENT_PRICES[action.name];
    return Utility.updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        purchasable: isPurchasable(updatedIngredients)
    });
};

const setIngredients = (state, action) => {
    let updatedPrice = BASE_PRICE;
    const updatedIngredients = action.ingredients;
    for (let type in updatedIngredients) {
        updatedPrice += updatedIngredients[type] * INGREDIENT_PRICES[type];
    }
    return Utility.updateObject(state, {
        ingredients: {
            salad: updatedIngredients.salad,
            bacon: updatedIngredients.bacon,
            cheese: updatedIngredients.cheese,
            patty: updatedIngredients.patty
        },
        totalPrice: updatedPrice,
        purchasable: isPurchasable(updatedIngredients),
        error: false,
        loading: false
    });
};

const setLoadingIngredient = (state, action) => {
    return Utility.updateObject(state, {loading: true});
};

const fetchIngredientsFailed = (state, action) => {
    return Utility.updateObject(state, {
        error: true,
        loading: false
    });
}

const burgerBuilderReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.SET_LOADING_INGREDIENTS: return setLoadingIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default burgerBuilderReducer;