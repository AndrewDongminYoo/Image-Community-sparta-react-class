import React from 'react';
import { Grid, Image, Text } from '../elements';
import { HeartOutlined, EditFilled, HeartFilled } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/ko';
import { history } from '../redux/configureStore';
import IconButton from '../elements/IconButton';
import { useState } from 'react';

const getDateOrTime = ts => {
  return moment.unix(ts.seconds).fromNow();
}

const Post = props => {

  const { editable, id, user_info, image_url, contents, comment_cnt, insert_dt } = props
  const [likedPost, SetLikedPost] = useState(false);
  const [comments, getComments] = useState(false)
  console.log(props)

  return (
    <React.Fragment>
      <Grid>
        <Grid row is_flex={true} padding="12px">
          <Image shape="circle" src={user_info?.user_profile} _onClick={() => history.push(`/post/${id}`)} />
          <Text bold>{user_info?.user_name}</Text>
          <Text right>{getDateOrTime(insert_dt)}</Text>
          {editable
            ? <IconButton
              Filled={EditFilled}
              isFilled={true}
              _onClick={() => {
                history.push(`/write/${id}`)
              }}
            />
            : null}
        </Grid>
        <Grid padding="0px 12px">
          <Text>{contents}</Text>
        </Grid>
        <Grid padding="10px 0px">
          <Image shape="rectangle" src={image_url} />
        </Grid>
        <Grid row padding="0px 12px">
          <IconButton isFilled={likedPost} _onClick={() => SetLikedPost(!likedPost)} Filled={HeartFilled} Outlined={HeartOutlined} />
          <Text bold>&nbsp;댓글 {!comment_cnt ? "0" : comment_cnt}개</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

Post.defaultProps = {
  editable: false,
  id: null,
  user_info: null,
  image_url: "https://via.placeholder.com/400/fff/fff.png",
  contents: "",
  comment_cnt: 0,
  insert_dt: 1000000000,
  onClick: history.push('/post'),
}

export default Post;