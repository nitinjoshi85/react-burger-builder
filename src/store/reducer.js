import * as actionTypes from './actions';

const initialState = {
    ingredients : {

    },
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
        ingredients: {...state.ingredients}
    };
    if ( actionTypes.SET_INGREDIENTS === action.type) {
        newState.ingredients = action.ingredients;
    } else if (actionTypes.SET_PRICE === action.type)  {
        newState.totalPrice = action.price;
    }
    return newState;
}

export default reducer;