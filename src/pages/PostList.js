import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostDetail from './PostDetail'
import { actionCreators as postActions }  from '../redux/modules/post'


const PostList = (props) => {

  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list)

  useEffect(()=> {
    dispatch(postActions.getPostFB())
  }, [dispatch])

  return (
    <React.Fragment>
      { post_list.map((post) => {
        return <PostDetail key={post.id} {...post} />
      })}
    </React.Fragment>
  )
}

export default PostList;