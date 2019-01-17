import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withFirestore } from 'react-redux-firebase';

import ListAppearances from './ListAppearances';
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
	width: 100%;
    height: 50%;
    @media only screen and (max-height: 400px) {
        height: 0%;
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
	overflow: auto;
	width: 100%;
    height: 80%;
    padding: 0;
    border: 0;
    margin: 0;
    
    /* Color */
    background-color: white;
    
	/* Text */
    font-size: calc(4vw);
    text-align: justify;
    @media only screen and (min-width: 400px) {
        font-size: 1.15em;
    }
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
	display: flex;
	width: 100%;
    height: 20%;
    padding: 0;
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
	display: inline-block;
	vertical-align: top;
	width: 67%;
    height: 100%;
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
    margin-left: auto;
    margin-right: auto;
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
	display: inline-block;
	vertical-align:top;
	width: 33%;
    height: 100%;
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
	width: 100%;
    height: 50%;
    @media only screen and (max-height: 400px) {
        height: 100%;
    }
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
	width: 100%;
    height: 67vh;
    padding: 0;
    border: 0;
    margin: 0;
`;


class DetailCharacter extends Component {

	didSeries;
	didComics;

	static propTypes = {
		character: PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string,
			picture: PropTypes.string,
			linkComics: PropTypes.string,
			linkSeries: PropTypes.string,
			isFavorite: PropTypes.bool,
		}),
		onClickAppearance: PropTypes.func.isRequired,
		firestore: PropTypes.shape({ // from enhance (withFirestore)
			set: PropTypes.func.isRequired,
			delete: PropTypes.func.isRequired
		}),
		addFavoriteCharacter: PropTypes.func.isRequired, // from enhance
		// (withHandlers)
		deleteFavoriteCharacter: PropTypes.func.isRequired, // from enhance (withHandlers)
	};

	constructor(props) {
		super(props);

		this.state = {
			isFavorite: this.props.character.isFavorite,
			comicsAndSeries: [],
		};
		this.didComics = false;
		this.didSeries = false;
	}

	componentDidMount() {
		this.updateComicsAndSeries(this.props);
	}
	
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.props.character.id !== nextProps.character.id &&
			this.props.character.id !== 0) {
			this.setState({
				isFavorite: nextProps.character.isFavorite,
				comicsAndSeries: [],
			});
			this.didComics = false;
			this.didSeries = false;
		}
		this.updateComicsAndSeries(nextProps);
	}

	updateComicsAndSeries = (nextProps) => {
		const { linkComics, linkSeries} = nextProps.character;


		if (this.didComics && this.didSeries)
			return;

		if (!this.didComics) {
			this.didComics = true;
			this.callAPIMarvel(linkComics, true);
		}

		if (!this.didSeries) {
			this.didSeries = true;
			this.callAPIMarvel(linkSeries, false);
		}
	}

	callAPIMarvel = (url, isComics) => {
		window.document.body.style.cursor = 'wait';
		fetch(`${url}?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`, {
			method: 'GET',
			headers: {
				'Accept-encoding': 'gzip',
			}
		})
			.then(result => result.json())
			.then(
				(result) => {
					window.document.body.style.cursor = 'default';
					this.getComicsOrSeries(result.data.results, isComics);
				},
				(error) => {
					window.document.body.style.cursor = 'default';
					alert('Error while getting marvel series data : ' + error);
				});
	}

	getComicsOrSeries = (data, isComics) => {
		let listComicsAndSeries = data.map(comicsOrSerie => {
			return {
				id : comicsOrSerie.id,
				title : comicsOrSerie.title,
				picture : comicsOrSerie.thumbnail.path + '.' +
					comicsOrSerie.thumbnail.extension,
				urlCharacters: comicsOrSerie.characters.collectionURI,
				isComics: isComics,
			};
		});
		this.setState(prevState => ({ comicsAndSeries: [...prevState.comicsAndSeries, ...listComicsAndSeries]}));
	}

	changeFavorite = () => {
		const { character } = this.props;

		const characterUpdated = character;
		characterUpdated.isFavorite = !this.state.isFavorite;
		if (!this.state.isFavorite) {
			/* React-Redux v1 :
			this.props.favaddFavCharacter(character.id); */
			this.props.addFavoriteCharacter(characterUpdated);
		} else {
			/* React-Redux v1 :
			this.props.removeFavCharacter(character.id);*/
			this.props.deleteFavoriteCharacter(characterUpdated);
		}

		this.setState({ isFavorite : !this.state.isFavorite});
	}

	render(){
		const { character } = this.props;
		const { comicsAndSeries, isFavorite } = this.state;

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
								<span className={isFavorite ? 'isFavorite' : 'notFavorite'} onClick={this.changeFavorite}>★</span>
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
							onClickAppearance={this.props.onClickAppearance}
						/>
					</WrapperListAppearances>
				</DisplayAppearances>
			</DisplayDetails>
		);
	}
}
export const DetailCharacterHOC = compose(
	withFirestore, // Add props.firestore
	withHandlers({
		addFavoriteCharacter: ({ firestore, character }) => () =>
			firestore.set({ collection: 'favoriteCharacters', doc: character.id.toString()}, { character }),
		deleteFavoriteCharacter: ({ firestore, character }) => () =>
			firestore.delete({ collection: 'favoriteCharacters', doc: character.id.toString() })
	})
)(DetailCharacter);

/* React-Redux v1
import { connect } from 'react-redux';
import { addFavCharacter_action } from './actions/addFavoriteCharacter';
import { removeFavCharacter_action } from './actions/removeFavoriteCharacter';

const mapStateToProps = state => {
	return { listFavCharacters: state.listFavCharacters };
};

const mapDispatchToProps = dispatch => {
	return {
		addFavCharacter: id => dispatch(addFavCharacter_action(id)),
		removeFavCharacter: id => dispatch(removeFavCharacter_action(id))
	};
};
const DetailCharacter_wrapper =
 connect(mapStateToProps,mapDispatchToProps)(DetailCharacter);
export default DetailCharacter_wrapper ;*/
