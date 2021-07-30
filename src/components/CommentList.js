import React, { useEffect, useState } from 'react';
import { Grid, Image, Text } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import moment from 'moment';
import 'moment/locale/ko';
// eslint-disable-next-line
import { actionCreators as commentActions } from '../redux/modules/comment';

const getDateOrTime = ts => {
  return moment.unix(ts.seconds).fromNow();
}
// eslint-disable-next-line
const CommentItem = (props) => {

  const { user_name, user_profile, contents, insert_dt } = props.cmt

  return (
    <React.Fragment>
      <Grid row is_flex padding="0px 10px">
        <Grid row is_flex>
          <Image shape="circle" src={user_profile} />
          <Text indent><Text bold>{user_name}&nbsp;&nbsp;</Text>{contents}<Text size="10px">&nbsp;&nbsp;{getDateOrTime(insert_dt)}</Text></Text>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const CommentList = props => {

  const comment_list = useSelector((state) => state.comment.list)
  const dispatch = useDispatch()
  const post_id = props.id || props.match.params.post_id

  useEffect(() => {
    if (!post_id) {
      window.alert('포스트가 존재하지 않아요!'); history.push('/'); return;
    } else if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id))
    }
    //eslint-disable-next-line
  }, [dispatch])

  return (
    <React.Fragment>
      {comment_list[post_id]
        ? comment_list[post_id].map((cmt) => {
          return <CommentItem key={cmt.id} cmt={cmt} />
        })
        : null}
    </React.Fragment>
  )
}

CommentList.defaultProps = {
  post_id: null,

}

export default CommentList;