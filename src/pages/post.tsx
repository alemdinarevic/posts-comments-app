import React, { useContext, useEffect } from 'react'
import { AppContext } from 'contexts/AppContext';
import { useParams } from "react-router-dom";
import SinglePost from 'components/post';

const Post = () => {
    const { postId } = useParams();
    const { post, getPost } = useContext(AppContext)

    useEffect(() => {
        if (!post && getPost) getPost(postId)
    }, []);

    return (
        <SinglePost post={post} />
    )
}

export default Post;