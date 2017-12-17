import React from 'react';
import FurnitureCard from './FurnitureCard';

export default (props) => {
  const deleteBtn = props.deleteBtn;
  props = props.props
  return (
    <div className="row space-top">
      {props.map(furnitere => {
        return <FurnitureCard deleteBtn={deleteBtn} key={furnitere.id} props={furnitere} />
      })}
      
    </div>
  )
}

