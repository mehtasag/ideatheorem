import React, { useState } from "react";
import "./FormInput.css";
const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focused, setOnFocused] = useState(false);
  const handleFocus = () => {
    setOnFocused(true);
  };
  return (
    <div className="signUp__InputDiv">
      <label className="signUp__InputName">{label}</label>
      <input
        {...inputProps}
        onBlur={handleFocus}
        onChange={onChange}
        className="signUp__Input"
        onFocus={() =>
          inputProps.name === "confirmPassword" && setOnFocused(true)
        }
        focused={focused.toString()}
        required
      />
      <span className="signUp__Error">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
