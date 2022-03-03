import React from "react";
import "./EachRec.css";

import XCircleSVG from "bootstrap-icons/icons/x-circle.svg";
import PencilSquareSVG from "bootstrap-icons/icons/pencil-square.svg";

function EachRec(props) {
  var daysMain = "";

  const subtractDates = () => {
    var myBirthday, today, bday, diff, days;
    myBirthday = [
      parseInt(props.date.split("-")[2]),
      parseInt(props.date.split("-")[1]),
    ]; // 6th of February
    today = new Date();
    bday = new Date(today.getFullYear(), myBirthday[1] - 1, myBirthday[0]);
    if (today.getTime() > bday.getTime()) {
      bday.setFullYear(bday.getFullYear() + 1);
    }
    diff = bday.getTime() - today.getTime();
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
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
            <b>Birthday:</b> {props.date.split("-").reverse().join("/")}
          </p>
          <div className="btn-group">
            <a
              onClick={() => {
                props.onDelete(props.id);
              }}
              href="#"
              className="btn btn-outline-danger"
            >
              Delete &nbsp; <img src={XCircleSVG} alt="" />
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
              Edit &nbsp; <img src={PencilSquareSVG} alt="" />
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
