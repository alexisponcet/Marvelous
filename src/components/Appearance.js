import React from 'react';

import './Appearance.css';
import PropTypes from 'prop-types';


const Appearance = ({ id, title, picture, urlCharacters, isComics, onClick }) => (
	<div className='appearance'>
		<div className={isComics ? 'isComics appearancePicture' : 'isSeries appearancePicture'}>
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
	urlCharacters: PropTypes.string,
	isComics: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
}

export default Appearance;