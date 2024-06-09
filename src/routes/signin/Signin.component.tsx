import React from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
const Signin = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log("...", user);
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <>
      <h1>Signin</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </>
  );
};

export default Signin;
