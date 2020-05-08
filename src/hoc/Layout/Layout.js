import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true});
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render () {
        return (
            <Aux>
                <Toolbar clicked={this.sideDrawerOpenHandler} />
                <SideDrawer showSideDrawer={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>                
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;