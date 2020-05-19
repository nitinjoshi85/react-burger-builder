import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    render () {
        const ingredientSummary = Object.keys( this.props.ingredients ).map((ig)=> {
            if (this.props.ingredients[ig]) {
                return (
                    <li key={ig}> 
                        <span style={{textTransform: 'capitalize'}}>{ig}:</span> 
                        {this.props.ingredients[ig]}
                    </li>
                );
            } else {
                return null;
            }
        });
        return (<Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
            <Button type="Danger" clicked={this.props.cancel}>CANCEL</Button>
            <Button type="Success" clicked={this.props.continue}>CONTINUE</Button>
        </Aux>)
    }
};

export default OrderSummary;