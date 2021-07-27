import React, { useEffect, useCallback } from 'react';
import _ from 'lodash';
import LinearProgress from '@material-ui/core/LinearProgress';

const FlatList = (props) => {

  const { renderItem, children, callNext, hasNextData, loading } = props;

  const _handleScroll = _.throttle(() => {

    if (loading) return;
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop)
      || document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      // 로딩 중이면 다음 걸 부르면 안되겠죠!
      if (loading) {
        return;
      }
      console.log(scrollHeight - innerHeight - scrollTop)
      callNext();
    }
  }, 300)
  // eslint-disable-next-line
  const handleScroll = useCallback(_handleScroll, [loading])

  useEffect(() => {
    if (loading) return;
    if (hasNextData) {
      window.addEventListener("scroll", handleScroll)
    } else {
      window.removeEventListener("scroll", handleScroll)
    }

    return () => window.removeEventListener("scroll", handleScroll)
    // eslint-disable-next-line
  }, [hasNextData, loading]);

  return (
    <React.Fragment>
      {renderItem || children}
      {hasNextData && (<LinearProgress />)}
    </React.Fragment>
  );
};

FlatList.defaultProps = {
  renderItem: null,
  children: [],
  callNext: () => { },
  hasNextData: false,
  loading: false,
}

export default FlatList;