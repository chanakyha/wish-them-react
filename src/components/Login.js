import React from "react";
import "./Login.css";
import "../firebase";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import GoogleSVG from "../svg/GoogleLogo.svg";

function Login(props) {
  const navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/");
    }
  });

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        // ...
      });
  };

  return (
    <div className="login text-center card">
      <div className="card-header">
        <h1>Login With Google Account to Continue</h1>
      </div>
      <div className="card-body">
        <div onClick={googleLogin} className="btn btn-outline-success">
          <img src={GoogleSVG} alt="" />
          &nbsp; Login with Google
        </div>
      </div>
      <div className="card-footer">
        <a target="_blank" href="https://chanakyha-coder.xyz">
          About Me
        </a>
      </div>
    </div>
  );
}

export default Login;
