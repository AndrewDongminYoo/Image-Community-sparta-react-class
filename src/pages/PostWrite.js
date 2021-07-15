import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Grid, Image, Button } from "../elements";

const Container = styled.form`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  overflow: hidden;
`;

const ErrorText = styled.p`
  align-items: flex-start;
  width: 100%;
  height: 10px;
  line-height: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 700;
  color: red;
`;

const PostWrite = (Route) => {

  const sample = "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media"
  const [desc, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imgsrc, setImageSource] = useState(sample);

  const handlePostWritePress = () => {
    if (!desc) {
      setErrorMessage("어떤 사진인가요? 친구들에게 알려주세요.")
    }
  }

  return (
    <React.Fragment>
      <Container>
        <Text size="32px" bold>공유하기</Text>
        <Grid>
          <Image shape="rectangle" src={imgsrc}/>
        </Grid>
        <form>
          <input type="file" accept='image/jpg,impge/png,image/jpeg,image/gif' name="PostWrite" onChange={()=>{}}/>
          <input type="button" onClick={(e)=>setImageSource(e.target.files)} value="Upload" />
        </form>
        <label for="desc">사진설명</label>
        <textarea style={{padding: 5, backgroundColor: "#eee", borderColor: "transparent", marginTop:10, flex: 1, width: "-webkit-fill-available", height:"150px"}} value={desc} onChange={(e) => {setDescription(e.target.value)}}/>
        <ErrorText>{ errorMessage }</ErrorText>
        <Button
          _onClick={() => {
            handlePostWritePress()
          }}
          text="사진업로드하기"
          isFilled={false}
        />
      </Container>
    </React.Fragment>
  )
}

export default PostWrite;