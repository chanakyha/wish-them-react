import React from "react";
import "./Login.css";
import "../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleSVG from "../svg/GoogleLogo.svg";

function Login(props) {
  const navigate = useNavigate();

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
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
    </div>
  );
}

export default Login;
