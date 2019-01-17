import React from 'react';
import styled from 'styled-components';

import SmallMarvelImage from './../assets/images/menu1.jpg';
import BigMarvelImage from './../assets/images/menu2.jpg';


const Main = styled.section`
	/* Positioning */
    position: relative;
    top: 0;
    left: 0;
  
    /* Display & Box Model */
    grid-row: 1 / 3;
    width: auto;
    height: auto;
    padding: 0;
    border: 0;
    margin: 0;
`;

const DisplayHomeScreen = styled.div`
	/* Positioning */
    position: relative;
    top: 0;
    left: 0;
  
    /* Display & Box Model */
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    margin: 0 auto 0 auto;

    /* Filler */
    background-size: 100% 100%;
    background-image: url(${SmallMarvelImage});
    @media only screen and (min-width: 520px) {
        background-image: url(${BigMarvelImage});
    }
`;


const Menu = () => (
	<Main>
		<DisplayHomeScreen alt ='Marvel'/>
	</Main>
);

export default Menu;
