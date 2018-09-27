import React, {Component} from 'react';

import './DetailCharacter.css';
import {API_KEY} from './App';
import ListAppearances from './ListAppearances';
import PropTypes from 'prop-types';

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
			}),
		displayInfoAppearance: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			idCharacter: 0,
			comicsAndSeries: []
		}
		this.didSeries = false;
		this.didComics = false;
	}

	componentDidMount() {
		this.updateComicsAndSeries(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.idCharacter !== nextProps.character.id &&
		 this.state.idCharacter !== 0) {
			this.setState({ idCharacter: 0, comicsAndSeries: []});
			this.didComics = false;
			this.didComics = false;
		}
		this.updateComicsAndSeries(nextProps);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (nextState.idCharacter !== 0);
	}

	updateComicsAndSeries = (nextProps) => {
		const {id, linkComics, linkSeries} = nextProps.character;

		if (this.didComics && this.didSeries)
			return;

		if (!this.didComics) {
			this.didComics = true;
			this.callAPIMarvel(linkComics, id, true);
		}

		if (!this.didSeries) {
			this.didSeries = true;
			this.callAPIMarvel(linkSeries, id, false);
		}
	}

	callAPIMarvel = (url, id, isComics) => {
		window.document.body.style.cursor = "wait";
		fetch(`${url}?apikey=${API_KEY}`, {
			method: 'GET',
			headers: {
				'Accept-encoding': 'gzip',
			}
		})
		.then(result => result.json())
		.then(
			(result) => {
				window.document.body.style.cursor = "default";
				this.getComicsOrSeries(result.data.results, id, isComics);
			},
			(error) => {
				window.document.body.style.cursor = "default";
				alert("Error while getting marvel series data : " + error);
			})
	}

	getComicsOrSeries = (data, id, isComics) => {
		let listComicsAndSeries = [];
		let newComicsAndSeries = {};

		data.map(d => {
			newComicsAndSeries = {
				id : d.id,
				title : d.title,
				picture : d.thumbnail.path + "." +
					d.thumbnail.extension,
				listCharacters: d.characters.collectionURI,
			}
			newComicsAndSeries.isComics = isComics;
			listComicsAndSeries.push(newComicsAndSeries);
		})
		this.setState(prevState => ({ idCharacter : id,
			comicsAndSeries: [...prevState.comicsAndSeries, ...listComicsAndSeries]}));
	}

	render(){
		const { character } = this.props;
		const { comicsAndSeries } = this.state;

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
							<span>{character.name}</span>
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
							onClickAppearance={this.props.displayInfoAppearance}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default DetailCharacter;