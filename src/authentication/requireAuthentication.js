import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';


export default function(HomeHOC) {

	class Authentication extends Component {

		static contextTypes = {
			router: PropTypes.object
		};
		
		static propTypes = {
			isAuthenticated: PropTypes.oneOfType([
				PropTypes.object,
				PropTypes.bool
			])
		};
		
		UNSAFE_componentWillUpdate(nextProps) {
			if (nextProps.isAuthenticated === false ||
				nextProps.isAuthenticated === null ) {
				this.context.router.history.push('/');
			}
		}
	
		render() {
			if (this.props.isAuthenticated) {
				return <HomeHOC {...this.props} />;
			}
			return null;
		}
	}

	function mapStateToProps(state) {
		return { isAuthenticated: state.authentication };
	}

	return connect(mapStateToProps)(Authentication);
}
