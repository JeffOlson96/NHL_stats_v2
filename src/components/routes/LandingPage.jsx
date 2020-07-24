import React, { Component, useState, useEffect } from 'react';
import history from '../../helpers/history';
import { Link } from 'react-router-dom';

const goToLogin = () => {
    history.push("/login");
}

const info_style = {
    fontFamily: "Candara"
}


const LandingPage = () => (
    <div className="LandingPage">
        <div className="about_Jeff" style={info_style}>
            <p>Full-Stack data visualization application for interacting with NHL player data</p>
            <p>
                This version includes the use of Redux and React-routes for the client-side of the application.
                The server-side uses MSSQL server and Express.js as a RESTful api for the client to use for authentication and data
                Data interaction is done using d3.js for data formatting and svg representation, creating a unique look into player data across the league.
            </p>
            <a href="https://github.com/JeffOlson96">Check out the github to see the source code</a>
            <p>Email for contact: jeffreyolson224@gmail.com</p>
        </div>
        <button className="btn btn-primary" onClick={goToLogin}>
            Login
        </button>
    </div>
);

export default LandingPage;