import React from "react";
import "./EachRec.css";

import PenSVG from "bootstrap-icons/icons/pen.svg";
import XCircleSVG from "bootstrap-icons/icons/x-circle.svg";

function EachRec(props) {
  return (
    <div className="eachrec">
      <div className="card p-2 main-container">
        <div className="element-container">
          <div className="p-3 mx-3 card date-container text-center">
            <h4>{props.date}</h4>
          </div>
          <div className="p-3 mx-3 card info">
            <h2>Name: {props.name}</h2>
            <p className="text-muted">Category: {props.category}</p>

            <div className="m-1 btn btn-outline-primary">
              Edit &nbsp; <img src={PenSVG} alt="" />
            </div>
            <div className="m-1 btn btn-outline-danger">
              Delete &nbsp; <img src={XCircleSVG} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachRec;
