import './App.css';
import React from "react";
import Header from '../components/Header';
import { ConnectedRouter } from 'connected-react-router'
import { Route } from "react-router-dom";
import { history } from '../redux/configureStore'
import { PostList, Login, Signup } from "../pages";

function App() {
  return (
    <React.Fragment>
      <Header />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;