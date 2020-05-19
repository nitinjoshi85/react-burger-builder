import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {

    let preparedIngredients = Object.keys( props.ingredients )
        .map( name => {
            return [...Array(props.ingredients[name])].map( (_,i) => {
                return <BurgerIngredient key={name+i} type={name}/>
            });
        } )
        .reduce((arr, el)=>{
            return arr.concat(el);
        }, []);
    if (preparedIngredients.length === 0) {
        preparedIngredients = <div>Please start adding ingredients.</div>
    }
    let classNames = [classes.Burger];
    if ( props.small ) {
        classNames.push(classes.Small);
    }
    return (
        <div className={classNames.join(' ')}>
            <BurgerIngredient type="bread-top"/>
            { preparedIngredients }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;