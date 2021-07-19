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
  comment_cnt: 0,
  insert_dt: getNow()
}

const initialState = {
  list: [],
  unread: 4,
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
    }).catch((error) => {
      console.error(error.message)
    })
  }
}

const editPostFB = () => {
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
    }).catch((error) => {
      console.error(error.message)
    })
  }
}

const addPostFB = (contents) => {
  return (dispatch, getState, {history}) => {
    dispatch(imageActions.isUploading(true))
    const _user = getState().user.user;
    const _image = getState().image.preview;
    const postDB = firestore.collection('post')
    const _upload = storage
    .ref(`images/${_user.uid}/${new Date().getTime()}`)
    .putString(_image, 'data_url');
    const user_info = {
      user_name: _user.displayName,
      user_uid: _user.uid,
      email: _user.email,
    }
    _upload
    .then((snapshot) => {
      snapshot.ref
      .getDownloadURL()
      .then((file_path) =>{
        const _post = {
          ...initialPost,
          image_url: file_path,
          contents: contents,
          insert_dt: getNow()
        }
        return _post
      }).then((_post) => {
         postDB
          .add({...user_info, ..._post})
          .then((doc) => {
            let post = {user_info, ..._post, id:doc.id}
            dispatch(addPost(post))
            dispatch(imageActions.showPreview(null))
          }).catch((error) => {
            alert('포스트 작성에 실패했어요ㅠ')
            console.error(error.message)
        })
        }).catch((error) => {
          alert('이미지 주소 불러오기에 실패했어요ㅠ')
          console.error(error.message)
      })
    }).catch((error) => {
      alert('이미지 업로드에 실패했어요ㅠ')
      console.error(error.message)
  })
  dispatch(imageActions.isUploading(false))
  history.replace('/')
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
};

export { actionCreators };