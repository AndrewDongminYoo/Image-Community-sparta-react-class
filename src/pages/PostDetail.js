import React from 'react';
import { Grid, Image, Text } from '../elements';
import CommentList from '../components/CommentList'
import CommentWrite from '../components/CommentWrite'
import moment from 'moment';
import 'moment/locale/ko';

const getDateOrTime = ts => {
  return moment.unix(ts.seconds).fromNow();
}

const PostDetail = props => {

  const { id, user_info, image_url, contents, comment_cnt, insert_dt } = props
  console.log(props)

  return (
    <React.Fragment>
      <Grid>
        <Grid row is_flex={true} padding="12px">
            <Image shape="circle" src={user_info.user_profile} />
            <Text bold>{ user_info.user_name }</Text>
            <Text right>{getDateOrTime(insert_dt)}</Text>
        </Grid>
        <Grid paddingHorizontal="12px">
          <Text>{contents}</Text>
        </Grid>
        <Grid paddingVertical="10px">
          <Image shape="rectangle" src={image_url} />
        </Grid>
        <Grid paddingHorizontal="12px">
          <Text bold>댓글 {comment_cnt}개</Text>
        </Grid>
        <CommentList id={id}/>
        <CommentWrite id={id}/>
      </Grid>
    </React.Fragment>
  )
}

export default PostDetail;