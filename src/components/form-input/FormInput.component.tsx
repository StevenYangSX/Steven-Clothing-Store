import "./formInput.sytles.scss";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const FormInput: React.FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value && otherProps.value.toString().length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
