import React, { useState } from "react";
import { Grid, Input } from "../elements";

const CommentWrite = () => {

  const [comment, setComment] = useState("")

  function submitComment() {
    window.alert(comment)
  }

  return (
    <React.Fragment>
      <Grid row padding="16px" is_flex>
        <Input _onChange={(e) => setComment(e.target.value)} _onSubmit={submitComment} placeholder="댓글 내용을 입력해주세요 :)" />
        <input onClick={submitComment} type="submit" text="작성" />
      </Grid>
    </React.Fragment>
  );
}

export default CommentWrite;