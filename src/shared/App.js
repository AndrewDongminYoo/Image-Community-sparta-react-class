import './App.css';
import React, { useEffect } from "react";
import Header from '../components/Header';
import AddPost from '../elements/AddPost'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from "react-router-dom";
import { history } from '../redux/configureStore'
import { PostList, Login, Signup, PostWrite } from "../pages";
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user'
import { apiKey } from './Firebase';
import Permit from './Permit';

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
    const is_session = sessionStorage.getItem(_session_key) ? true : false
    if (is_session) {
      dispatch(userActions.loginCheckFB())
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <Header />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/upload" exact component={PostWrite}/>
        <Permit>
          <AddPost/>
        </Permit>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;