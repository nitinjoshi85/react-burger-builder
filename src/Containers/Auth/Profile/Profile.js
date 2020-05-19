import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import Button from '../../../Components/UI/Button/Button';

class Profile extends Component {

    logout = () => {
        this.props.onLogout();
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/auth" />
        }
        return (<div style={{textAlign: 'center'}}>
            <h4>User Profile</h4>
            <Button type="Success" clicked={this.logout}>Logout</Button>
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToprops = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(Profile);