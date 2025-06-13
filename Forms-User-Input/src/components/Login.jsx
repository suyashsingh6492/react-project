import { useRef, useState } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const email = useRef('')
  const password = useRef('')

  function handleSubmit(event) {
    event.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail);
    console.log(enteredPassword);

    const emailIsValid = enteredEmail.includes('@');

    if (emailIsValid == false) {
      setEmailIsInvalid(true);
      return;
    }
    setEmailIsInvalid(false);
    console.log('Sending http req...')

  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email"
            type="email"
            name="email"
            ref={email}
          />
          <div className="control-error"> {emailIsInvalid && <p>Please enter a valid email address</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password"
            type="password"
            name="password"
            ref={password}

          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button" onClick={handleSubmit}>Login</button>
      </p>
    </form>
  );
}
