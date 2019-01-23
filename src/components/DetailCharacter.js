import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { withFirestore } from 'react-redux-firebase';

import ListAppearances from './ListAppearances';
import { addFavoriteCharacter, deleteFavoriteCharacter }from '../store/actions/characterActions';
import { updateListCharactersWithSwitchFav } from '../store/actions/listCharactersActions';
import PropTypes from 'prop-types';


const WrapperListAppearances = styled.div`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	overflow: auto;
	width: 98%;
    height: 90%;
    padding: 0;
    border: 0;
    margin: 1em auto;
`;

const DisplayAppearances = styled.div`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	grid-row: 2;
	width: auto;
    height: auto;
    @media only screen and (max-height: 400px) {
        display: none;
	}
    padding: 0;
    border: 0.2em solid black;
    margin: 0;
`;

const DisplayDescription = styled.div`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	grid-row: 2 / 6;
	overflow: auto;
	width: auto;
    height: auto;
    padding: 0;
    border: 0;
    margin: 0;
    
    /* Color */
    background-color: white;
    
	/* Text */
    font-size: calc(4vw);
    @media only screen and (min-width: 400px) {
        font-size: 1.15em;
    }
    text-align: justify;
`;

const DisplayName = styled.div`
	/* Positioning */
	position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

	/* Display & Box Model */
	width: auto;
    height: auto;
    padding: 0;
    border: 0;
    margin: 0;
    
    & span {
        /* Positioning */
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        
        /* Display & Box Model */
        display: inline-block;
    }
    
    & .notFavorite, & .isFavorite:hover {
        /* Color */
        color: white;
        
        /* Other */
        cursor: pointer;
    }
    
    & .isFavorite, & .notFavorite:hover {
        /* Color */
        color: orange;
        
        /* Other */
        cursor: pointer;
    }
`;

const WrapperName = styled.div`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	grid-row: 1;
	display: flex;
	width: auto;
    height: auto;
    padding: 0;
    border: 0;
    border-bottom: 0.2em solid black;
    margin: 0;
    
    /* Color */
    background-color: #FF4136;
    color: white;
    
	/* Text */
    font-size: 0.5em;
    font-weight: bold;
    @media only screen and (min-width: 800px) and (min-height: 600px) {
        font-size: 2.3em;
    }
    @media only screen  and (min-width: 600px) and (min-height: 400px) {
        font-size: 1.8em;
    }
	@media only screen  and (min-width: 400px) and (min-height: 200px) {
        font-size: 1.3em;
    }
`;

const DisplayIdentity = styled.div`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	grid-column: 2 / 4;
	display: grid;
    grid-template-rows: repeat(5, 1fr);
	width: auto;
    height: auto;
    padding: 0;
    border: 0.2em solid black;
    margin: 0;
`;

const DisplayImage = styled.img`
	/* Positioning */
	position: absolute;
    top: 0;
    left: 0;

	/* Display & Box Model */
	width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    margin: 0 auto 0 auto;
`;

const DisplayPicture = styled.picture`
	/* Positioning */
	position: absolute;
    top: 0;
    left: 0;

	/* Display & Box Model */
	width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    margin: 0;
`;

const WrapperPicture = styled.div`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	grid-column: 1;
	width: auto;
    height: auto;
    padding: 0;
    border: 0.2em solid black;
    margin: 0;
`;

const DisplayInfo = styled.div`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	grid-row: 1;
	@media only screen and (max-height: 400px) {
        grid-row: 1 / 3;
    }
	display: grid;
    grid-template-columns: repeat(3, 1fr);
	width: auto;
    height: auto;
    padding: 0;
    border: 0.1em solid black;
    margin: 0;
`;

const DisplayDetails = styled.section`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	grid-row: 1 / 3;
	display: grid;
    grid-template-rows: repeat(2, 1fr);
	width: auto;
    height: auto;
    padding: 0;
    border: 0;
    margin: 0;
`;


