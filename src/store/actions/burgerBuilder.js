// action creators.
import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        name: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        name: name
    }
};

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

const setLoadingIngredients = () => {
    return {
        type: actionTypes.SET_LOADING_INGREDIENTS
    }
}

export const initIngredients = () => {
    return dispatch => {
        dispatch(setLoadingIngredients());           
        axios.get('/ingredients.json').then( response => {
            dispatch(setIngredients(response.data));           
        })
        .catch( error => {
            dispatch(fetchIngredientsFailed());                       
        });
    }
};
