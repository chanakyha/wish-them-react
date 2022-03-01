import React, { useState } from "react";
import Navbar from "./Navbar";
import "./MainScreen.css";

import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import FolderPlusSVG from "bootstrap-icons/icons/folder-plus.svg";
import PlusCircleSVG from "bootstrap-icons/icons/plus-circle.svg";
import XCircleSVG from "bootstrap-icons/icons/x-circle.svg";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function MainScreen(props) {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const [userEmail, setuserEmail] = useState("");

  const [displayAddRecState, setDisplayAddRecState] = useState(0);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newBirthdate, setNewBirthdate] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setDisplayName(user.displayName);
      setphotoURL(user.photoURL);
      setuserEmail(user.email);
    } else {
      navigate("/login");
    }
  });

  const displayAddRec = () => {
    setDisplayAddRecState(1);
  };

  const removeAddRec = () => {
    setDisplayAddRecState(0);
    console.log(newBirthdate, newCategory);
  };

  const addFireRec = (e) => {
    e.preventDefault();
    setDoc(
      doc(db, userEmail, newName),
      {
        name: newName,
        category: newCategory,
        birthday: newBirthdate,
      },
      { merge: true }
    );

    setNewName("");
    setNewCategory("");
    setNewBirthdate("");
    setDisplayAddRecState(0);
  };

  return (
    <div className="mainscreen">
      <Navbar displayName={displayName} photoURL={photoURL} />
      <div className="container">
        <div className="card mainscreen__content">
          <div className="card-header">
            {displayAddRecState ? (
              <form className="text-left">
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Person Name
                  </label>
                  <input
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                    value={newName}
                    className="form-control"
                    type="text"
                    id="name"
                  />
                </div>
                <div className="mb-3">
                  <label for="category" className="form-label">
                    Category
                  </label>
                  <select
                    onChange={(e) => {
                      setNewCategory(e.target.value);
                    }}
                    value={newCategory}
                    className="form-control"
                    type="text"
                    id="category"
                  >
                    <option hidden>Select</option>
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="birthday" className="form-label">
                    Birthday
                  </label>
                  <input
                    onChange={(e) => {
                      setNewBirthdate(e.target.value);
                    }}
                    value={newBirthdate}
                    className="form-control"
                    type="date"
                    id="birthday"
                  />
                </div>
                <div className="mb-3 text-center">
                  <button
                    onClick={addFireRec}
                    className="btn btn-outline-primary"
                    disabled={!newName || !newBirthdate || !newCategory}
                  >
                    Add Birthday <img src={PlusCircleSVG} alt="" />
                  </button>
                  &nbsp;
                  <button
                    onClick={removeAddRec}
                    className="btn btn-outline-danger"
                  >
                    Cancel <img src={XCircleSVG} alt="" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div
                  onClick={displayAddRec}
                  className="btn btn-outline-primary"
                >
                  Add Record &nbsp;
                  <img src={FolderPlusSVG} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
