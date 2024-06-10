import "./button.styules.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

type ButtonType = "google" | "inverted";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType: ButtonType;
}

const Button: React.FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
