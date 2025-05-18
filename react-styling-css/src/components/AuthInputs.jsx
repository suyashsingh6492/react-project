import { useState } from "react";
import { styled } from "styled-components";
import Button from './Button.jsx';
import Input from './Input.jsx'
export default function AuthInputs() {
  const ControlContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  `;



  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlContainer>
        <Input label="Email" invalid={emailNotValid} type="email" onChange={(event) => handleInputChange("email", event.target.value)} />
        <Input label="password" invalid={passwordNotValid} type="password" onChange={(event) => handleInputChange("password", event.target.value)} />


        {/* <div className="controls"> */}
        {/* <p>
          <Lable invalid={emailNotValid} label="Email"
          // className={`label ${emailNotValid ? "invalid" : undefined} `}
          >
            Email
          </Lable>
          <Input
            type="email" invalid={emailNotValid}
            // className={emailNotValid ? "invalid" : undefined}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </p>
        <p>
          <Lable $invalid={passwordNotValid}>Password</Lable>
          <Input
            type="password"
            className={passwordNotValid ? "invalid" : undefined}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </p> */}
        {/* </div> */}
      </ControlContainer>
      <div className="actions">
        <Button type="button" className="text-button">
          Create a new account
        </Button>
        <Button className="button" onClick={handleLogin}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

