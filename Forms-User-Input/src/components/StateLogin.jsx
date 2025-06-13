import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength, isEqualsToOtherValue } from "../util/validation.js"
import { useInput } from "../hooks/useInput.jsx";
export default function Login() {

  // const [enteredValue, setEnteredValue] = useState({
  //   email: '', password: ''
  // })

  // const [didEdit, setDidEdit] = useState({
  //   email: false, password: false
  // })


  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError

  } = useInput('', (value) => {
    return isEmail(value) && isNotEmpty(value)
  });


  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError
  } = useInput('', (value) => hasMinLength(value, 6) && isNotEmpty(value)
  );



  // const emailIsInvalid = didEdit.email && !isEmail(enteredValue.email) && !isNotEmpty(enteredValue.email)
  //const passwordIsInvalid = didEdit.passwrod && !hasMinLength(enteredValue.password, 6); //!enteredValue.passwrod.trim().length < 6


  // function handleInputChange(identifier, event) {
  //   setEnteredValue((prevValues) => ({
  //     ...prevValues,
  //     [identifier]: event.target.value
  //   }))

  //   setDidEdit(prevEdit => ({
  //     ...prevEdit,
  //     [identifier]: false
  //   }));
  // }

  // function handleInputBlur(identifier) {
  //   setDidEdit(prevEdit => ({
  //     ...prevEdit,
  //     [identifier]: true
  //   }));

  // }

  function handleSubmit(event) {
    event.preventDefault();
    if(emailHasError || passwordHasError){
      return; 
    }
    console.log(emailValue, passwordValue);
   // setEnteredValue({});
  }




  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {/* <div className="control-row">
        <Input label="Email"
          id="email"
          type="email" name="email"
          onChange={(event) => handleInputChange('email', event)}
          onBlur={() => { handleInputBlur('email') }}
          value={enteredValue.email}
          error={emailIsInvalid && 'Please enter a valid email'}

        /> */}
      <div className="control-row">
        <Input label="Email"
          id="email"
          type="email" name="email"
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          value={emailValue}
          error={emailHasError && 'Please enter a valid email'}

        />
        <Input label="Password"
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && 'Please enter a valid password'}


        />

      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button" onClick={handleSubmit}>Login</button>
      </p>
    </form>
  );
}
