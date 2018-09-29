import React from 'react';
import MarvelImage from './images/menu1.jpg';
import './Menu.css';

const Menu = () => (
	<div id='menu'>
		<picture>
			<img src={MarvelImage} alt ='Marvel'/>
		</picture>
	</div>
)

export default Menu;