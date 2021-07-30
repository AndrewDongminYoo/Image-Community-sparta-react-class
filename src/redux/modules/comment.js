import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firebase, firestore, realtime } from "../../shared/Firebase";
import { actionCreators as postActions } from "./post";

const getNow = () => {
  return firebase.firestore.Timestamp.now()
}

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({ post_id, comment_list }));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({ post_id, comment }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  loading: false,
};

const getCommentFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) return;
    const commentDB = firestore.collection("comment");
    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let cmt_list = [];
        docs.forEach((doc) => {
          cmt_list.push({ ...doc.data(), id: doc.id })
        })
        dispatch(setComment(post_id, cmt_list));
      }).catch((error) => {
        console.error(error.message)
      })
  }
}

const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) return;
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user;
    if (!user_info) return;
    let comment = {
      post_id: post_id,
      user_uid: user_info.uid,
      user_name: user_info.displayName,
      user_profile: "",
      contents: contents,
      insert_dt: getNow(),
    }
    commentDB.add(comment).then((doc) => {
      comment = { ...comment, id: doc.id }
      const postDB = firestore.collection("post");
      const post = getState().post.list.find(p => p.id === post_id);
      console.log(post)
      const _noti_item = realtime
        .ref(`noti/${post.user_info.user_uid}/list`)
        .push();
      _noti_item.set({
        post_id: post.id,
        contents: contents,
        user_name: comment.user_name,
        image_url: post.image_url,
        insert_dt: comment.insert_dt
      }, (err) => {
        if (err) {
          console.log('알림 저장 실패');
        } else {
          const notiDB = realtime.ref(`noti/${post.user_info.user_uid}`);
          notiDB.update({ read: false });
        }
      });
      const increment = firebase
        .firestore
        .FieldValue
        .increment(1);
      postDB
        .doc(post_id)
        .update({ comment_cnt: increment })
        .then((_post) => {
          dispatch(addComment(post_id, comment));
          if (post) {
            dispatch(
              postActions.editPostFB(post_id, {
                comment_cnt: parseInt(post.comment_cnt) + 1,
              }))
          }
          console.log(post);
        }).catch((error) => {
          console.error(error.message)
        })
    })
  }
}

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.loading;
      })
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  addCommentFB,
  setComment,
  addComment,
  loading,
};

export { actionCreators };