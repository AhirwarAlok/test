import React from "react";
import { useState, useEffect } from "react";
import PasswordChecklist from "react-password-checklist";

function UseRegistraion() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.gender) {
      errors.gender = "Gender is required!"; 
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Gender</label>
            <div className="ui radio checkbox" style={{ marginRight: "1rem" }}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formValues.gender === "male"}
                onChange={handleChange}
              />
              <label>Male</label>
            </div>
            <div className="ui radio checkbox">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formValues.gender === "female"}
                onChange={handleChange}
              />
              <label>Female</label>
            </div>
          </div>
          <p>{formErrors.gender}</p>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Please confirm Password"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <PasswordChecklist
            rules={["capital", "match", "specialChar", "minLength", "number"]}
            minLength={8}
            value={formValues.password}
            valueAgain={formValues.confirmPassword}
          />
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UseRegistraion;
