import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../actions';
import { Dropdown } from 'react-bootstrap';



function SignUp() {

    const teamAbr = ['ANA',
    'ARI',
    'ATL',
    'BOS',
    'BUF',
    'CAR',
    'CGY',
    'CHI',
    'CBJ',
    'COL',
    'DAL',
    'DET',
    'EDM',
    'FLA',
    'LAK',
    'MIN',
    'MTL',
    'NSH',
    'NJD',
    'NYI',
    'NYR',
    'OTT',
    'PHI',
    'PHX',
    'PIT',
    'SEN',
    'SJS',
    'STL',
    'TBL',
    'TOR',
    'VAN',
    'VGK',
    'WPG',
    'WSH'];

    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        userteam: '',
        city: '',
        state: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        //console.log(e);
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value}));
    }

    function handleDropdown(e) {
        //console.log(e);
        setUser(user => ({ ...user, userteam: e}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        //console.log(user);
        setSubmitted(true);
        if (user.email && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="signup_form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <Dropdown name="email" value={user.email} onSelect={handleDropdown}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Favorite Team
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    {teamAbr.map((abr) => {
                            return <Dropdown.Item eventKey={abr} id={abr}>{abr}</Dropdown.Item>
                        })
                    }
                    </Dropdown.Menu>
                </Dropdown>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={user.city} onChange={handleChange} className={'form-control' + (submitted && !user.city ? ' is-invalid' : '')} />
                    {submitted && !user.city &&
                        <div className="invalid-feedback">City is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input type="test" name="state" value={user.state} onChange={handleChange} className={'form-control' + (submitted && !user.state ? ' is-invalid' : '')} />
                    {submitted && !user.state &&
                        <div className="invalid-feedback">State is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );

}

export { SignUp };


/*

<div className="dropdown">
                    <button name="userteam" value={user.userteam} onChange={handleChange} class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                       Favorite Team 
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">SJS</a>
                        <a class="dropdown-item" href="#">PIT</a>
                    </div>
                </div>

*/