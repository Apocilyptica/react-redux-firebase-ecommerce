import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./styles.scss";
import { connect } from "react-redux";
import { auth, handleUserProfile } from "../../firebase/utils";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../Forms/FormInput";
import Button from "../Forms/Button";

const Signup = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const err = ["Password Don't match"];
      setErrors(err);
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await handleUserProfile(user, { displayName });
      resetForm();
      props.history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: "Registration",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            handleChange={(e) => setDisplayName(e.target.value)}
          />
          <FormInput type="text" name="email" value={email} placeholder="Email" handleChange={(e) => setEmail(e.target.value)} />
          <FormInput type="password" name="password" value={password} placeholder="Password" handleChange={(e) => setPassword(e.target.value)} />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(Signup);
