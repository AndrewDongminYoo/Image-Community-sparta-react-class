import React, { useState } from "react";
import styled from 'styled-components'
import { Grid, Input } from "../elements";

const Button = styled.input`
  width: 50px;
  height: 30px;
`;

const CommentWrite = () => {

  const [comment, setComment] = useState("")

    return (
      <React.Fragment>
        <Grid row padding="16px" is_flex>
          <Input _onChange={(e) => setComment(e.target.value)} placeholder="댓글 내용을 입력해주세요 :)" />
          <Button onClick={() => alert(comment)} type="submit" text="작성"/>
        </Grid>
      </React.Fragment>
    );
}

export default CommentWrite;