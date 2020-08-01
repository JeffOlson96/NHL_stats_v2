import React from 'react';
import { Link } from 'react-router-dom';



export default function SideBar() {
    const sidebar_style = {
        backgroundColor: "#ccffcc",
        position: "absolute",
        zOrder: 0,
        width: "290px"
    }
    return (
        <div id="sidecontainer" style={sidebar_style}>
            Sidebar
            <br></br>
            Link to Github
            <br></br>
            Link to LinkedIn
            <br></br>
            Link
            <br></br>
            Link
            <br></br>
            Link
            <br></br>
            Link
        </div>
    )
}