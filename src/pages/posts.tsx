import React, { useContext } from 'react'
import PostsHome from 'components/posts';
import { AppContext } from 'contexts/AppContext';
import LoggerHOC from 'utils/logger-hoc';

const Posts = () => {
    const { posts } = useContext(AppContext)

    return (
        <PostsHome posts={posts} />
    )
}

export default LoggerHOC(Posts);