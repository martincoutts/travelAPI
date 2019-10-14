import React from "react";
// Importing background image from assets folder
const clouds = require("../assets/clouds.svg");
// Inline styles to allow background image
const headerStyle = {
  backgroundImage: `url('${clouds}')`,
  // backgroundPosition: `bottom -100px right -300px`,
  backgroundRepeat: `no-repeat` /*Prevent showing multiple background images*/,
  backgroundSize: `cover`
};

const Header = () => {
  return (
    <header className="header" style={headerStyle}>
      <div id="header-title-container">
        <h1>Travel Dash</h1>
      </div>
    </header>
  );
};

export default Header;
