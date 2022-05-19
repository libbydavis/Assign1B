import "./App.css";
import { createContext, useState } from "react";

const LoginDefaultStatus = {
  loggedIn: false,
  setLoggedIn: (loggedIn) => {},
};

export const LoginContext = createContext(LoginDefaultStatus);

function App() {
  const [loggedIn, setLoggedIn] = useState(LoginDefaultStatus.loggedIn);
  const value = { loggedIn, setLoggedIn };

  return (
    <div className="App">
      <p>
        Welcome to SPEED. Search for articles based on software engineering
        topics or submit an article of your own.
      </p>
    </div>
  );
}

export default App;
