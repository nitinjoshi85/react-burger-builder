import * as actionTypes from './actionTypes';
import axios from '../../axios';

import Utility from '../../Utility/utility';

export const initPurchaseBurger = () => {
    return {
        type: actionTypes.INIT_PURCHASE_BURGER
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurgerSuccess = (order) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        order: order
    };
}

export const purchaseBurgerFailed = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED
    };
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData).then(response => {
            const order = Utility.updateObject(orderData, {id: response.data.name});
            dispatch(purchaseBurgerSuccess(order));
        })
        .catch( error => {
            dispatch(purchaseBurgerFailed());
        });
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
}

const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    };
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams).then(res => {
            let fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push(Utility.updateObject(res.data[key], {id: key}));
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrdersFail());
        });
    }
}