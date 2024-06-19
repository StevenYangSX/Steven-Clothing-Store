import { useState } from "react";
import FormInput from "../form-input/FormInput.component";
import Button from "../button/Button.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";
import "./signinForm.styles.scss";
import { MessageProps } from "../../types/systemTypes";
import Message from "../message/Message";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [message, setMessage] = useState<MessageProps | null>(null);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log("==>?response ==> ", response);
      resetFormFields();
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          setMessage({
            type: "error",
            content: error.code,
            showTime: 3,
          });
      }
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleDisappear = () => {
    setMessage(null); // Update the state to reflect the message has disappeared
  };

  return (
    <div className="sign-in-container">
      {message ? (
        <Message
          type={message.type}
          content={message.content}
          showTime={message.showTime}
          onDisappear={handleDisappear}
        />
      ) : null}
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit" buttonType="inverted">
            Sign In
          </Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
