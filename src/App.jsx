import React, { Component } from 'react';
import WaifuViewer from './views/WaifuViewer';
import { Container, Segment } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Segment style={{ backgroundColor: '#efefef' }}>
          <WaifuViewer />
        </Segment>
      </Container>
    );
  }
}

export default App;
