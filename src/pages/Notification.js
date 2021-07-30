import React, { useEffect, useState } from 'react';
import { Grid, Image, Text } from '../elements';
import { firebase, realtime } from '../shared/Firebase'
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';

const Notice = (props) => {

  const getDateOrTime = ts => moment.unix(ts.seconds).fromNow();

  const { image_url, displayName, actionType, insert_dt, action } = props;

  return (
    <Grid is_flex width="90%" row padding="10px" margin="20px 20px" backgroundColor="#FEF5E7">
      <Image shape="square" src={image_url} />
      <Text indent><Text bold>{displayName}&nbsp;</Text>{actionType}&nbsp;&nbsp;"{action}"&nbsp;&nbsp;<Text size="10px" right>{getDateOrTime(insert_dt)}</Text></Text>
    </Grid>
  );
};

Notice.defaultProps = {
  image_url: "https://via.placeholder.com/90",
  displayName: "nickName",
  actionType: "님이 게시글에 댓글을 남겼습니다 :)",
  insert_dt: firebase.firestore.Timestamp.now(),
  action: ""
}

const actionType = [
  "님이 회원님의 사진을 좋아합니다.",
  "님이 댓글에서 회원님을 언급했습니다.",
  "님이 게시글에 댓글을 남겼습니다 :)",
  "님이 회원님을 팔로우하기 시작했습니다.",
]

const notice_list = [
  {
    image_url: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2FTD74SJjIRSbNh4jKLQ3vmOljWuj2%2F1626612346279?alt=media",
    displayName: "minzzi._.andrew",
    actionType: actionType[2],
    insert_dt: firebase.firestore.Timestamp.fromMillis(1626612346279),
    action: "체고 귀여워 꼬리 하고싶은거 다해"
  }, {
    image_url: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2FTD74SJjIRSbNh4jKLQ3vmOljWuj2%2F1626612404224?alt=media",
    displayName: "minzzi._.andrew",
    actionType: actionType[2],
    insert_dt: firebase.firestore.Timestamp.fromMillis(1626612404224),
    action: "kekeke Hooman"
  }, {
    image_url: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2FTD74SJjIRSbNh4jKLQ3vmOljWuj2%2F1626617133965?alt=media",
    displayName: "minzzi._.andrew",
    actionType: actionType[2],
    insert_dt: firebase.firestore.Timestamp.fromMillis(1626617133965),
    action: "Ewww So Cute."
  }, {
    image_url: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2FTD74SJjIRSbNh4jKLQ3vmOljWuj2%2F1626617713748?alt=media",
    displayName: "minzzi._.andrew",
    actionType: actionType[2],
    insert_dt: firebase.firestore.Timestamp.fromMillis(1626617170652),
    action: "용맹해~~~~"
  },
]

const Notification = (props) => {

  const user = useSelector(state => state.user?.user);
  const [notice, setNotice] = useState(notice_list);

  useEffect(() => {
    if (!user) return;
    const notiDB = realtime.ref(`noti/${user.uid}/list`)
    const _noti = notiDB.orderByChild("insert_dt");
    _noti.once("value", snapshot => {
      if (snapshot.exists()) {
        let _data = snapshot.val();
        console.log(_data)
        let _noti_list = Object.keys(_data).reverse().map(key => {
          return _data[key];
        });
        setNotice(_noti_list);
      }
    })

    // eslint-disable-next-line
  }, [user])

  return (
    <Grid backgroundColor="#FDEDEC" padding="5px 0px">
      {notice.map((value, idx) => {
        return <Notice key={idx} {...value} />
      })}
    </Grid>
  )
};

export default Notification;