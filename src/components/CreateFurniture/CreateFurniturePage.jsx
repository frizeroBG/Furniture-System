import React, { Component } from 'react';
import Input from '../common/Input';
import { createFurniture } from '../../api/remote';
import toastr from 'toastr'

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      make: '',
      model: '',
      year: '',
      description: '',
      price: '',
      image: '',
      material: '',

      makeHasError: '',
      modelHasError: '',
      yearHasError: '',
      descriptionHasError: '',
      priceHasError: '',
      imageHasError: '',
    }

    //bind
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.create = this.create.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.create();
  }

  async create() {
    let furnitureData = {
      make: this.state.make,
      model: this.state.model,
      year: Number(this.state.year),
      description: this.state.description,
      price: Number(this.state.price),
      image: this.state.image,
      material: this.state.material,
    }
    let res = await createFurniture(furnitureData);
    if (!res.success) {
      console.log(res);
      if (res.errors.hasOwnProperty('description')) {
        this.setState({ descriptionHasError: "true" });
      }
      else {
        this.setState({ descriptionHasError: "false" });
      }

      if (res.errors.hasOwnProperty('image')) {
        this.setState({ imageHasError: "true" });
      }
      else {
        this.setState({ imageHasError: "false" });
      }

      if (res.errors.hasOwnProperty('make')) {
        this.setState({ makeHasError: "true" });
      }
      else {
        this.setState({ makeHasError: "false" });
      }

      if (res.errors.hasOwnProperty('model')) {
        this.setState({ modelHasError: "true" });
      }
      else {
        this.setState({ modelHasError: "false" });
      }

      if (res.errors.hasOwnProperty('price')) {
        this.setState({ priceHasError: "true" });
      }
      else {
        this.setState({ priceHasError: "false" });
      }

      if (res.errors.hasOwnProperty('year')) {
        this.setState({ yearHasError: "true" });
      }
      else {
        this.setState({ yearHasError: "false" });
      }
      toastr.error(res.message)
      return
    }
    toastr.success(res.message)
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
          </div>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="row space-top">
            <div className="col-md-4">
              <div className="form-group">
                <Input
                  name="make"
                  label="Make"
                  value={this.state.make}
                  onChange={this.onChangeHandler}
                  error={this.state.makeHasError}
                />
              </div>
              <div className="form-group">
                <Input
                  name="model"
                  label="Model"
                  value={this.state.model}
                  onChange={this.onChangeHandler}
                  error={this.state.modelHasError}
                />
              </div>
              <div className="form-group">
                <Input
                  name="year"
                  label="Year"
                  type="number"
                  value={this.state.year}
                  onChange={this.onChangeHandler}
                  error={this.state.yearHasError}
                />
              </div>
              <div className="form-group">
                <Input
                  name="description"
                  label="Description"
                  value={this.state.description}
                  onChange={this.onChangeHandler}
                  error={this.state.descriptionHasError}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <Input
                  name="price"
                  label="Price"
                  type="number"
                  value={this.state.price}
                  onChange={this.onChangeHandler}
                  error={this.state.priceHasError}
                />
              </div>
              <div className="form-group">
                <Input
                  name="image"
                  label="Image"
                  value={this.state.image}
                  onChange={this.onChangeHandler}
                  error={this.state.imageHasError}
                />
              </div>
              <div className="form-group">
                <Input
                  name="material"
                  label="Material (optional)"
                  value={this.state.material}
                  onChange={this.onChangeHandler}
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Create" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}