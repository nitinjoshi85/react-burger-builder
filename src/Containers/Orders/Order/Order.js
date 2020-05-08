import React from 'react';

import classes from './Order.css';

//class Snippet extends Component {
const order = (props) => {

    const ingredients = [];
    for (let name in props.ingredients) {
        ingredients.push({
            name: name,
            amount: props.ingredients[name]
        });
    }
    const ingredientContent = ingredients.map(ig=>{
        return <span className={classes.Span} key={ig.name}>{ig.name}: {ig.amount}</span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientContent}</p>
            <p><strong>Price: $ {Number.parseFloat(props.price).toFixed(2)} </strong></p>
        </div>
    );
}

export default order;