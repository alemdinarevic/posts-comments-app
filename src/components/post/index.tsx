import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Comment, EMPTY_COMMENT, Post } from 'api/types/post'

import './styles.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import server from 'api/server';
import LoggerHOC from 'utils/logger-hoc';

type SinglePostProps = {
    post?: Post,
}

const SinglePost = ({ post }: SinglePostProps) => {
    const navigate = useNavigate();
    const { postId: postIdParam } = useParams();

    const { users, setPost, getPost } = useContext(AppContext);
    const [comments, setComments] = useState<Comment[]>([]);
    const associatedUser = useMemo(() => users.find(user => user.id === post?.userId), [users]);


    const postRedirectHandler = () => {
        if (!postIdParam) {
            setPost(post)
            navigate(`/posts/${post?.id}`, { preventScrollReset: true })
        }
    }

    const getPostComments = async (id: number | string | undefined) => {
        let comments: Comment[] = []
        try {
            if (typeof id === undefined) return [EMPTY_COMMENT]
            const res = await server.get(`/posts/${id}/comments`);
            setComments(res.data);
            comments = res.data;
        } catch (e) {
            console.error(e)
        }
        return comments
    }

    useEffect(() => {
        if (postIdParam && getPost) getPost(postIdParam)
        if (post && getPostComments) getPostComments(post.id)
    }, [postIdParam])

    return (
        <div key={post?.id} className='single-post-wrapper'>
            <div className='single-post-container' onClick={postRedirectHandler}>
                {postIdParam && <Link to="/posts" preventScrollReset={true} onClick={() => setPost(undefined)}>back</Link>}
                <div className='post-info-container'>
                    <h3>{associatedUser?.name}</h3>
                    <h3>{post?.title}</h3>
                    <span>{post?.body}</span>
                </div>
                <div className='post-comments-container' style={{ height: postIdParam ? 'auto' : '200px' }}>
                    <h5>Comments: ({comments?.length})</h5>
                    {comments?.map(comment => (
                        <div key={comment.id}>
                            <h4>{comment.email}</h4>
                            <span>{comment.name}</span>
                            <span>{comment.body}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LoggerHOC(SinglePost)