import React from "react";

function FormCard(props) {
  return (
    <div className="row justify-content-md-center">
      <div className="col-md-auto col-lg-5">
        <div className="card text-center">
          <div className="card-header">{props.titleForm}</div>
          <div className="card-body ">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default FormCard;
