import React from "react";

export const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/"></a>
        </div>
      </nav>
    </header>
  );
};
