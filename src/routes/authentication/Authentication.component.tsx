import SignInForm from "../../components/signin-form/SigninForm";
import SignUpForm from "../../components/signup-form/SignupForm.component";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
