import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Patty', type: 'patty'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p><strong>Total: ${props.price.toFixed(2)}</strong></p>
        {controls.map(c => (
            <BuildControl key={c.label} label={c.label} disabled={props.disabledInfo[c.type]}
            ingredientRemoved={()=>props.ingredientRemoved(c.type)}
            ingredientAdded={()=>props.ingredientAdded(c.type)}/> 
        ))}
        <button disabled={!props.purchasable} onClick={props.showSummary} className={classes.OrderButton}>
            {props.isAuth ? 'Order Now!' : 'SIGNUP TO ORDER'}
        </button>
    </div>
);

export default buildControls;