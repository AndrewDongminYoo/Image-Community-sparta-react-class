import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, deleteCookie } from "../../shared/Cookie";
import firebase from "firebase/app";
import { auth, storage } from "../../shared/Firebase";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const SHOW_PRO = "SHOW_PRO";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const setProfile = createAction(SHOW_PRO, (profile) => ({ profile }))

// initialState
const initialState = {
  user: {
    email: null,
    uid: null,
    displayName: null,
    emailVerified: false,
    photoURL: null,
  },
  is_login: false,
  profile: null,
};

const uploadProfile = async uri => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const user = auth.currentUser;
  const ref = storage.ref(`/profile/${user.uid}/photo.png`);
  const snapshot = await ref.put(blob, { contentType: 'image/png' });

  return await snapshot.ref.getDownloadURL();
};


// middleware actions
const signupFB = (email, password, name, photoUrl) => {
  return async function (dispatch, getState, { history }) {
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    const storageUrl = photoUrl.startsWith('https')
      ? photoUrl
      : await uploadProfile(photoUrl);
    await user.updateProfile({
      displayName: name,
      photoURL: storageUrl
    })
    await dispatch(setUser({
      email: user.email,
      uid: user.uid,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL
    }))
    await history.push('/');
  }
}

export const updateUserFB = (name, photoUrl) => {
  return async function (dispatch, getState, { history }) {
    const user = auth.currentUser;
    const storageUrl = photoUrl.startsWith('https')
      ? photoUrl
      : await uploadProfile(photoUrl);
    await user.updateProfile({ photoURL: storageUrl, displayName: name });
    await dispatch(setUser({
      email: user.email,
      uid: user.uid,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL
    }))
    history.goBack();
  }
};

const loginFB = (email, password) => {
  return function (dispatch, getState, { history }) {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then((response) => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            dispatch(
              setUser({
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                emailVerified: user.emailVerified,
                photoURL: user.photoURL
              })
            );
            history.push('/')
          }).catch((error) => {
            window.alert('이메일/비밀번호를 확인해주세요.')
            console.error(error.message)
          });
      }).catch((error) => {
        window.alert('로그인에 실패했습니다.')
        console.error(error.message)
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onIdTokenChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL
          })
        );
      } else {
        dispatch(logOut());
      }
    })
  }
}

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
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
        draft.profile = null;
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
    [SHOW_PRO]: (state, action) =>
      produce(state, (draft) => {
        draft.profile = action.payload.profile
      })
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
  setProfile,
  updateUserFB,
};

export { actionCreators };