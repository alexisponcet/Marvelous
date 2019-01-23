import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import HomeHOC from './components/Home';
import SignIn from './components/SignIn';
import requireAuthentication from './authentication/requireAuthentication';
import { fetchUser } from './store/actions/authenticationActions';
import PropTypes from 'prop-types';


const GlobalStyle = createGlobalStyle`
  body {
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
    
    /* Color */
    background-color: white;
    color: black;
    
    /* Text */
    font-family: sans-serif;
    font-size: 14px;
  }
`;

const Marvel = styled.main`
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

	/* Color */
    background-color: black;
`;


class App extends Component {
	
	static propTypes = {
		fetchUser: PropTypes.func.isRequired
	};
	
	UNSAFE_componentWillMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<Marvel>
					<GlobalStyle />
					<Route exact path='/' component={SignIn}/>
					<Route path='/home' component={requireAuthentication(HomeHOC)}/>
				</Marvel>
			</BrowserRouter>
		);
	}
}
export default connect(null, { fetchUser })(App);
