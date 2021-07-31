import React, { useEffect, useState } from 'react';
import { Grid, Image, Text } from '../elements';
import { firebase } from '../shared/Firebase'
import { useSelector } from 'react-redux';
import { history } from '../redux/configureStore'
import moment from 'moment';
import 'moment/locale/ko';
import { Helmet } from "react-helmet";

const NoNotice = (props) => {

  return (
    <Image shape="rectangle" src="https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2Fno%20notice.png?alt=media" />
  )
}

const Notice = React.memo((props) => {

  const getDateOrTime = ts => moment.unix(ts.seconds).fromNow();
  const { post_id, image_url, user_name, actionType, insert_dt, contents } = props;

  return (
    <React.Fragment>
      <Helmet>
        <title>꼬리스타그램 알림</title>
        <meta property="og:title" content="꼬리스타그램 알림" />
        <meta property="og:description" content="내 게시물에 어떤 댓글이 달렸을까요??" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2FTD74SJjIRSbNh4jKLQ3vmOljWuj2%2F1627447658522?alt=media" />
      </Helmet>
      <Grid
        is_flex
        width="90%"
        row
        padding="10px"
        margin="20px 20px"
        backgroundColor="#FEF5E7"
        _onClick={() => history.push(`post/${post_id}`)}
      >
        <Image
          shape="square"
          src={image_url} />
        <Text indent>
          <Text bold>
            {user_name}&nbsp;
          </Text>
          {actionType}&nbsp;&nbsp;"{contents}"&nbsp;&nbsp;
          <Text size="10px" right>
            {getDateOrTime(insert_dt)}
          </Text>
        </Text>
      </Grid>
    </React.Fragment>
  );
});

Notice.defaultProps = {
  image_url: "https://via.placeholder.com/90",
  displayName: "nickName",
  actionType: "님이 게시글에 댓글을 남겼습니다 :)",
  insert_dt: firebase.firestore.Timestamp.now(),
  action: ""
}

const Notification = (props) => {

  const user = useSelector(state => state.user.user);
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    if (user) {
      const notiDB = firebase
        .database()
        .ref(`noti/${user.uid}/list`)
      const _noti = notiDB.orderByChild("insert_dt");
      _noti.once("value", snapshot => {
        if (snapshot.exists()) {
          let _data = snapshot.val();
          let _noti_list = Object.keys(_data).reverse().map(key => {
            return _data[key];
          });
          setNotice(_noti_list);
        }
      })
    }
  }, [user])

  return (
    <Grid backgroundColor="#FDEDEC" padding="5px 0px" >
      {notice.length
        ? notice.map((value, idx) => {
          return <Notice key={idx} {...value} />
        })
        : <NoNotice />}
    </Grid>
  )
};

export default Notification;