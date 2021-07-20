import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post'
import { actionCreators as postActions } from '../redux/modules/post'


const PostList = (props) => {

  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list)
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB())
    }
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      {post_list.map((post) => {
        if (post.user_info.user_uid === user?.uid) {
          return <Post key={post.id} {...post} editable />
        } else {
          return <Post key={post.id} {...post} />
        }
      })}
    </React.Fragment>
  )
}

export default PostList;