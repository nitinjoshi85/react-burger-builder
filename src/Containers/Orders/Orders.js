import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import Order from './Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/order';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);        
    }

    render() {
        let ordersContent = <div style={{textAlign: 'center'}}><p>You do not have any orders yet.</p></div>;
        
        if (this.props.loading) {
            ordersContent = <Spinner/>;
        } else if (this.props.orders.length) {
            ordersContent = this.props.orders.map( order => {
                return <Order key={order.id} {...order} />
            });
        }
        
        return (
            <div>
                {ordersContent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToprops = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(withErrorHandler(Orders, axios));