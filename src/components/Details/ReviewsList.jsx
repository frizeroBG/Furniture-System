import React, { Component } from 'react';
import { listReviews } from '../../api/remote';
import Review from './Review';

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    }

    //bind
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    let data = await listReviews(this.props.id);
    this.setState({ reviews: data })
  }

  render() {
    return (
      <div className="col-md-8">
        {this.state.reviews.map((review, index) => {
          return <Review key={index} data={review} />
        })}
      </div>
    )
  }
}