import React from 'react';
import './Appearance.css';

import PropTypes from 'prop-types';

const Appearance = ({ id, title, picture, isComics, urlCharacters, onClick }) => (
	<div className='appearance'>
		<div className={isComics ? 'isComics pictureAppearance' : 'isSeries pictureAppearance'}>
			<picture>
				{/**<source media='(max-width: 100px)' srcSet={picture}/>**/}
				<img src={picture} alt={title} onClick={() => onClick(urlCharacters)}/>
			</picture>
		</div>
		<div className='nameAppearance'>
			<span>{title}</span>
		</div>
	</div>
)

Appearance.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	picture: PropTypes.string,
	isComics: PropTypes.bool,
	urlCharacters: PropTypes.string,
	onClick: PropTypes.func.isRequired,
}

export default Appearance;