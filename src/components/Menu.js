import React from 'react';

import './Menu.css';
import MarvelImage from './../images/menu1.jpg';


const Menu = () => (
	<div id='menu'>
		<picture>
			<img src={MarvelImage} alt ='Marvel'/>
		</picture>
	</div>
)

export default Menu;