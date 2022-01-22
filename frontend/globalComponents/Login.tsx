import React, { ReactElement, Component, useState } from "react";
import Api from "../API/loginAPI";

interface Props {
  hideSelf: Function;
}

const Login: React.FC<Props> = ({ hideSelf }): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (ev): void => {
    ev.preventDefault();
    Api.login(
      {
        username: username,
        password: password,
      },
      (loadedList, revealDelay) => {
        hideSelf(revealDelay);
      },
      (errMsg) => {
        console.log(errMsg);
      }
    );
  };

  const logout = (): void => {
    Api.logout(
      (err) => {
        hideSelf(0);
      },
      (errMsg) => {
        console.log(errMsg);
      }
    );
  };

  const updateUsername = (val: string): void => {
    setUsername(val);
  };

  const updatePassword = (val: string): void => {
    setPassword(val);
  };

  return (
    <div id="loginModal">
      <form onSubmit={login}>
        <input
          onChange={(ev) => updateUsername(ev.target.value)}
          placeholder="Username"
        ></input>
        <input
          onChange={(ev) => updatePassword(ev.target.value)}
          placeholder="Password"
        ></input>
        <input type="submit" value="Login"></input>
      </form>
      <button onClick={() => logout()} className="logout">
        Logout
      </button>
    </div>
  );
};

Login.displayName = "Login component";

export default Login;
