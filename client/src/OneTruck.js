import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class OneTruck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truck: {reviews:[]},
      avgReview: 0,
      review: {rating:5},
      errors: {}
    }
  }

  componentDidMount() {
    let _id = this.props.match.params._id;
    axios.get(`http://localhost:8000/api/trucks/${_id}`)
      .then(res => {
        if(res.data.reviews.length === 0) {
          this.setState({truck: res.data, review: {rating:5}, avgReview: "no reviews"});
        } else {
          let a = 0;
          for(let i=0; i<res.data.reviews.length; i++) {
            a += res.data.reviews[i].rating;
          }
          a /= res.data.reviews.length;
          a = "" + a;
          if(a.length > 1) {
            a = a.substring(0,3);
          }
          this.setState({truck: res.data, review: {rating:5}, avgReview: a});
        }
      })
      .catch(err => console.log(err));
  }

  changeName = e => {
    this.setState({review: {...this.state.review, name: e.target.value}});
  }

  changeComment = e => {
    this.setState({review: {...this.state.review, comment: e.target.value}});
  }

  changeRating = e => {
    this.setState({review: {...this.state.review, rating: e.target.value}});
  }

  leaveReview = e => {
    e.preventDefault();
    let _id = this.props.match.params._id;
    axios.post(`http://localhost:8000/api/trucks/${_id}/review`, this.state.review)
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          this.setState({errors: res.data.errors.reviews.errors});
        } else {
          this.componentDidMount();
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <h1>Name: {this.state.truck.name}</h1>
        <p>Cuisine: {this.state.truck.cuisine}</p>
        <p>Average Rating: {this.state.avgReview}</p>
        {
          this.state.truck.reviews.map(review => 
            <p key={review._id}>
              <strong>{review.name} says:</strong>
              {" "}
              {review.comment}
              &nbsp;
              <em>({review.rating} Stars)</em>
            </p>
          )
        }
        <form onSubmit={this.leaveReview}>
          <input 
            type="text" 
            placeholder="Your name:" 
            onChange={this.changeName}
            value={this.state.review.name}
          />
          {
            this.state.errors.name ?
            <span>{this.state.errors.name.message}</span> :
            ""
          }
          <br/>
          <textarea 
            placeholder="Your comment:"
            onChange={this.changeComment}
            value={this.state.review.comment}
          ></textarea>
          {
            this.state.errors.comment ?
            <span>{this.state.errors.comment.message}</span> :
            ""
          }
          <br/>
          <select onChange={this.changeRating}>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select><br/>
          <input type="submit" value="Review" />
        </form>
      </>
    );
  }
}

export default OneTruck;
