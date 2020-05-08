import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} disabled={props.disabled} onClick={props.ingredientRemoved}>less</button>
        <button className={classes.More} onClick={props.ingredientAdded}>more</button>
    </div>
);

export default buildControl;