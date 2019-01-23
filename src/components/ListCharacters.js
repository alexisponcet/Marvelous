import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SmallCharacter from './SmallCharacter';
import SearchCharacter from './SearchCharacter';
import PropTypes from 'prop-types';


const DisplayCharacters = styled.div`
	/* Positioning */
    position: relative;
    top: 0;
    left: 0;
  
    /* Display & Box Model */
    @media only screen and (max-width: 520px) {
        display: flex;
        flex-direction: row;
    }
    overflow-y: auto;
    flex-wrap: wrap;
    width: auto;
    height: auto;
    min-height: 108px;
    max-height: 212px;
    padding: 0;
    border: solid black 4px;
    margin: 0;
    
    /* Other */
    user-select: none;
}
`;

const WrapperCharacters = styled.section`
	/* Positioning */
    position: relative;
    top: 0;
    left: 0;
    
    /* Display & Box Model */
    grid-row: 3;
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
    padding: 0;
    border: 0;
    margin: 0;
`;


class ListCharacters extends Component {

	static propTypes = {
		appearance: PropTypes.shape({
			id: PropTypes.number,
			url: PropTypes.string,
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
			listCharactersWithFilter: PropTypes.arrayOf(
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
		}),
	}
	
	shouldComponentUpdate(nextProps) {
		if (nextProps.appearance.id !== this.props.appearance.id ||
			nextProps.appearance.listCharactersWithFilter !== this.props.appearance.listCharactersWithFilter)
			return true;
		return false;
	}
	
	render() {
		const { listCharacters, listCharactersWithFilter } = this.props.appearance;

		return (
			<WrapperCharacters>
				<DisplayCharacters>
					{
						listCharactersWithFilter.map(character =>
							<SmallCharacter
								character={character}
								key={character.id}
							/>
						)
					}
				</DisplayCharacters>
				
				<SearchCharacter
					listCharacters = {Object.values(listCharacters)}
				/>
			</WrapperCharacters>
		);
	}
}

const mapStateToProps = state => {
	return {
		appearance: state.appearance
	};
};
export default connect(mapStateToProps)(ListCharacters);
