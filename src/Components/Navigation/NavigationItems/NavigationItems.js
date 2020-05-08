import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burget Builder</NavigationItem>
        <NavigationItem link="/orders">All Orders</NavigationItem>
    </ul>
);

export default navigationItems;