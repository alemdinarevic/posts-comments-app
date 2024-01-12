import React, { useContext } from 'react'
import PostsHome from 'components/posts';
import { AppContext } from 'contexts/AppContext';

const Posts = () => {
    const { posts } = useContext(AppContext)

    return (
        <PostsHome posts={posts} />
    )
}

export default Posts;