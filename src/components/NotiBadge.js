import React, { useState, useEffect } from 'react';
import Badge from '@material-ui/core/Badge';
import { realtime } from '../shared/Firebase';
import { useSelector } from 'react-redux';

const defaultProps = {
  color: 'error',  // for orange color;
  max: 99,
};

const NotiBadge = (props) => {
  // eslint-disable-next-line
  const [count, setCount] = useState(4);
  const [invisible, setInvisible] = useState(false);
  const user_id = useSelector((state) => state.user.user.uid)

  useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`)
    notiDB.on("value", (snapshot) => {
      if (!snapshot.val()) return;
      console.log(snapshot.val().read)
      setInvisible(snapshot.val().read)
    })
    return () => notiDB.off();

  }, [user_id])

  return (
    <Badge
      badgeContent={count}
      {...defaultProps}
      invisible={invisible}
      onClick={props.children.props._onClick}
    >
      {props.children}
    </Badge>
  )
};

export default NotiBadge;