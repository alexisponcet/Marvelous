import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap-social/bootstrap-social.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { signIn, signOut } from './../actions/authentication';
import PropTypes from 'prop-types';


class SignIn extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  // Initialization : no connection
  componentDidMount(){
	  this.props.signOut();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.authentication) {
      this.context.router.history.push("/home");
    }
  }

  render() {
    return (
      <div id='signIn'>
	      <button className="btn btn-block btn-social btn-google" onClick={this.props.signIn}>
		      <i className="fab fa-google"></i>  Sign in with Google
	      </button>
      </div>
    );
  }
}

function mapStateToProps({ authentication }) {
  return { authentication };
}

export default connect(mapStateToProps, { signIn, signOut })(SignIn);
