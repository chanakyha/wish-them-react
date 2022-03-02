import React, { useState } from "react";
import "./EachRec.css";

import PenSVG from "bootstrap-icons/icons/pencil-square.svg";
import XCircleSVG from "bootstrap-icons/icons/x-circle.svg";

function EachRec(props) {
  var daysMain = "";

  const subtractDates = () => {
    let givenDate = props.date.split("-");
    let dateFormat = `${givenDate[1]}/${givenDate[2]}/${givenDate[0]}`;

    console.log(dateFormat);

    let day1 = new Date(dateFormat);
    let day2 = new Date();

    day2 = new Date(
      day2.getMonth() + 1 + "/" + day2.getDate() + "/" + day2.getFullYear()
    );

    let difference = Math.abs(day2 - day1);
    let days = difference / (1000 * 3600 * 24);
    daysMain = days;
  };

  subtractDates();

  return (
    <div className="eachrec col-sm-3 col-md-6 col-lg-3">
      <div className="card">
        <div className="card-header text-center">{props.category}</div>
        <div className="card-body">
          <h5 className="card-title">
            <b>Name:</b> {props.name}
          </h5>
          <p className="card-text">
            <b>Birthday:</b> {props.date}
          </p>
          <div className="btn-group">
            <a
              onClick={() => {
                props.onDelete(props.id);
              }}
              href="#"
              className="btn btn-outline-danger"
            >
              Delete
            </a>
            <a
              onClick={() => {
                props.onEdit(props.id, {
                  name: props.name,
                  birthday: props.date,
                  category: props.category,
                });
              }}
              href="#"
              className="btn btn-outline-primary"
            >
              Edit
            </a>
            <a href="#" className="btn btn-outline-success">
              Remaind
            </a>
          </div>
        </div>
        <div className="card-footer text-center text-muted">
          {daysMain} days left
        </div>
      </div>
    </div>
  );
}

export default EachRec;
