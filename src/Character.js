import React from 'react';

import './Character.css';

import PropTypes from 'prop-types';

const Character = ({ id, name, picture, onClick }) => (
	<div className='character'>
		<picture>
			<source media="(max-width: 100px)" srcSet={picture}/>
			<img src={picture} alt={name} />
			<div className='characterName' onClick={() => onClick(id)}>
				<span>{name}</span>
			</div>
		</picture>
	</div>
)

Character.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	picture: PropTypes.string,
	onClick: PropTypes.func.isRequired,
}

export default Character;