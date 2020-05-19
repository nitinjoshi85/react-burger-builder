import React, {Component} from 'react';
import { connect } from 'react-redux';

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
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated} 
                    clicked={this.sideDrawerOpenHandler} />
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated} 
                    showSideDrawer={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>                
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);