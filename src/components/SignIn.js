import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { signIn } from '../store/actions/authenticationActions';
import 'bootstrap-social/bootstrap-social.css';
import '@fortawesome/fontawesome-free/css/all.css';
import PropTypes from 'prop-types';


const Authentication = styled.main`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	width: auto;
    height: auto;
    padding: 0;
    border: 0;
    margin: 0;
    
    /* Other */
    cursor: pointer;
`;


class SignIn extends Component {

	static contextTypes = {
		router: PropTypes.object
	};
	
	static propTypes = {
		isAuthenticated: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.bool
		]),
		signIn: PropTypes.func.isRequired
	}
	
	UNSAFE_componentWillUpdate(nextProps) {
		if (nextProps.isAuthenticated) {
			this.context.router.history.push('/home');
		}
	}

	render() {
		return (
			<Authentication>
				<button className="btn btn-block btn-social btn-google" onClick={this.props.signIn}>
					<i className="fab fa-google"></i>  Sign in with Google
				</button>
			</Authentication>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.authentication
	};
};
export default connect(mapStateToProps, { signIn })(SignIn);
