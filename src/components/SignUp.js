import { useState } from "react";
import FormInput from "./FormInput";
import { TiTick } from "react-icons/ti";
import { AiOutlineCloseCircle } from "react-icons/ai";
const SignUp = () => {
  const [values, setValues] = useState({
    fullName: "",
    contactNumber: null,
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ error: null, msg: "" });
  const [response, setResponse] = useState([]);

  const formData = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Full Name*",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]*{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "contactNumber",
      type: "tel",
      placeholder: "012-345-6789",
      errorMessage: "Sorry, this contact number is not valid.Please try again",
      label: "Contact Number",
      required: true,
      pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Enter email *",
      errorMessage: "Sorry, this email address is not valid.Please try again",
      label: "Email",
      required: true,
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
    },
    {
      id: 4,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthdate",
      errorMessage: "Year cannot be empty",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const formValidation = () => {
    if (
      values.fullName === "" ||
      values.password === "" ||
      values.birthday === "" ||
      values.email === "" ||
      values.confirmPassword === "" ||
      values.password !== values.password ||
      values.contactNumber === null
    ) {
      setMessage({
        error: true,
        msg: "There was an error creating the account",
      });
    }
  };
  const handleSubmit = async () => {
    formValidation();
   
    if (values.password !== values.confirmPassword) return;
   
    const postData = {
      full_name: values.fullName,
      contact_number: values.contactNumber,
      date_of_birth: values.birthday,
      email: values.email,
      password: values.password,
    };
    const responseData = await fetch(process.env.REACT_APP_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const resultData = await responseData.json();
    setResponse(resultData);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };



  return (
    <>
      <div className="signUp">
        <div>
          <h5 className="signUp__Title">Creat User Account</h5>
          <form className="signUp__Form">
            {message.msg.length > 0 && (
              <>
                {/* {message.error ? (
                  <div className="signUp__Success danger slide-in-fwd-center">
                    <AiOutlineCloseCircle size="16" />
                    <h3 className="signUp__Message">
                      {message?.msg} {message.error}
                    </h3>
                  </div>
                ) : (
                  <div className="signUp__Success success slide-in-fwd-center">
                    <TiTick />
                    <h3 className="signUp__Message">{message?.msg}</h3>
                  </div>
                )} */}
                {response !== undefined &&
                response?.title !== "Registration Error" ? (
                  <div className="signUp__Success success slide-in-fwd-center">
                    <TiTick />
                    <h3 className="signUp__Message">{response?.description}</h3>
                  </div>
                ) : (
                  <div className="signUp__Success danger slide-in-fwd-center">
                    <AiOutlineCloseCircle size="16" />
                    <h3 className="signUp__Message">{response?.description}</h3>
                  </div>
                )}
              </>
            )}

            {formData.map((data) => (
              <FormInput
                key={data.id}
                {...data}
                value={values[formData.name]}
                onChange={onChange}
              />
            ))}
          </form>
          <div className="signUp__Buttons">
            <input type="button" className="signUp__Button" value="Cancel" />
            <input
              type="button"
              className="button__Color signUp__Button"
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
