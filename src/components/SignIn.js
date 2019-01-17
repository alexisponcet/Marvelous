import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap-social/bootstrap-social.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { signIn, signOut } from './../store/actions/authentication';
import PropTypes from 'prop-types';
import styled from "styled-components";


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
		authentication: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.bool
		]),
		signIn: PropTypes.func.isRequired,
		signOut: PropTypes.func.isRequired
	}

	// Initialization : no connection
	componentDidMount(){
		this.props.signOut();
	}
	
	UNSAFE_componentWillUpdate(nextProps) {
		if (nextProps.authentication) {
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

function mapStateToProps({ authentication }) {
	return { authentication };
}

export default connect(mapStateToProps, { signIn, signOut })(SignIn);
