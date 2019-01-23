import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { signOut } from '../store/actions/authenticationActions';
import 'bootstrap-social/bootstrap-social.css';
import '@fortawesome/fontawesome-free/css/all.css';
import PropTypes from 'prop-types';


const Unauthentication = styled.main`
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


class SignOut extends Component {
	
	static propTypes = {
		signOut: PropTypes.func.isRequired
	}
	
	render() {
		return (
			<Unauthentication>
				<button className="btn btn-block btn-social btn-google" onClick={this.props.signOut}>
					<i className="fab fa-google"></i>  Sign out
				</button>
			</Unauthentication>
		);
	}
}
export default connect(null, { signOut })(SignOut);
