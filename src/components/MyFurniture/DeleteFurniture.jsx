import React from 'react';
import { Redirect } from 'react-router-dom'
import { deleteFurniture } from '../../api/remote';
import toastr from 'toastr';

export default (props) => {
  removeFurniture(props.match.params.id)
  window.location.reload()

  return (
      <Redirect to="/profile" />
  )
}

async function removeFurniture(id) {
  let res = await deleteFurniture(id)
  if (!res.success) {
    toastr.error(res.message)
    return
  }
  toastr.success(res.message)
  this.props.history.push('/');
}