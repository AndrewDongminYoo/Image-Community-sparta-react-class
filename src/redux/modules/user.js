import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { setCookie, deleteCookie } from "../../shared/Cookie";

// createAction(actionType, payloadCreator()=>{})
// payloadCreator must be a function, undefined, or null.
// If payloadCreator is undefined or null, the identity
// function is used.
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// The useState hook assumes any state that is stored
// inside it is treated as immutable. Deep updates in the
// state of React components can be greatly simplified
// as by using Immer.
const initialState = {
  user: null,
  is_login: false,
}

// handleActions(reducerMap{}, defaultState[, options])
// The second parameter defaultState is required, and is
// used when undefined is passed to the reducer.
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
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
  logIn,
  getUser,
  logOut,
};

export { actionCreators };