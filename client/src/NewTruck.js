import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class NewTrucks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truck: {}
    }
  }

  addTruck = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/trucks", this.state.truck)
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          console.log(res.data.errors);
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => console.log(err));
  }

  changeName = e => {
    this.setState({truck: {...this.state.truck, name:e.target.value}});
  }

  changeCuisine = e => {
    this.setState({truck: {...this.state.truck, cuisine:e.target.value}});
  }

  render() {
    return (
      <>
        <h1>New Truck</h1>
        <form onSubmit={this.addTruck}>
          <input 
            type="text" 
            placeholder="Name" 
            onChange={this.changeName}
          />
          <br/>
          <input 
            type="text" 
            placeholder="Cuisine" 
            onChange={this.changeCuisine}  
          />
          <br/>
          <input type="submit" value="Create" />
        </form>
      </>
    );
  }
}

export default NewTrucks;
