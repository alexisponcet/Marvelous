import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import Menu from './Menu';
import { DetailCharacterHOC } from './DetailCharacter';
import ListCharacters from './ListCharacters';
import SignOut from './SignOut';
import PropTypes from 'prop-types';


const FirstPage = styled.section`
	/* Positioning */
    position: relative;
    top: 0;
    left: 0;
  
    /* Display & Box Model */
    display: grid;
    grid-template-rows: repeat(2, minmax(33.3vh, 1fr)) minmax(108px, 246px);

    width: 100vw;
    height: 100vh;
    padding: 0;
    border: 0;
    margin: 0;
`;


class Home extends Component {

	static propTypes = {
		listFavCharacters: PropTypes.array,
	};

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
			<FirstPage>
				{ notSelected
					? <Menu/>
					: <DetailCharacterHOC
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
				<SignOut/>
			</FirstPage>
		);
	}
}
export const HomeHOC = compose(
	connect((state) => ({
		listFavCharacters: state.firestore.ordered.favoriteCharacters,
	})),
	firestoreConnect([
		// Load favorite characters from firestore
		{
			collection: 'favoriteCharacters'
		}
	])
)(Home);
