import * as actionTypes from '../actions/actionTypes';
import Utility from '../../Utility/utility';

 const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgetSuccess = (state, action) => {
    return Utility.updateObject(state, {
        orders: state.orders.concat(action.order),
        purchased: true,
        loading: false
    });
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INIT_PURCHASE_BURGER:
            return Utility.updateObject(state, {purchased: false});
        case actionTypes.PURCHASE_BURGER_START: return Utility.updateObject(state, {loading: true});
        case actionTypes.PURCHASE_BURGER_FAILED: return Utility.updateObject(state, {loading: false});
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgetSuccess(state, action);
        case actionTypes.FETCH_ORDERS_START: return Utility.updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDERS_FAIL: return Utility.updateObject(state, {loading: false});        
        case actionTypes.FETCH_ORDERS_SUCCESS: return Utility.updateObject(state, {loading: false, orders: action.orders});        
        default:
            return state;
    }
}

export default orderReducer;