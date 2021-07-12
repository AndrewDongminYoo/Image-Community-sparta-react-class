import React from 'react';
import { Grid, Image, Text } from '../elements';
import moment from 'moment';
import 'moment/locale/ko';

const getDateOrTime = ts => {
  return moment(ts, "YYYY-MM-DD-hh-mm-ss").fromNow();
}

const Post = props => {

  const {  user_info, image_url, contents, comment_cnt, insert_dt } = props

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="12px">
          <Image shape="circle" src={user_info.user_profile} />
          <Text bold>{ user_info.user_name }</Text>
          <Text>{getDateOrTime(insert_dt)}</Text>
        </Grid>
        <Grid padding="12px">
          <Text>{contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={image_url} />
        </Grid>
        <Grid padding="12px">
          <Text bold>댓글 {comment_cnt}개</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

Post.defaultProps = {
  user_info: {
    user_name: 'mingming',
    user_profile: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media",
  },
  image_url: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media",
  contents: "고양이예요!",
  comment_cnt: 10,
  insert_dt: "2018-12-23"
}

export default Post;