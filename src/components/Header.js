import React from "react";

function Header(props) {
  return (
    <div className="Header">
      <div>
        <h1 className="title">Edvora</h1>
      </div>
      <div className="profile">
        <h3 className="user">{props.name}</h3>
        <img src={props.avatar} alt="avatar" className="avatar" />
      </div>
    </div>
  );
}

export default Header;
