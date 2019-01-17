import React from 'react';

import { Scrollbars } from 'react-custom-scrollbars';
import Appearance from './Appearance';
import PropTypes from 'prop-types';


const ListAppearances = ({ appearances, onClickAppearance }) => (
	<Scrollbars style={{
		'position': 'relative',
		'top': '0',
		'left': '0',
		'overflowX': 'auto',
		'width': '100%',
		'height': '100%',
		'padding': '0',
		'border': 0,
		'margin': '0',
		'whiteSpace': 'nowrap',
		'userSelect': 'none'}}
	renderView={props => <div {...props} style={{ ...props.style, ...{backgroundColor: 'black'} }}/>}>
		{
			appearances.map(appearance =>
				<Appearance
					title={appearance.title}
					picture={appearance.picture}
					urlCharacters={appearance.urlCharacters}
					isComics={appearance.isComics}
					onClick={onClickAppearance}
					key={appearance.id}
				/>
			)
		}
	</Scrollbars>
);

ListAppearances.propTypes = {
	appearances: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			picture: PropTypes.string,
			urlCharacters: PropTypes.string,
			isComics: PropTypes.bool,
		})
	),
	onClickAppearance: PropTypes.func.isRequired,
	style: PropTypes.object
};
export default ListAppearances;
