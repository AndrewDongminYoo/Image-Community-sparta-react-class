import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/Firebase";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    console.log(history);
    dispatch(setUser(user));
    history.push("/");
  };
};

const signupFB = (email, password, user_name) => {
  return function (dispatch, getState, {history}){

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        auth.currentUser.updateProfile({
          displayName: user_name,
        }).then(()=>{
          dispatch(
            setUser(
              {
                user_name: user_name,
                id: email,
                user_profile: '',
                emailVerified: false,
                photoURL: "",
                phoneNumber: "",
              }
            )
          );
          history.push('/');
        }).catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {

      });

  }
}

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  loginAction,
  signupFB,
};

export { actionCreators };