import React from 'react';
import { Grid, Image, Text } from '../elements';
import moment from 'moment';
import 'moment/locale/ko';
import { useSelector } from 'react-redux';
import { actionCreators } from '../redux/modules/post';

const getDateOrTime = ts => {
  return moment.unix(ts.seconds).fromNow();
}

const CommentItem = ({cmt}) => {

  const { user_info, comment, insert_dt } = cmt

  return (
    <React.Fragment>
      <Grid row is_flex padding="0px 10px">
        <Grid row is_flex>
          <Image shape="circle" src={user_info.user_profile} />
          <Text indent><Text bold>{ user_info.user_name }&nbsp;&nbsp;</Text>{  comment  }<Text size="10px">{getDateOrTime(insert_dt)}</Text></Text>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const CommentList = id => {

  const post = useSelector((state) => state.post.list)

  return (
    <React.Fragment>
      {/* { comments.map((cmt) => {
        return (<CommentItem key={cmt.id} cmt={cmt}/>)
      })} */}
    </React.Fragment>
  )
}

export default CommentList;