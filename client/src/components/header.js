import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
export const Header = () => (
  <header>
    <nav>
      <Link to="/" className="statbut">
        <Button color="primary">HOME</Button>
      </Link>

      <Link to="/stats" className="statbut">
        <Button color="primary">STATS</Button>
      </Link>
    </nav>
  </header>
);
