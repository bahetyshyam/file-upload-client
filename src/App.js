import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Main />
      </Router>
    </>
  );
};

export default App;
