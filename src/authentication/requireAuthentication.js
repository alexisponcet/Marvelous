import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';


export default function(HomeHOC) {

	class Authentication extends Component {

		static contextTypes = {
			router: PropTypes.object
		};
		
		static propTypes = {
			authenticated: PropTypes.oneOfType([
				PropTypes.object,
				PropTypes.bool
			])
		};
		
		UNSAFE_componentWillMount() {
			if (this.props.authenticated === null) {
				this.context.router.history.push('/');
			}
		}
		
		UNSAFE_componentWillUpdate(nextProps) {
			if (!nextProps.authenticated) {
				this.context.router.history.push('/');
			}
		}
	
		render() {
			if (this.props.authenticated) {
				return <HomeHOC {...this.props} />;
			}
			return null;
		}
	}

	function mapStateToProps(state) {
		return { authenticated: state.authentication };
	}

	return connect(mapStateToProps)(Authentication);
}
