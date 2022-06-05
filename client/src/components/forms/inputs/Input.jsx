import React from "react";

function Input(props) {
  return (
    <div className="form-floating mb-3">
      <input
        id={props.htmlId}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        placeholder={props.placeholder}
        className={`form-control ${props.invalidSubmit ? "is-invalid" : ""}`}
      />
      <label htmlFor={props.htmlId}>{props.placeholder}</label>
      {props.children}
    </div>
  );
}

export default Input;
