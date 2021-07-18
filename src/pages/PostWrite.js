import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore'
import { useDispatch, useSelector } from 'react-redux';
import { Text, Grid, Image, Button, Input } from "../elements";
import { actionCreators as postActions }  from '../redux/modules/post'
import { actionCreators as imageActions }  from '../redux/modules/image'

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

  const [contents, setContents] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const is_login = useSelector((state) => state.user.is_login)
  const preview = useSelector((state) => state.image.preview)
  const dispatch = useDispatch()

  // 사진 미리보기를 세팅하는 onChange 함수!
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file)
    if (!file) {
      console.log('File Open Error')
      return
    }
    if (!file.type.startsWith('image/')) {
      window.alert('이미지 파일만 업로드할 수 있어요ㅠ')
      return
    }
    if (file.size > 52428800) {
      window.alert('파일이 너무 크네요ㅠㅠ')
      return
    }
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.showPreview(reader.result));
    };
  }
  // 이 함수는 포스트 작성 버튼을 눌렀을때 실행될 함수!
  const handlePostWritePress = async () => {
    if (!preview) {
      setErrorMessage("사진을 업로드해주세요~ 이미지파일만 가능!")
    } else if (!contents) {
      setErrorMessage("어떤 사진인가요? 친구들에게 알려주세요.")
    } else {
      await dispatch(postActions.addPostFB(contents));
      await setErrorMessage('');
      await dispatch(imageActions.showPreview(null));
      await alert('업로드 성공!!!');
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
          <Image shape="rectangle" src={preview}/>
          <Input
            _onChange={selectFile}
            isFileUpload
            label="이 버튼을 눌러 일상을 공유하세요."
          />
        </Grid>
        <Input
          numberOfLines={5}
          value={contents}
          _onChange={(e) => setContents(e.target.value)}
          placeholder="이 사진에 담긴 이야기를 해주세요."
          label="사진설명"
        />
        <ErrorText>{ errorMessage }</ErrorText>
        <Button
          _onClick={handlePostWritePress}
          text="게시하기"
          isFilled={false}
        />
      </Container>
    </React.Fragment>
  )
}

export default PostWrite;