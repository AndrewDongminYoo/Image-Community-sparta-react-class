import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firebase, firestore, storage } from "../../shared/Firebase";
import { actionCreators as imageActions } from "./image";

const getNow = () => {
  return firebase.firestore.Timestamp.now()
}

// actions
const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST";
const DEL_POST = "DEL_POST";

// action creators
const addPost = createAction(ADD_POST, (post) => ({ post }));
const setPost = createAction(SET_POST, (post) => ({ post }));
const delPost = createAction(DEL_POST, (post) => ({ post }));

// initialState
const initialPost = {
  image_url: "",
  contents: "",
  comment_cnt: 0,
  insert_dt: getNow()
}

const initialState = {
  list: [],
};

const getPostFB = () => {
  return function (dispatch, getState, {history}) {
    const postDB = firestore.collection("post");
    postDB
      .get()
      .then((docs) => {
        let post_list = [];
        docs.forEach((doc) => {
          const _post = {
            id: doc.id,
            comments: [],
            ...doc.data()
          }
          const post = {
            id: _post.id,
            user_info: {
              user_name: _post.user_name,
              user_profile: _post.user_profile,
              user_uid: _post.user_uid,
            },
            contents: _post.contents,
            insert_dt: _post.insert_dt,
            comments: _post.comments,
            image_url: _post.image_url,
          }
          post_list.push(post)
        })
        dispatch(setPost(post_list));
      })
  }
}

const addPostFB = (image_url, contents="") => {
  return function (dispatch, getState, {history}) {
    const _user = getState().user.user;
    const postDB = firestore.collection('post')
    const user_info = {
      user_name: _user.email,
      user_uid: _user.uid,
    }
    const _post = {
      ...initialPost,
      image_url: image_url,
      contents: contents,
      insert_dt: getNow()
    }
    postDB.add({...user_info, ..._post}).then((doc) => {
      let post = {user_info, ..._post, id:doc.id}
      dispatch(addPost(post))
    }).catch((error) => {
      console.error(error.message)
    })
    history.replace('/')
  }
}

const uploadImage = async image_url => {
  return async function (dispatch, getState, {history}) {
    const blob = await new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        res(xhr.response)
      };
      xhr.onerror = (e) => {
        rej(new TypeError('Network Request Failed', e.message))
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image_url, true)
      xhr.send(null);
    });
    const user = getState().user.user;;
    const imageRef = storage.ref(`images/${user.uid}/${image_url}`)
    const snapshot = await imageRef.put(blob, { contentType: 'image/png'});
    blob.close()
    return await snapshot.storageRef.getDownloadURL();
  }
}

// reducer
export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
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
  getPostFB,
  addPostFB,
  uploadImage,
};

export { actionCreators };