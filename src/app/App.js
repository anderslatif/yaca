import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import WhatsOnYourMindAnimation from '../components/whats_on_your_mind/Animation';
import KaleidoscopeAnimation from '../components/kaleidoscope/Animation';
import Tadpoles from '../components/we_are_tadpoles/Tadpoles';
import Home from '../components/home/Home';

function App() {
  return (
      <Router>
          <Route path="/" exact component={Home} />
          <Route path="/whats_on_your_mind" exact component={WhatsOnYourMindAnimation} />
          <Route path="/1" exact component={WhatsOnYourMindAnimation} />
          <Route path="/kaleidoscope" exact component={KaleidoscopeAnimation} />
          <Route path="/2" exact component={KaleidoscopeAnimation} />
          <Route path="/tadpoles" exact component={Tadpoles} />
          <Route path="/3" exact component={Tadpoles} />
      </Router>
  );
}

export default App;
