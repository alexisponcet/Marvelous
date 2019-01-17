import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';


const SearchCharacter = ({ listCharacters, onChange }) => (
	<Typeahead
		multiple
		dropup={true}
		maxHeight={'33.3vh'}
		maxResults={10}
		onChange={onChange}
		options={listCharacters}
		labelKey={option => `${option.name}`}
	/>
);

SearchCharacter.propTypes = {
	listCharacters: PropTypes.array,
	onChange: PropTypes.func.isRequired,
};
export default SearchCharacter;
