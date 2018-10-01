import React, { Component } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import './Home.css';
import Menu from './Menu';
import DetailCharacter from './DetailCharacter';
import ListCharacters from './ListCharacters';
import PropTypes from 'prop-types';


const enhance = compose(
	firestoreConnect([
		// Load favorite characters from firestore
		{ collection: 'favoriteCharacters'}
	]),
	connect(
		({ firestore }) => ({
			listFavCharacters: firestore.ordered.favoriteCharacters,
		})
	)
)


class Home extends Component {

	static propTypes = {
		listFavCharacters: PropTypes.array,
	}

	URL_CHARACTERS = 'http://gateway.marvel.com/v1/public/characters';

	constructor(props){
		super(props);

		this.state = {
			currentCharacter: {},
			currentAppearanceLink: this.URL_CHARACTERS,
		};
	}

	displayInfoAppearance = (newAppearanceLink) => {
		// Display the characters associated to the new appearance
		this.setState({ currentAppearanceLink : newAppearanceLink});
	}

	displayInfoCharacter = (currentCharacter) => {
		this.setState({ currentCharacter : currentCharacter });
	}

	render() {
		const { listFavCharacters } = this.props;
		const { currentCharacter, currentAppearanceLink } = this.state;
		const notSelected = (Object.keys(currentCharacter).length === 0 && currentCharacter.constructor === Object);

		return (
			<div id='home'>
				{ notSelected
					? <Menu/>
					: <DetailCharacter
						character={currentCharacter}
						onClickAppearance={this.displayInfoAppearance}
					/>
				}

				{ isLoaded(listFavCharacters)
					&&
					<ListCharacters listFavCharacters = {listFavCharacters}
					                currentCharacter = {currentCharacter}
					                currentAppearanceLink = {currentAppearanceLink}
				                onClickCharacter={this.displayInfoCharacter}/>
				}
			</div>
		);
	}
}
export default enhance(Home);

/* React-Redux v1
const mapStateToProps = state => {
	return { listFavCharacters: state.listFavCharacters };
};

const Home_wrapper = connect(mapStateToProps)(Home);

export default Home_wrapper;*/