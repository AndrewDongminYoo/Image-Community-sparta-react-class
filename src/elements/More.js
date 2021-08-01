import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function LongMenu(props) {
  const { _onShare, _onEdit, _onDelete } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            paddingTop: 0,
            paddingBottom: 0,
            lineHeight: '1px',
            border: 'none',
          },
        }}
      >
        <MenuItem
          style={{
            fontSize: 5,
          }}
          disableGutters
          dense
          onClick={() => _onEdit()}>
          수정하기
        </MenuItem>
        <MenuItem
          style={{
            fontSize: 5,
          }}
          disableGutters
          dense
          onClick={() => _onShare()}>
          공유하기
        </MenuItem>
        <MenuItem
          style={{
            fontSize: 5,
          }}
          disableGutters
          dense
          onClick={() => _onDelete()}>
          삭제하기
        </MenuItem>
      </Menu>
    </div>
  );
}
