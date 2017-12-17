import React from 'react';

export default (data) => {
  data = data.data;
  return (  
        <div className="card text-black bg-light">
          <div className="card-body">
            <blockquote className="card-blockquote">
              <p>{data.comment}</p>
              <footer>Rating {data.rating}
                              <cite title="Source Title"> by {data.user}</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      
  )
}