import React, { Component } from 'react';
import axios from '../../axios';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import Order from './Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';

//class Snippet extends Component {
class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json').then(res => {
            console.log(res);
            let fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    id: key,
                    ...res.data[key]
                });
            }
            this.setState({
                orders: fetchedOrders,
                loading: false
            });
        });
    }

    render() {
        let ordersContent = <div style={{textAlign: 'center'}}><p>You do not have any orders yet.</p></div>;
        
        if (this.state.orders.length) {
            ordersContent = this.state.orders.map(order=>{
                return <Order key={order.id} {...order} />
            });
        }
        if (this.state.loading) {
            ordersContent = <Spinner/>;
        }
        return (
            <div>
                {ordersContent}
            </div>
        );
    }
}
export default withErrorHandler(Orders, axios);