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
        position: "absolute"
    }
    return (
        <div className="home_container">
            {/*<SideBar />*/}
            <div className="col-lg-8 offset-lg-2" style={user_style}>
                <h3>Hi {userData.user.Username}!</h3>
                <p>
                    <Link to="/login">Logout</Link>
                    <p>link to update profile/reset password</p>
                </p>
                
            </div>
            <PieChartContainer />
        </div>
    );
}

export { Home };