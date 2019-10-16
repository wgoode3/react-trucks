import React, { Component } from 'react';
import './App.css';
import AllTrucks from './AllTrucks';
import NewTruck from './NewTruck';
import OneTruck from './OneTruck';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <h1>Food Trucks</h1>
        <Link to="/">Home</Link>
        &nbsp;
        <Link to="/new">New Truck</Link>
        <Route exact path="/" component={AllTrucks} />
        <Route path="/new" component={NewTruck} />
        <Route path="/trucks/:_id" component={OneTruck} />
      </BrowserRouter>
    );
  }
}

export default App;
