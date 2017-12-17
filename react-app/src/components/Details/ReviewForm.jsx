import React, { Component } from 'react';
import { createReview } from '../../api/remote';
import toastr from 'toastr';

export default class RevieForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 3,
      comment: '',
      buttonOneClass: 'btn btn-primary',
      buttonTwoClass: 'btn btn-primary',
      buttonThreeClass: 'btn btn-primary',
      buttonFourClass: 'btn btn-secondary',
      buttonFiveClass: 'btn btn-secondary',
    }

    //bind
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    
    this.onButtonOneClick = this.onButtonOneClick.bind(this);
    this.onButtonTwoClick = this.onButtonTwoClick.bind(this);
    this.onButtonThreeClick = this.onButtonThreeClick.bind(this);
    this.onButtonFourClick = this.onButtonFourClick.bind(this);
    this.onButtonFiveClick = this.onButtonFiveClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async onSubmit(e) {
    e.preventDefault();
    const data ={
      rating: this.state.rating,
      comment: this.state.comment
    }
    let res = await createReview(this.props.id,data);
    console.log('in')
    if(!res.success){
      toastr.error(res.message)
      return
    }
    toastr.success(res.message)
    console.log(this.props)
    this.props.props.history.push('/details/' + this.props.id);
  }

  onButtonOneClick() {
    this.setState({
      buttonOneClass: 'btn btn-primary',
      buttonTwoClass: 'btn btn-secondary',
      buttonThreeClass: 'btn btn-secondary',
      buttonFourClass: 'btn btn-secondary',
      buttonFiveClass: 'btn btn-secondary',
      rating: 1
    })
  }

  onButtonTwoClick() {
    this.setState({
      buttonOneClass: 'btn btn-primary',
      buttonTwoClass: 'btn btn-primary',
      buttonThreeClass: 'btn btn-secondary',
      buttonFourClass: 'btn btn-secondary',
      buttonFiveClass: 'btn btn-secondary',
      rating: 2
    })
  }

  onButtonThreeClick() {
    this.setState({
      buttonOneClass: 'btn btn-primary',
      buttonTwoClass: 'btn btn-primary',
      buttonThreeClass: 'btn btn-primary',
      buttonFourClass: 'btn btn-secondary',
      buttonFiveClass: 'btn btn-secondary',
      rating: 3
    })
  }

  onButtonFourClick() {
    this.setState({
      buttonOneClass: 'btn btn-primary',
      buttonTwoClass: 'btn btn-primary',
      buttonThreeClass: 'btn btn-primary',
      buttonFourClass: 'btn btn-primary',
      buttonFiveClass: 'btn btn-secondary',
      rating: 4
    })
  }

  onButtonFiveClick() {
    this.setState({
      buttonOneClass: 'btn btn-primary',
      buttonTwoClass: 'btn btn-primary',
      buttonThreeClass: 'btn btn-primary',
      buttonFourClass: 'btn btn-primary',
      buttonFiveClass: 'btn btn-primary',
      rating: 5
    })
    
  }

  render() {
    return (
      <div className="col-md-8">
        <form onSubmit={this.onSubmit}>
          <legend>Leave a review</legend>
          <div className="form-group">
            <textarea name="comment" value={this.state.comment} onChange={this.onChange} className="form-control"></textarea>
          </div>
          <div className="form-group">
            <label>Rating</label>
            <div className="btn-group mr-2" role="group" aria-label="First group">
              <button onClick={this.onButtonOneClick} type="button" className={this.state.buttonOneClass}>*</button>
              <button onClick={this.onButtonTwoClick} type="button" className={this.state.buttonTwoClass}>*</button>
              <button onClick={this.onButtonThreeClick} type="button" className={this.state.buttonThreeClass}>*</button>
              <button onClick={this.onButtonFourClick} type="button" className={this.state.buttonFourClass}>*</button>
              <button onClick={this.onButtonFiveClick} type="button" className={this.state.buttonFiveClass}>*</button>
            </div>
            <input type="submit" className="btn btn-primary" value="Submit review" />
          </div>
        </form>
      </div>
    )
  }
}