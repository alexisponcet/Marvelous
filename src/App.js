import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';


import './App.css';
import SignIn from './components/SignIn';
import requireAuthentication from './authentication/requireAuthentication';
import { HomeHOC } from './components/Home';
import { fetchUser } from './actions/authentication';


class App extends Component {

	componentWillMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div id='marvel'>
					<Route exact path="/" component={SignIn}/>
					<Route path="/home" component={requireAuthentication(HomeHOC)}/>
				</div>
			</BrowserRouter>
		)
	}
}
export default connect(null, { fetchUser })(App);