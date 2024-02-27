import React, { useContext } from 'react'
import { AppContext } from 'contexts/AppContext';
import SinglePost from 'components/post';
import LoggerHOC from 'utils/logger-hoc';
import { Post as PostType } from 'api/types/post';

const Post = () => {

    const { post } = useContext(AppContext)

    return (
        <SinglePost post={post as PostType} />
    )
}

export default LoggerHOC(Post);