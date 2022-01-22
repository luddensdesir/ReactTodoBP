import React, { ReactElement, Component, useState } from "react";
import Api from "../API/loginAPI";

interface Props {
  hideSelf: Function,
  showSelf: Function
};

const Register:React.FC<Props> = ({hideSelf, showSelf}): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const register = (event) => {
    event.preventDefault();
    Api.register({
      username: username,
      password: password,
      email: email,
    });
  };

  const updateUsername = (val) => {
    setUsername(val);
  };

  const updateEmail = (val) => {
    setEmail(val);
  };

  const updatePassword = (val) => {
    setPassword(val);
  };

  return (
    <div id="registerModal">
      <form onSubmit={register}>
        <input
          onChange={(ev) => updateUsername(ev.target.value)}
          placeholder="Username"
        />
        <input
          onChange={(ev) => updatePassword(ev.target.value)}
          placeholder="Password"
        />
        <input
          onChange={(ev) => updateEmail(ev.target.value)}
          placeholder="EmailAddress"
        />
        <input type="submit" value="Register"></input>
      </form>
    </div>
  );
};

Register.displayName = "Register component";
export default Register;
