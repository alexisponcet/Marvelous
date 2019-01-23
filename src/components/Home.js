import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import Menu from './Menu';
import DetailCharacterHOC from './DetailCharacter';
import ListCharacters from './ListCharacters';
import SignOut from './SignOut';
import { fetchCharacters } from '../store/actions/listCharactersActions';
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
		character: PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			description: PropTypes.string,
			picture: PropTypes.string,
			linkComics: PropTypes.string,
			linkSeries: PropTypes.string,
			isFavorite: PropTypes.bool,
		}).isRequired,
		appearanceID: PropTypes.number.isRequired,
		appearanceURL: PropTypes.string.isRequired,
		listFavCharacters: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
				description: PropTypes.string,
				picture: PropTypes.string,
				linkComics: PropTypes.string,
				linkSeries: PropTypes.string,
				isFavorite: PropTypes.bool,
			})
		),
		fetchCharacters: PropTypes.func.isRequired
	};

	static URL_CHARACTERS = 'http://gateway.marvel.com/v1/public/characters';
	
	UNSAFE_componentWillReceiveProps(nextProps){
		if (nextProps.appearanceID !== this.props.appearanceID) {
			this.props.fetchCharacters(nextProps.appearanceURL, nextProps.listFavCharacters);
		} else if ((typeof this.props.listFavCharacters === 'undefined' &&
			typeof nextProps.listFavCharacters !== 'undefined')) {
			this.props.fetchCharacters(Home.URL_CHARACTERS, nextProps.listFavCharacters);
		}
	}
	
	shouldComponentUpdate(nextProps) {
		if ((typeof this.props.listFavCharacters === 'undefined' &&
			typeof nextProps.listFavCharacters !== 'undefined') ||
			(Object.keys(this.props.character).length === 0 &&
				Object.keys(nextProps.character).length !== 0)) {
			return true;
		}
		return false;
	}

	render() {
		const { character, listFavCharacters } = this.props;
		const notSelected = (Object.keys(character).length === 0);

		return (
			<FirstPage>
				{ notSelected
					? <Menu/>
					: <DetailCharacterHOC/>
				}

				{ isLoaded(listFavCharacters)
					&&
					<ListCharacters/>
				}
				<SignOut/>
			</FirstPage>
		);
	}
}
const HomeHOC = compose(
	connect((state) => ({
		character: state.character,
		appearanceID: state.appearance.id,
		appearanceURL: state.appearance.url,
		listFavCharacters: state.firestore.ordered.favoriteCharacters
	}), { fetchCharacters }),
	firestoreConnect([{
		collection: 'favoriteCharacters' // Load favorite characters from firestore
	}])
)(Home);
export default HomeHOC;
