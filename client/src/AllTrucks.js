import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {
  Link
} from 'react-router-dom';

class AllTrucks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trucks: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/trucks")
      .then(res => this.setState({trucks: res.data}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <h1>All Trucks</h1>
        {
          this.state.trucks.map( truck => 
            <fieldset key={truck._id}>
              <legend><strong>{truck.name}</strong></legend>
              <p>Cuisine: {truck.cuisine}</p>
              {/* <p>Avg. Rating: {truck.reviews.reduce((a, c) => a + c.rating, 0)/truck.reviews.length}</p> */}
              <Link to={"/trucks/" + truck._id}>View</Link>
            </fieldset>
          )
        }
      </>
    );
  }
}

export default AllTrucks;
