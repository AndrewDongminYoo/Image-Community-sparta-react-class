import React from 'react';
import { Grid } from '../elements';
import CommentList from '../components/CommentList'
import CommentWrite from '../components/CommentWrite'
import Post from '../components/Post';
import 'moment/locale/ko';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { actionCreators as postActions } from '../redux/modules/post'

const PostDetail = props => {

  return (
    <React.Fragment>
      <Grid >
        <Post {...props} />
        <CommentList id={props.id} />
        <CommentWrite id={props.id} />
      </Grid>
    </React.Fragment>
  )
}

PostDetail.defaultProps = {
  editable: false,
  id: null,
  user_info: null,
  image_url: "https://via.placeholder.com/400/fff/fff.png",
  contents: "",
  comment_cnt: 0,
  insert_dt: 1626618676
}

export default PostDetail;