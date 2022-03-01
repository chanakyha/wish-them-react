import React, { useState } from "react";
import Navbar from "./Navbar";

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

  document.querySelector("body").style.backgroundColor = props.bgColor;
  return (
    <div className="mainscreen">
      <Navbar displayName={displayName} photoURL={photoURL} />
      <h1>Hello</h1>
    </div>
  );
}

export default MainScreen;
