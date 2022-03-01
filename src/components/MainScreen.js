import React, { useState } from "react";
import Navbar from "./Navbar";
import "./MainScreen.css";

import FolderPlusSVG from "bootstrap-icons/icons/folder-plus.svg";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function MainScreen(props) {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setphotoURL] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      setDisplayName(user.displayName);
      setphotoURL(user.photoURL);
    } else {
      navigate("/login");
    }
  });

  return (
    <div className="mainscreen">
      <Navbar displayName={displayName} photoURL={photoURL} />
      <div className="container">
        <div className="card text-center mainscreen__content">
          <div className="card-header">
            <div className="btn btn-outline-primary">
              Add Record &nbsp;
              <img src={FolderPlusSVG} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
