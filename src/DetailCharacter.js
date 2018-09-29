import React, { Component } from 'react';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withFirestore } from 'react-redux-firebase';

import './DetailCharacter.css';
import ListAppearances from './ListAppearances';
import PropTypes from 'prop-types';


const enhance = compose(
	withFirestore, // Add props.firestore
	withHandlers({
		addFavoriteCharacter: ({ firestore, character }) => () =>
			firestore.set({ collection: 'favoriteCharacters', doc: character.id.toString()}, { character }),
		deleteFavoriteCharacter: ({ firestore, character }) => () =>
			firestore.delete({ collection: 'favoriteCharacters', doc: character.id.toString() })
	})
)


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
		onClickFavoriteStar: PropTypes.func.isRequired,
		firestore: PropTypes.shape({ // from enhance (withFirestore)
			set: PropTypes.func.isRequired,
			delete: PropTypes.func.isRequired
		}),
		addFavoriteCharacter: PropTypes.func.isRequired, // from enhance
		// (withHandlers)
		deleteFavoriteCharacter: PropTypes.func.isRequired, // from enhance (withHandlers)
	}

	constructor(props) {
		super(props);

		this.state = {
			isFavorite: this.props.character.isFavorite,
			comicsAndSeries: [],
		}
		this.didSeries = false;
		this.didComics = false;
	}

	componentDidMount() {
		this.updateComicsAndSeries(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.character.id !== nextProps.character.id &&
		 this.props.character.id !== 0) {
			this.setState({
				isFavorite: nextProps.character.isFavorite,
				comicsAndSeries: [],
			});
			this.didComics = false;
			this.didComics = false;
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
				alert("Error while getting marvel series data : " + error);
			})
	}

	getComicsOrSeries = (data, isComics) => {
		let listComicsAndSeries = [];
		let newComicsAndSeries = {};

		data.map(d => {
			newComicsAndSeries = {
				id : d.id,
				title : d.title,
				picture : d.thumbnail.path + "." +
					d.thumbnail.extension,
				urlCharacters: d.characters.collectionURI,
			}
			newComicsAndSeries.isComics = isComics;
			listComicsAndSeries.push(newComicsAndSeries);
		})
		this.setState(prevState => ({ comicsAndSeries: [...prevState.comicsAndSeries, ...listComicsAndSeries]}));
	}

	changeFavorite = () => {
		const { character } = this.props;

		const characterUpdated = character;
		characterUpdated.isFavorite = !this.state.isFavorite;
		if (!this.state.isFavorite) {
			// React-Redux v1 : this.props.addFavCharacter(character.id);
			this.props.addFavoriteCharacter(characterUpdated);
		} else {
			// React-Redux v1 :this.props.removeFavCharacter(character.id);
			this.props.deleteFavoriteCharacter(characterUpdated);
		}

		// Update the father - we have made a change
		this.props.onClickFavoriteStar(this.props.character.id, !this.state.isFavorite);
		this.setState({ isFavorite : !this.state.isFavorite});
	}

	render(){
		const { character } = this.props;
		const { comicsAndSeries, isFavorite } = this.state;

		return (
			<div id='mainCharacter'>
				<div id='mainInformation'>
					<div id='mainPicture'>
						<picture>
							{/**<source media='(max-width: 100px)'
							 srcSet={character.picture}/>**/}
							<img src={character.picture} alt={character.name}/>
						</picture>
					</div>
					<div id='mainIdentity'>
						<div id='mainCharacterName'>
							<span>
								<span>{character.name}</span>
								<span className={isFavorite ? 'isFavorite' : 'notFavorite'} onClick={this.changeFavorite}>★</span>
							</span>
						</div>
						<div id='mainCharacterDescription'>
							{character.description}
						</div>
					</div>
				</div>
				<div id='mainDetail'>
					<div id='mainDetailList'>
						<ListAppearances
							appearances={comicsAndSeries}
							onClickAppearance={this.props.onClickAppearance}
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default enhance(DetailCharacter)

/* React-Redux v1
import { connect } from 'react-redux';
import { addFavCharacter_action } from './actions/addFavoriteCharacter';
import { removeFavCharacter_action } from './actions/removeFavoriteCharacter';

const mapStateToProps = state => {
	return { listFavCharactersID: state.listFavCharactersID };
};

const mapDispatchToProps = dispatch => {
	return {
		addFavCharacter: id => dispatch(addFavCharacter_action(id)),
		removeFavCharacter: id => dispatch(removeFavCharacter_action(id))
	};
};
const DetailCharacter_wrapped = connect(mapStateToProps,mapDispatchToProps)(DetailCharacter);
export default DetailCharacter_wrapped ;*/