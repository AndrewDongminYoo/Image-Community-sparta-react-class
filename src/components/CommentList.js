import React, { useEffect } from 'react';
import { Grid, Image, Text } from '../elements';
import { useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import moment from 'moment';
import 'moment/locale/ko';
// eslint-disable-next-line
import { actionCreators as postActions } from '../redux/modules/post';

const getDateOrTime = ts => {
  return moment.unix(ts.seconds).fromNow();
}
// eslint-disable-next-line
const CommentItem = ({ cmt }) => {

  const { user_info, comment, insert_dt } = cmt

  return (
    <React.Fragment>
      <Grid row is_flex padding="0px 10px">
        <Grid row is_flex>
          <Image shape="circle" src={user_info.user_profile} />
          <Text indent><Text bold>{user_info.user_name}&nbsp;&nbsp;</Text>{comment}<Text size="10px">{getDateOrTime(insert_dt)}</Text></Text>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const CommentList = props => {

  console.log(props)
  const comments = props.comments ? props.comments : null;
  const post_id = props.match ? props?.match?.params?.post_id : null;
  const dispatch = useDispatch()

  useEffect(() => {
    if (!post_id) {
      window.alert('포스트가 존재하지 않아요!'); history.push('/'); return;
    } else if (!comments) {
      console.log('댓글이 존재하지 않아요!'); return;
    } else return;
    //eslint-disable-next-line
  }, [dispatch])

  return (
    <React.Fragment>
      {comments
        ? comments.map((cmt) => {
          return (<CommentItem key={cmt.id} cmt={cmt} />)
        })
        : null}
    </React.Fragment>
  )
}

export default CommentList;