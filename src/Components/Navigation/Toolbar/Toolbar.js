import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Toolbar.css';
import Logo from '../../../Components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}> 
        <DrawerToggle clicked={props.clicked}></DrawerToggle>
        <div className={classes.Logo}>
            <Link to="/"> <Logo /> </Link>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;