import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PieChartContainer from '../d3_components/PieChartContainer.js';
import { userActions } from '../../actions';

function Home() {
    //const users = useSelector(state => state.users);
    const userData = useSelector(state => state.authentication.user);
    //console.log(userData);
    const dispatch = useDispatch();

    /*
    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }
    */
    const user_style = {
        //transform: "translate(300px,0px)",
        textAlign: "right",
        position: "absolute"
    }
    return (
        <div className="home_container">
            <div className="col-lg-8 offset-lg-2" style={user_style}>
                <h3>Hi {userData.user.Username}!</h3>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                
            </div>
            <PieChartContainer />
        </div>
    );
}

export { Home };