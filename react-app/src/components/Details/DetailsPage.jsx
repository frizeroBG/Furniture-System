import React, { Component } from 'react';
import { getDetails, likeFurniture } from '../../api/remote';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import toastr from 'toastr'

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }

    //bind
    this.getData = this.getData.bind(this);
    this.like = this.like.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    let data = await getDetails(this.props.match.params.id)
    this.setState({ data })
  }

  async like(){
    let res = await likeFurniture(this.props.match.params.id);
    if(!res.success){
      toastr.error(res.message);
      return;
    }
    toastr.success(res.message);
  }

  render() {
    let data = this.state.data;
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Furniture Details</h1>
          </div>
        </div>
        <div className="row space-top">
          <div className="col-md-4">
            <div className="card text-white bg-primary">
              <div className="card-body">
                <blockquote className="card-blockquote">
                  <img src={data.image} alt="Furniture" />
                </blockquote>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <p>Make: {data.make}</p>
            <p>Model: {data.model}</p>
            <p>Year: {data.year}</p>
            <p>Description: {data.description}</p>
            <p>Price: {data.price}</p>
            <p>Material: {data.material}</p>
            <button onClick={this.like} className="btn btn-primary">Like</button>
          </div>
        </div>
        <div className="row space-top">
          <ReviewForm props={this.props} id={this.props.match.params.id} />
          <ReviewsList id={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}