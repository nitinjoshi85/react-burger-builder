import React from 'react';

import classes from './Order.css';
import Burger from '../../../Components/Burger/Burger';

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
        //if (ig.amount) 
        return <span className={[classes.Span, classes.Ing].join(' ')} key={ig.name}>{ig.name}: {ig.amount}</span>
    });

    const getAddress = address => {
        return address.street + ', ' + address.zipcode + ', ' + address.country
    }

    return (
        <div className={classes.Order}>
            <div className={classes.Row}>
                <div className={classes.Column}>
                    <label>Ingredients:</label>
                    <div className={classes.Row}>
                        <div className={classes.Column}>{ingredientContent}</div>
                        <Burger small ingredients={ {
                            salad: props.ingredients.salad,
                            bacon: props.ingredients.bacon,
                            cheese: props.ingredients.cheese,
                            patty: props.ingredients.patty
                        }}/>
                    </div>
                </div>
                <div className={classes.Column}>
                    <section><label>Customer:</label> <span className={classes.Span}> { props.customer.name } </span></section>
                    <section><label>Email:</label> <span className={classes.Span}> { props.customer.email } </span></section>
                    <section><label>Address:</label> <span className={classes.Span}> { getAddress(props.customer.address) } </span></section>
                    <section><label>Delivery:</label> <span className={classes.Span}> { props.deliveryMethod } </span></section>                                        
                    <section><strong><label>Price: </label>
                        <span className={classes.Span}>$ {Number.parseFloat(props.price).toFixed(2)} </span>
                    </strong></section>
                </div>
            </div>
            <section></section>
        </div>
    );
}

export default order;