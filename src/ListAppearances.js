import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './ListAppearances.css';

import Appearance from './Appearance';
import PropTypes from 'prop-types';

const ListAppearances = ({ appearances, onClickAppearance }) => (
		<Scrollbars id='listingAppearances'
		            renderView={props => <div {...props}
		                                      style={{ ...props.style, ...{backgroundColor: `black`} }}/>}>
			{
				appearances.map(appearance =>
					<Appearance
						id={appearance.id}
						title={appearance.title}
						picture={appearance.picture}
						isComics={appearance.isComics}
						urlCharacters={appearance.urlCharacters}
						onClick={onClickAppearance}
						key={appearance.id}
					/>
				)
			}
		</Scrollbars>
)

ListAppearances.propTypes = {
	appearances: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			picture: PropTypes.string,
			isComics: PropTypes.bool,
			urlCharacters: PropTypes.string,
		})
	),
	onClickAppearance: PropTypes.func.isRequired,
}

export default ListAppearances;