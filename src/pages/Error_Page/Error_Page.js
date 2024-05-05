import React from "react";
import logo from "../../assets/logo.png";
import Error from "../../assets/Error.png"
import "../../styles/Error.css";
import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
    const err=useRouteError();
  return (
    <div className="Error_container">
      
      <Link to="/"><img alt="Logo" className="logo" src={logo}/></Link>
      <h1>{err.status+ " : " +err.statusText}</h1>
      <img alt="Logo" className="logo" src={Error}/>

      <h1>Oops! Something went wrong.</h1>
      <p>
        We're sorry, but it seems there was an error. Please try again later.
      </p>    </div>
  );
}

export default ErrorPage;
