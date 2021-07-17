import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore'
import { useSelector, useDispatch } from 'react-redux';
import { Text, Grid, Image, Button, TextArea, Input } from "../elements";

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

  const [desc, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const is_login = useSelector((state) => state.user.is_login)
  const sample = "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media"
  const [imgsrc, setImageSource] = useState(sample);

  // 이 함수는 사진을 파이어스토어에 사용자의 uid명의 ref에 업로드하고 다시 다운받아 리턴(예정)
  const getImageUrlSource = (img) => {};

  // 이 함수는 포스트 작성 버튼을 눌렀을때 실행될 함수!
  const handlePostWritePress = () => {
    if (!desc) {
      setErrorMessage("어떤 사진인가요? 친구들에게 알려주세요.")
    } else {
      const regex = /%2F([\W\w]+)\?alt=media/;
      const new_src = getImageUrlSource();
      setImageSource(new_src)
      const file_name = regex.exec(imgsrc).pop();
      console.log(regex, file_name);
      alert(`파일명: ${file_name} \n글 내용: ${desc} \n업로드 성공!!!`)
    }
  }

  // Input에 isFileUpload를 props로 넘기면 input type이
  // file로 변하고, 파일 업로드의 못생김을 display-block이 된
  // 라벨이 가려서 예쁘게 출력해줍니다. (라벨 텍스트 입력해야함)
  return !is_login ? (
    <Grid margin="200px 0px" padding="16px" center>
      <Text size="32px" bold>
        잠깐!
      </Text>
      <Text size="16px">
        로그인 후에만 글을 쓸 수 있어요!
      </Text>
      <Button
        _onClick={() => {
          history.replace("/login");
        }}
      >
        로그인 하러가기
      </Button>
    </Grid>
  ) : (
    <React.Fragment>
      <Container>
        <Text size="32px" bold>공유하기</Text>
        <Grid>
          <Image shape="rectangle" src={imgsrc}/>
          <Input isFileUpload label="이 버튼을 눌러 일상을 공유하세요."/>
        </Grid>
        <TextArea
          _onChange={(e) => setDescription(e.target.value)}
          placeholder="이 사진에 담긴 이야기를 해주세요."
          label="사진설명"
        />
        <ErrorText>{ errorMessage }</ErrorText>
        <Button
          _onClick={() => {
            handlePostWritePress()
          }}
          text="게시하기"
          isFilled={false}
        />
      </Container>
    </React.Fragment>
  )
}

export default PostWrite;