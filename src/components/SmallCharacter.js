import React from 'react';

import './SmallCharacter.css';
import PropTypes from 'prop-types';


const SmallCharacter = ({ character, onClick }) => (
	<div className='character' onClick={() => onClick(character)} >
		<picture>
			{/**<source media='(max-width: 100px)' srcSet={picture}/>**/}
			<img src={character.picture} alt={character.name} />
			<div className='characterName'>
				<span>{character.name}</span>
			</div>
		</picture>
	</div>
)


SmallCharacter.propTypes = {
	character: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string,
		picture: PropTypes.string,
		linkComics: PropTypes.string,
		linkSeries: PropTypes.string,
		isFavorite: PropTypes.bool,
	}),
	onClick: PropTypes.func.isRequired,
}

export default SmallCharacter;