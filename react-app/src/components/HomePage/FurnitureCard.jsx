import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const deleteBtn = props.deleteBtn;
  props = props.props
  return (
    <div className="col-md-4">
      <div className="card text-white bg-primary">
        <div className="card-body">
          <blockquote className="card-blockquote">
            <img src={props.image} alt="Furniture" />
            <p>{props.description}</p>
            <footer>Someone famous in
                               <cite title="Source Title"> {props.make}</cite>
            </footer>
            <div className="pull-right">
              {localStorage.getItem('authToken') && <Link to={"/details/" + props.id} className="btn btn-info">Details</Link>}
              {deleteBtn === "true" && <Link to={"/furniture/delete/" + props.id} className="btn btn-danger">Delete Item</Link>}
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  )
}