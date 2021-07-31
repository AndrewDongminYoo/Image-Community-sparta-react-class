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
const EDIT_POST = "EDIT_POST";
const ISLOADING = "ISLOADING"

// action creators
const addPost = createAction(ADD_POST, (post) => ({ post }));
const setPost = createAction(SET_POST, (post, paging) => ({ post, paging }));
const delPost = createAction(DEL_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }));
const isLoading = createAction(ISLOADING, (loading) => ({ loading }))

// initialState
const initialPost = {
  comment_cnt: 0,
  insert_dt: getNow(),
}

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  loading: false,
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let paging = getState().post.paging;
    if (paging.start && !paging.next) {
      return;
    }
    dispatch(isLoading(true));
    let postDB = firestore
      .collection("post")
      .orderBy("insert_dt", "desc")
    if (start) {
      postDB = postDB.startAt(start)
    }
    postDB
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];
        let len = docs.docs.length;
        paging = {
          start: docs.docs[0],
          next: len === size + 1 ? docs.docs[len - 1] : null,
          size: size,
        };
        docs.forEach((doc) => {
          const _post = {
            id: doc.id,
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
            image_url: _post.image_url,
          }
          post_list.push(post)
        })
        post_list.pop();
        dispatch(setPost(post_list, paging));
      }).catch((error) => {
        console.error(error.message)
      })
  }
}

const getOnePostFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB.doc(post_id).get().then(doc => {
      let _post = doc.data();
      let post = Object.keys(_post).reduce(
        (acc, cur) => {
          if (cur.indexOf("user_") !== -1) {
            return {
              ...acc,
              user_info: { ...acc.user_info, [cur]: _post[cur] },
            };
          }
          return { ...acc, [cur]: _post[cur] };
        },
        { id: doc.id, user_info: {} }
      );
      dispatch(setPost([post]));
    })
  }
}

// eslint-disable-next-line
const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    const postDB = firestore.collection("post");
    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });
      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");
      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("이미지 업로드에 문제가 있어요!", err);
          });
      });
    }
  };
};

const addPostFB = (contents) => {
  return (dispatch, getState, { history }) => {
    dispatch(imageActions.isUploading(true))
    const _user = getState().user.user;
    const _image = getState().image.preview;
    const postDB = firestore.collection('post')
    const _upload = storage
      .ref(`images/${_user.uid}/${new Date().getTime()}`)
      .putString(_image, 'data_url');
    const user_info = {
      user_name: _user.displayName,
      user_profile: _user.photoURL,
      user_uid: _user.uid,
      user_email: _user.email,
    }
    _upload
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((file_path) => {
            const _post = {
              ...initialPost,
              image_url: file_path,
              contents: contents,
              insert_dt: getNow()
            }
            return _post
          }).then((_post) => {
            postDB
              .add({ ...user_info, ..._post })
              .then((doc) => {
                let post = { user_info, ..._post, id: doc.id }
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
        draft.list.push(...action.payload.post);
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex(post => post.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex(post => post.id === cur.id)] = cur;
            return acc;
          }
        }, []);
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.loading = false;
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [DEL_POST]: (state, action) =>
      produce(state, (draft) => {

      }),
    [ISLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.loading;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  addPost,
  setPost,
  delPost,
  editPost,
  getPostFB,
  getOnePostFB,
  addPostFB,
  editPostFB,
};

export { actionCreators };