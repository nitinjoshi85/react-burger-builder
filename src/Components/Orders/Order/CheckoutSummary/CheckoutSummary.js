import React from 'react';
import Burger from '../../../Burger/Burger';
import Button from '../../../UI/Button/Button';

const checkoutSummary = (props) => {    
    return (
        <div style={{textAlign:'center'}}>
            <h1>We hope it tests well!</h1>
            <div><Burger ingredients={props.ingredients}/></div>
            {/* <p><strong>Total: ${props.price.toFixed(2)}</strong></p> */}
            <Button type="Danger" clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button type="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}
export default checkoutSummary;