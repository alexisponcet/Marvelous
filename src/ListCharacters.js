import React from 'react';
import './ListCharacters.css';

import SmallCharacter from './SmallCharacter';
import PropTypes from 'prop-types';

const ListCharacters = ({ characters, onClickCharacter }) => (
	<div id='listingCharacters'>
		{
			characters.map(character =>
				<SmallCharacter
					id={character.id}
					name={character.name}
					picture={character.picture}
					onClick={onClickCharacter}
					key={character.id}
				/>
			)
		}
	</div>
)

ListCharacters.propTypes = {
	characters: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			picture: PropTypes.string,
		})
	),
	onClickCharacter: PropTypes.func.isRequired,
}

export default ListCharacters;