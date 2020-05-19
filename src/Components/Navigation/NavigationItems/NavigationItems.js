import React from 'react';
//import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burget Builder</NavigationItem>
            { props.isAuthenticated? <NavigationItem link="/orders">All Orders</NavigationItem> : null}
            { props.isAuthenticated ? <NavigationItem link="/profile">My Profile</NavigationItem> :
            <NavigationItem link="/auth">Authentication</NavigationItem> }
        </ul>
        );    
}

export default navigationItems;