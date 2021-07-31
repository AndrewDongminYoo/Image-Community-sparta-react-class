import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore'
import { useDispatch, useSelector } from 'react-redux';
import { Text, Grid, Image, Button, Input } from "../elements";
import { actionCreators as postActions } from '../redux/modules/post'
import { actionCreators as imageActions } from '../redux/modules/image'
import { Helmet } from "react-helmet";

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

const PostWrite = (props) => {

  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false)
  const is_login = useSelector((state) => state.user?.is_login);
  const preview = useSelector((state) => state.image?.preview);
  const post_list = useSelector((state) => state.post.list);

  const dispatch = useDispatch();
  const post_id = !props.match.params.post_id ? null : props.match.params.post_id;
  const edit_post = post_id ? true : false;
  const find_post = edit_post ? post_list.find((post) => post.id === post_id) : null
  const [contents, setContents] = useState(find_post ? find_post.contents : "");

  useEffect(() => {
    if (edit_post && !find_post) {
      window.alert('포스트 데이터가 존재하지 않아요!'); history.goBack(); return;
    } else if (edit_post && find_post) {
      dispatch(imageActions.showPreview(find_post.image_url))
      if (find_post.comment_cnt > 1) {
        setDisable(true)
      }
    }
    // eslint-disable-next-line
  }, [dispatch])

  // 서버 업로드 없이 사진 미리보기를 세팅하는 onChange 함수!
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) { console.log('File Open Error'); return; }
    else if (!file.type.startsWith('image/')) { window.alert('이미지 파일만 업로드할 수 있어요ㅠ'); return; }
    else if (file.size > 52428800) { window.alert('파일이 너무 크네요ㅠㅠ'); return; }
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
      if (edit_post) {
        await dispatch(postActions.editPostFB(post_id, { contents: contents }));
      } else {
        await dispatch(postActions.addPostFB(contents));
      }
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
      <Text size="32px" bold>잠깐!</Text>
      <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
      <Button
        _onClick={() => {
          history.replace("/login");
        }}
        text="로그인 하러가기"
      />
    </Grid>
  ) : (
    <React.Fragment>
      <Helmet>
        <title>꼬리스타그램 게시물 쓰기</title>
        <meta property="og:title" content={edit_post ? "꼬리스타그램 게시물 수정하기" : "꼬리스타그램 게시물 작성하기"} />
        <meta property="og:description" content="당신의 사진에 담긴 이야기를 들려주세요." />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2FTD74SJjIRSbNh4jKLQ3vmOljWuj2%2F1627447658522?alt=media" />
      </Helmet>
      <Container>
        <Text size="32px" bold>{edit_post ? "수정하기" : "작성하기"}</Text>
        <Grid>
          <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400/eee/eee"} />
          <Input _onChange={selectFile} isFileUpload label={disable ? "댓글이 존재하는 사진은 수정할 수 없어요!" : "이 버튼을 눌러 일상을 공유하세요."} disable={disable} />
        </Grid>
        <Input
          numberOfLines={5}
          value={contents}
          _onChange={(e) => setContents(e.target.value)}
          placeholder="이 사진에 담긴 이야기를 해주세요."
          label="사진설명"
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          _onClick={handlePostWritePress}
          text={edit_post ? "수정하기" : "게시하기"}
          isFilled={false}
        />
      </Container>
    </React.Fragment>
  )
}

export default PostWrite;