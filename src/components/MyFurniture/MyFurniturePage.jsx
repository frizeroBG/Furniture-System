import React, { Component } from 'react';
import { getMyFurniture } from '../../api/remote';
import FurnitureList from '../HomePage/FurnitureList'

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }

    //bind
    this.getDate = this.getDate.bind(this);
  }

  componentDidMount() {
    this.getDate();
  }

  async getDate() {
    let data = await getMyFurniture();
    this.setState({data})
  }

  render() {
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Profile Page</h1>
            <p>Listing  your furniture.</p>

          </div>
        </div>
        <FurnitureList deleteBtn="true" props={this.state.data} />
      </div>
    )
  }
}