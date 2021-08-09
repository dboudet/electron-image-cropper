import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import Hello from './components/Hello';
import Photos from './components/Photos';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/photos" component={Photos} />
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
