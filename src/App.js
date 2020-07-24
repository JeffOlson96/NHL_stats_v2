import React, { Component, useEffect } from 'react';
import './App.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchData } from './actions/index';
import history from './helpers/history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { SignIn } from './components/routes/SignIn';
import { Home } from './components/routes/Home';
import { SignUp } from './components/routes/SignUp';
import { PrivateRoute } from './helpers/PrivateRoute';
import Header from './components/style_comps/Header';
import LandingPage from './components/routes/LandingPage';

//const dispatch = useDispatch();

/*
useEffect(() => {
  history.listen((location, action) => {
    
  })
})
*/

class App extends Component {

  componentDidMount() {
    //this.props.onFetchData();
  }
  
  render () {
    
    return (
      <div className="app_container">
        {/*this.props.data ?
          <h1>{this.props.data.recordset[10].H_Ref_Name}</h1>
          : "Loading..."

          <Redirect from="/" to="/login" />
        */}
        <Header />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </div>
    );
  }
}


const mapStatetoProps = (state) => {
  return { num: state.num, data: state.data, error: state.error }
}

const mapDispatchtoProps = (dispatch) => {
  // this creates a prop that maps the action tp this.props
  return {
    onFetchData: () => dispatch(fetchData())
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);