import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { displayInfoCharacter } from '../store/actions/characterActions';
import PropTypes from 'prop-types';


const DisplayName = styled.span`
	/* Positioning */
    position: relative;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  
    /* Display & Box Model */
    display: inline-block;
    width: auto;
    height: auto;
    padding: 0;
    border: 0;
    margin: 0;
`;

const WrapperDisplayName = styled.div`
	/* Positioning */
    position: absolute;
    top: 0;
    left: 0;
  
    /* Display & Box Model */
    display: none;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    margin: 0;
    
    /* Color */
    background-color: #FF4136;
    color: white;
    
    /* Text */
    font-size: calc(3vw);
    text-align: center;
    font-weight: bold;
    @media only screen and (min-width: 520px) {
        font-size: 1.12em;
    }
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
    border: 0;
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
    
    /* Other */
    cursor: pointer;
`;

const DisplayCharacter = styled.div`
	/* Positioning */
    position: relative;
    top: 0;
    left: 0;
  
    /* Display & Box Model */
    display: inline-block;
    flex: 1 1 calc(100% / 5 - 0.4em);
    width: 100px;
    height: 100px;
    padding: 0;
    border: 0.1em solid black;
    margin: 0;
    
    /* Color */
    background-color: black;
    
    &:hover ${WrapperDisplayName} {
        display: block;
    }
`;


const SmallCharacter = ({ character, onCharacterClick }) => (
	<DisplayCharacter  onClick={() => onCharacterClick(character)}>
		<DisplayPicture>
			{/**<DisplaySource media='(max-width: 100px)' srcSet={picture}/>**/}
			<DisplayImage src={character.picture} alt={character.name} />
			<WrapperDisplayName>
				<DisplayName>{character.name}</DisplayName>
			</WrapperDisplayName>
		</DisplayPicture>
	</DisplayCharacter>
);

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
	onCharacterClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
	return {
		onCharacterClick: (character) => {
			dispatch(displayInfoCharacter(character));
		}
	};
};
export default connect(null, mapDispatchToProps)(SmallCharacter);
