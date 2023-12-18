import React from "react";

function Post(inputProps) {
  return (
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <strong><h2 className="mb-0">{inputProps.title}</h2></strong>
       <h3>{inputProps.plot}</h3>
      </div>
      <div className="col-auto d-none d-lg-block">
      <img style={{height: '300px'}} src={inputProps.poster} alt="poster" />

      </div>
    </div>
  );
}

export default Post;