import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PieChartContainer from '../d3_components/PieChartContainer.js';
import { userActions } from '../../actions';
import SideBar from '../style_comps/SideBar';

function Home() {
    const userData = useSelector(state => state.authentication.user);
    
    console.log(userData);
    const user_style = {
        //transform: "translate(300px,0px)",
        textAlign: "right",
        position: "absolute",
        zIndex: "2",
        
    }
    const home_style = {
        width: "100%",
        height: "200%",
        position: "absolute",
        backgroundColor: "#e6fffa"
    }
    return (
        <div className="home_container" style={home_style}>
            {/*<SideBar />*/}
            <div className="col-lg-8 offset-lg-2" style={user_style}>
                <h3>Hi {userData.user.Username}!</h3>
                <div>
                    <Link to="/login">Logout</Link>
                    <p>link to update profile/reset password</p>
                </div>
                
            </div>
            <PieChartContainer />
        </div>
    );
}

export { Home };