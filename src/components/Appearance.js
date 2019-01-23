import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import switchAppearance from '../store/actions/appearanceActions';
import PropTypes from 'prop-types';


const DisplayName = styled.div`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	display: flex;
	overflow-y: auto;
	width: 100%;
    height: 22%;
    padding: 0;
    padding-bottom: 1em;
    border: 0.1em solid black;
    margin: 0;
    
	/* Color */
	background-color: black;
    color: white;
   
    /* Text */
    font-size: 0.8em;
    text-align: center;
    white-space: pre-wrap;
`;

const DisplayImage = styled.img`
	/* Positioning */
	position: absolute;
    top: 0;
    left: 0;

	/* Display & Box Model */
	width: 100%;
    height: 100%;
    padding: 0;
    border: 0.5em solid;
    margin: 0 auto 0 auto;
`;

const DisplayPicture = styled.picture`
	/* Positioning */
    position: absolute;
    top: 0;
    left: 0;
  
    /* Display & Box Model */
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    margin: 0;
    
    & .isComics {
        border-color: deepskyblue;
    }
    
    & .isSeries {
        border-color: coral;
    }
    
    /* Other */
    cursor: pointer;
`;

const WrapperPicture = styled.div`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	width: 100%;
    height: 78%;
    padding: 0.2em;
    border: 0;
    margin: 0;
`;

const DisplayAppearance = styled.div`
	/* Positioning */
	position: relative;
    top: 0;
    left: 0;

	/* Display & Box Model */
	display: inline-block;
	width: 120px;
    height: 100%;
    padding: 0;
    border: 0;
    margin: 0 1em 0 1em;
`;


const Appearance = ({ appearance, onAppearanceClick}) => (
	<DisplayAppearance>
		<WrapperPicture>
			<DisplayPicture onClick={() => onAppearanceClick(appearance.id, appearance.urlDisplayCharacters)}>
				{/**<DisplaySource media='(max-width: 100px)'
				 srcSet={picture}/>**/}
				<DisplayImage src={appearance.picture} alt={appearance.title} className={appearance.isComics ? 'isComics' : 'isSeries'}/>
			</DisplayPicture>
		</WrapperPicture>
		<DisplayName>
			<span>{appearance.title}</span>
		</DisplayName>
	</DisplayAppearance>
);

Appearance.propTypes = {
	appearance : PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		picture: PropTypes.string,
		urlDisplayCharacters: PropTypes.string,
		isComics: PropTypes.bool,
	}),
	onAppearanceClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
	return {
		onAppearanceClick: (id, url) => {
			dispatch(switchAppearance(id, url));
		}
	};
};
export default connect(null, mapDispatchToProps)(Appearance);
