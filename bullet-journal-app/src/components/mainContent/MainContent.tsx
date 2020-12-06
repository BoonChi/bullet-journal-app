import React from "react";
import "./MainContent.css";
import Picture from "./mainContent.png";
const MainContent: React.FC = () => {
  return (
    <div>
      <img src={Picture} alt="default"></img>
    </div>
  );
};

export default MainContent;
