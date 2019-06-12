import React from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button'; 
export const Header = () => (
  <header>
    <nav>
      <Link to="/" className="statbut">
        <Button color="default">HOME</Button>
      </Link>

      <Link to="/stats" className="statbut">
        <Button color="default">STATS</Button>
      </Link>
    </nav>
  </header>
);
