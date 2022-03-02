import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import EachRec from "./EachRec";
import "./MainScreen.css";

import { db } from "../firebase";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const showToast = (message) => {
    toast(message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

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
    ).then((status) => {
      setNewName("");
      setNewCategory("");
      setNewBirthdate("");
      setDisplayAddRecState(0);

      showToast("👌 Successfully added the Record to the Database");
    });
  };

  const [fireData, setFireData] = useState([
    { name: "Loading..", category: "Loading", birthday: "Loading" },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);
        setphotoURL(user.photoURL);
        setuserEmail(user.email);
      } else {
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    console.log(userEmail);
    if (userEmail) {
      onSnapshot(
        query(collection(db, userEmail), orderBy("birthday")),
        (snapshot) => {
          setFireData(
            snapshot.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
          );
        }
      );
    }
  }, [userEmail]);

  console.log(fireData);

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
          <div className="card-body ">
            <div className="row">
              {fireData.length == 0 ? (
                <h1 className="text-center">The is no Data Please Add some</h1>
              ) : (
                fireData.map((data) => (
                  <EachRec
                    key={data.key}
                    name={data.name}
                    date={data.birthday}
                    category={data.category}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default MainScreen;
