import React, { useEffect } from 'react';
import { Grid } from '../elements';
import { CommentList, CommentWrite, Post } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post'


const PostDetail = (props) => {

  const { history, match } = props;
  const dispatch = useDispatch()
  const is_login = useSelector((state) => state.user?.is_login);
  const post_list = useSelector((state) => state.post.list);
  const post_id = match.params?.post_id;
  const view_post = post_id ? post_list.find((post) => post.id === post_id) : null

  useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB())
    } else if (!(is_login && view_post)) {
      window.alert('포스트가 존재하지 않아요!'); history.replace('/'); return;
    }
    // eslint-disable-next-line
  }, [dispatch])

  return (
    <React.Fragment>
      <Grid >
        <Post {...props} {...view_post} />
        <CommentList {...props} {...view_post} />
        <CommentWrite {...props} {...view_post} />
      </Grid>
    </React.Fragment>
  )
}

export default PostDetail;