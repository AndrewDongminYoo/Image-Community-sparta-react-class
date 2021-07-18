import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { storage } from "../../shared/Firebase";

const IS_UPLOADING = "IS_UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SHOW_PREVIEW = "SHOW_PREVIEW"

const isUploading = createAction(IS_UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const showPreview = createAction(SHOW_PREVIEW, (preview) => ({preview}))

const initialState = {
  uploading: false,
  image_url: "",
  preview: null,
}

const uploadImageFB = image => {
  return function(dispatch, getState, {history}) {
    const user = getState().user.user;;
    dispatch(isUploading(true))
    const uploadImage = storage.ref(`images/${user.uid}/${image.name}`).put(image)
    uploadImage.then((snapshot) => {
      snapshot
      .ref
      .getDownloadURL()
      .then((img_url) => {
        dispatch(uploadImage(img_url));
      })
    }).catch((e)=>{
      console.error(e.message)
      })
  }
}

export default handleActions(
  {
    [IS_UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [SHOW_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
    }),
  },
  initialState
);

// action creator export
const actionCreators = {
  uploadImage,
  uploadImageFB,
  showPreview,
};

export { actionCreators };