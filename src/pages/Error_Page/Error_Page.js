import React from "react";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import logo from "../../assets/logo.png";
import ErrorImage from "../../assets/Error.png";
import "../../styles/Error.css";

function ErrorPage() {
 const err = useRouteError();

 return (
   <div className="Error_container">
     <Link to="/">
       <img src={logo} alt="Logo" className="logo" />
     </Link>
     <h1>{`${err.status} : ${err.statusText}`}</h1>
     <img src={ErrorImage} alt="Error Logo" className="error-logo" />
     <h1>Oops! Something went wrong.</h1>
     <p>
       We're sorry, but it seems there was an error. Please try again later.
     </p>
   </div>
 );
}

export default ErrorPage;