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

  const { comment_cnt, contents, editable, id, image_url, insert_dt, user_info } = props
  const [likedPost, SetLikedPost] = useState(false);

  return (
    <React.Fragment>
      <Grid>
        <Grid row is_flex={true} padding="12px">
          <Image shape="circle" src={user_info?.user_profile} />
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
          <Image shape="rectangle"
            src={image_url}
            _onClick={() => {
              history.push(`/post/${id}`)
            }} />
        </Grid>
        <Grid row padding="5px 12px">
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
  user_info: {
    user_profile: "https://via.placeholder.com/400/fff/fff.png"
  },
  image_url: "https://via.placeholder.com/400/fff/fff.png",
  contents: "",
  comment_cnt: 0,
  insert_dt: 1000000000,
  _onClick: history.push('/post'),
}

export default Post;