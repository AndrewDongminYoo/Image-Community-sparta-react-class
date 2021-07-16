import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, deleteCookie } from "../../shared/Cookie";
import firebase from "firebase/app";
import { firestore } from "../../shared/Firebase";

// actions
const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST";
const DEL_POST = "DEL_POST";

// action creators
const addPost = createAction(ADD_POST, (user) => ({ user }));
const setPost = createAction(SET_POST, (user) => ({ user }));
const delPost = createAction(DEL_POST, (user) => ({ user }));

// initialState
const initialState = {
  list: [],
};

const initialPost = {
  id: 0,
  user_info: {
    user_name: 'mingming',
    user_profile: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media",
  },
  image_url: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media",
  contents: "고양이예요!",
  comment_cnt: 10,
  insert_dt: "2020-12-23-13-40-55"
}

// reducer
export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {

      }),
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {

      }),
    [DEL_POST]: (state, action) =>
      produce(state, (draft) => {

      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  addPost,
  setPost,
  delPost,
};

export { actionCreators };