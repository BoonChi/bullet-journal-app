import React from "react";
//import "./App.css";
import "react-bootstrap";
import NavbarMenu from "./components/navbar/NavbarMenu";
const App: React.FC = () => {
  return (
    <div className="App">
      <NavbarMenu></NavbarMenu>
    </div>
  );
};

export default App;
