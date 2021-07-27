import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post'
import { actionCreators as postActions } from '../redux/modules/post'
import FlatList from '../shared/FlatList';

const PostList = (props) => {

  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.post.loading);
  const paging = useSelector((state) => state.post.paging);

  useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB())
    }
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <FlatList
        callNext={() => {
          if (loading) return;
          dispatch(postActions.getPostFB(paging.next, 3))
        }}
        hasNextData={paging.next ? true : false}
        loading={loading}
        renderItem={post_list.map((post, index) => {
          if (post.user_info.user_uid === user?.uid) {
            return <Post key={post.id + index} {...post} editable />
          } else {
            return <Post key={post.id + index} {...post} />
          }
        })}
      />
    </React.Fragment>
  )
}

export default PostList;