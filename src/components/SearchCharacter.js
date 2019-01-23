import React from 'react';
import { connect } from 'react-redux';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { displayListCharactersWithFilter }
	from '../store/actions/listCharactersActions';
import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';


const SearchCharacter = ({ listCharacters, onFilterChange }) => (
	<Typeahead
		multiple
		dropup={true}
		maxHeight={'33.3vh'}
		maxResults={10}
		onChange={onFilterChange}
		options={listCharacters}
		labelKey={option => `${option.name}`}
	/>
);

SearchCharacter.propTypes = {
	listCharacters: PropTypes.arrayOf(
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
	onFilterChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
	return {
		onFilterChange: (filters) => {
			dispatch(displayListCharactersWithFilter(filters));
		}
	};
};
export default connect(null, mapDispatchToProps)(SearchCharacter);
