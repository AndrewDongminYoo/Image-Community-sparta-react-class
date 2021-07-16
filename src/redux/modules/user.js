import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, deleteCookie } from "../../shared/Cookie";
import firebase from "firebase/app";
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

const uploadImage = async uri => {
  const blob = await new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      res(xhr.response);
    };
    xhr.onerror = function (err) {
      rej(new TypeError('Network request failed'));

    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  const user = auth.currentUser;
  const ref = firebase.app.storage().ref(`/profile/${user.uid}/profile.png`);
  const snapshot = await ref.put(blob, { contentType: 'image/png' });

  blob.close();
  return snapshot.ref.getDownloadURL();
}

// middleware actions
const signupFB = (email, password, nickName) => {
  return function (dispatch, getState, {history}){
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        auth.currentUser.updateProfile({
          displayName: nickName,
        }).then(()=>{
          dispatch(
            setUser(
              {
                displayName: nickName,
                email: email,
                uid: user.uid,
              }
            )
          );
          history.push('/');
        }).catch((error) => {
          console.error(error.message);
        });
      })
      .catch((error) => {
        console.error(error.message)
      }
    );
  }
}

const loginFB = (email, password) => {
  return function (dispatch, getState, {history}){
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then((response) => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            dispatch(
              setUser({
              email: user.email,
              displayName: user.displayName,
              uid: user.uid,
            }
          )
        );
        history.push('/')
      }).catch((error) => {
        console.error(error.message)
      });
    });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, {history}){
    auth.onIdTokenChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(logOut());
      }
    })
  }
}

const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace('/');
    })
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
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {

      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  getUser,
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB,
  uploadImage,
};

export { actionCreators };