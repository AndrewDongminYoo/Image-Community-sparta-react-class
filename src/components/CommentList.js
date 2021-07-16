import React from 'react';
import { Grid, Image, Text } from '../elements';
import moment from 'moment';
import 'moment/locale/ko';

const getDateOrTime = ts => {
  return moment(ts, "YYYY-MM-DD-hh-mm-ss").fromNow();
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

CommentItem.defaultProps = {
  user_info: {
    user_name: 'mingming',
    user_profile: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media",
  },
  comment: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus id laborum ipsum omnis consequatur aliquam quas eveniet, incidunt iure sed. Itaque aperiam ad quidem deleniti, ipsam quas vero facere veritatis?",
  insert_dt: "2021-07-15-13-26-57",
}

const CommentList = props => {

  const comments = [
    {
      id: 0,
      user_info: {
        user_name: 'GiTaek',
        user_profile: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media",
      },
      comment: "가장 완벽한 계획이 뭔지 알아? 무계획이야.",
      insert_dt: "2021-07-15-11-26-57",
    },
    {
      id: 1,
      user_info: {
        user_name: "Mia",
        user_profile: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media",
      },
      comment: "제 이모가 파리에서 산 적이 있어요. 기억하기로는, 이모는 집에 오면 우리에게 그곳에서 있었던 이런저런 일들을 얘기했어요. 그러니까, 한번은 센 강에 뛰어들었었대요. 맨발로.",
      insert_dt: "2021-07-15-13-26-57",
    },
    {
      id: 2,
      user_info: {
        user_name: 'Raphina',
        user_profile: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media",
      },
      comment: "슬픔을 행복해하지 못하는 게 네 문제야. 하지만 사랑이란 그런거야, 코스모. 행복한 슬픔 말이야.",
      insert_dt: "2021-07-15-09-26-57",
    }
  ]

  return (
    <React.Fragment>
      { comments.map((cmt) => {
        return (<CommentItem key={cmt.id} cmt={cmt}/>)
      })}

    </React.Fragment>
  )
}

export default CommentList;