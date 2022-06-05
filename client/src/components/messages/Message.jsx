import React from "react";
import "bootstrap/js/dist/collapse";

function Message(props) {
  const { id, title, authorMessage, bodyMessage, dateMessage } = props;
  const date = new Date(dateMessage).toUTCString();

  return (
    <div className="card border-dark mb-3">
      <div className="card-header text-bg-secondary">
        <div className="row justify-content-between">
          <div className="col-auto me-auto">{authorMessage}</div>
          <div className="col-auto ">{date}</div>
        </div>
      </div>

      <div className="card-body text-dark">
        <div
          className="card-title"
          role="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${id}`}
          aria-expanded="false"
          aria-controls={`collapse${id}`}
        >
          <h5>{title}</h5>
          <span>press read more..</span>
        </div>

        <div className="card-text collapse" id={`collapse${id}`}>
          <div className="card card-body">{bodyMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
