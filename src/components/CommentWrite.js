import React, { useState } from "react";
import styled from 'styled-components'
import { Grid, Input } from "../elements";

const Button = styled.input`

`;

const CommentWrite = () => {

  const [comment, setComment] = useState("")

  function submitComment() {
    window.alert(comment)
  }

  return (
    <React.Fragment>
      <Grid row padding="16px" is_flex>
        <Input _onChange={(e) => setComment(e.target.value)} _onSubmit={submitComment} placeholder="댓글 내용을 입력해주세요 :)" />
        <Button onClick={submitComment} type="submit" text="작성" />
      </Grid>
    </React.Fragment>
  );
}

export default CommentWrite;