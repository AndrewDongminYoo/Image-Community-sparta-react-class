import React, { useState } from 'react';
import { Badge } from '@material-ui/core'

const defaultProps = {
  color: 'secondary',
  max: 99,
};

const NotiBadge = (props) => {
  const [count, setCount] = useState(4);
  const [invisible, setInvisible] = useState(false);

  return (
    <Badge
      badgeContent={count}
      {...defaultProps}
      invisible={invisible}
    >
      {props.children}
    </Badge>
  )
};

export default NotiBadge;