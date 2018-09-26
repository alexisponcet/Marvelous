import React, { Component } from 'react';

import './App.css';
import DetailCharacter from "./DetailCharacter";
import ListCharacters from './ListCharacters';

class App extends Component {
  render() {
    return (
      <div id="marvel">
	      <DetailCharacter
	      />

          <ListCharacters/>
      </div>
    );
  }
}

export default App;