class DetailCharacter extends Component {

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
		listCharacters: PropTypes.objectOf(
			PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
				description: PropTypes.string,
				picture: PropTypes.string,
				linkComics: PropTypes.string,
				linkSeries: PropTypes.string,
				isFavorite: PropTypes.bool,
			})
		).isRequired,
		updateListCharactersWithSwitchFav: PropTypes.func.isRequired,
		firestore: PropTypes.shape({ // from enhance (withFirestore)
			set: PropTypes.func.isRequired,
			delete: PropTypes.func.isRequired
		}),
		addFavoriteCharacter: PropTypes.func.isRequired,
		addFavoriteCharacterIntoDB: PropTypes.func.isRequired,
		deleteFavoriteCharacter: PropTypes.func.isRequired,
		deleteFavoriteCharacterFromDB: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		
		this.state = {
			comicsAndSeries: [],
		};
	}

	componentDidMount() {
		this.fetchComicsAndSeries(this.props);
	}
	
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.character.id !== this.props.character.id) {
			this.setState({ comicsAndSeries: [] });
			this.fetchComicsAndSeries(nextProps);
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.character.id !== this.props.character.id ||
			nextProps.character.isFavorite !== this.props.character.isFavorite ||
			nextState.comicsAndSeries !== this.state.comicsAndSeries) {
			return true;
		}
		return false;
	}

	fetchComicsAndSeries = async (nextProps) => {
		const { linkComics, linkSeries } = nextProps.character;
		
		await Promise.all([this.callAPIMarvel(linkComics), this.callAPIMarvel(linkSeries)]).then(results => {
			this.composeFormattedComicsAndSeries([...results[0], ...results[1]]);
		});
	}
	
	callAPIMarvel = async (url) => {
		window.document.body.style.cursor = 'wait';
		try {
			const response = await fetch(`${url}?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`, {
				method: 'GET',
				headers: {
					'Accept-encoding': 'gzip',
				}
			});
			if (!response.ok)
				throw Error(response.statusText);
			const result = await response.json();
			return result.data.results;
		} catch (error) {
			alert('Error while getting marvel series data : ' + error);
		} finally {
			window.document.body.style.cursor = 'default';
		}
	}
	
	composeFormattedComicsAndSeries = (data) => {
		let formattedComicsAndSeries = data.map(comicsOrSerie => {
			return {
				id : comicsOrSerie.id,
				title : comicsOrSerie.title,
				picture : comicsOrSerie.thumbnail.path + '.' +
					comicsOrSerie.thumbnail.extension,
				urlDisplayCharacters: comicsOrSerie.characters.collectionURI,
				isComics: comicsOrSerie.hasOwnProperty('comics'),
			};
		});
		this.setState({ comicsAndSeries: formattedComicsAndSeries });
	}

	changeFavorite = () => {
		const { character, addFavoriteCharacter, deleteFavoriteCharacter } = this.props;
		
		if (!character.isFavorite) {
			addFavoriteCharacter();
		} else {
			deleteFavoriteCharacter();
		}
	}

	render(){
		const { character } = this.props;
		const { comicsAndSeries } = this.state;
		
		return (
			<DisplayDetails>
				<DisplayInfo>
					<WrapperPicture>
						<DisplayPicture>
							{/**<source media='(max-width: 100px)'
							 srcSet={character.picture}/>**/}
							<DisplayImage src={character.picture} alt={character.name}/>
						</DisplayPicture>
					</WrapperPicture>
					<DisplayIdentity>
						<WrapperName>
							<DisplayName>
								<span>{character.name}</span>
								<span className={character.isFavorite ? 'isFavorite' : 'notFavorite'} onClick={this.changeFavorite}>★</span>
							</DisplayName>
						</WrapperName>
						<DisplayDescription>
							{character.description}
						</DisplayDescription>
					</DisplayIdentity>
				</DisplayInfo>
				<DisplayAppearances>
					<WrapperListAppearances>
						<ListAppearances
							appearances={comicsAndSeries}
						/>
					</WrapperListAppearances>
				</DisplayAppearances>
			</DisplayDetails>
		);
	}
}
const DetailCharacterHOC = compose(
	connect((state) => ({
		character: state.character,
		listCharacters: state.appearance.listCharacters
	}), { updateListCharactersWithSwitchFav }),
	withFirestore, // Add props.firestore
	withHandlers({
		addFavoriteCharacterIntoDB: ({ firestore, character }) => () =>
			firestore.set({collection: 'favoriteCharacters', doc: character.id.toString()}, {...character, isFavorite: true}),
		deleteFavoriteCharacterFromDB: ({ firestore, character }) => () =>
			firestore.delete({ collection: 'favoriteCharacters', doc: character.id.toString() })
	}),
	withHandlers({
		addFavoriteCharacter: ({ character, listCharacters, updateListCharactersWithSwitchFav,
			dispatch, firestore, addFavoriteCharacterIntoDB }) => () => {
			dispatch(addFavoriteCharacter(character));
			addFavoriteCharacterIntoDB({firestore, character});
			updateListCharactersWithSwitchFav(listCharacters, firestore.get({ collection: 'favoriteCharacters'}));
		},
		deleteFavoriteCharacter: ({ character, listCharacters, updateListCharactersWithSwitchFav,
			dispatch, firestore, deleteFavoriteCharacterFromDB }) => () => {
			dispatch(deleteFavoriteCharacter(character));
			deleteFavoriteCharacterFromDB({firestore, character});
			updateListCharactersWithSwitchFav(listCharacters, firestore.get({ collection: 'favoriteCharacters'}));
		},
	})
)(DetailCharacter);
export default DetailCharacterHOC;
