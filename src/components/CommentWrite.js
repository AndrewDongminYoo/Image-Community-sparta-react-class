import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Input, Button } from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";


const CommentWrite = (props) => {

  const dispatch = useDispatch()
  const [comment, setComment] = useState("")
  const { post_id } = props;

  function submitComment() {
    window.alert(comment)
    dispatch(commentActions.addCommentFB(post_id, comment))
    setComment("");
  }

  return (
    <React.Fragment>
      <Grid row padding="16px" is_flex>
        <Input
          _onChange={(e) => setComment(e.target.value)}
          _onSubmit={submitComment}
          placeholder="댓글 내용을 입력해주세요 :)"
          value={comment}
        />
        <Button
          _onClick={submitComment}
          isFilled={false}
          containerStyle={{ width: "40px" }}
          text="작성" />
      </Grid>
    </React.Fragment>
  );
}

export default CommentWrite;