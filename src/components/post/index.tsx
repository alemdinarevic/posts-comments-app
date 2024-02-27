import React, { useContext, useMemo, useState } from 'react'
import { Comment, Post } from 'api/types/post'

import './styles.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import server from 'api/server';
import LoggerHOC from 'utils/logger-hoc';
import { useQuery } from '@tanstack/react-query';

type SinglePostProps = {
    post: Post,
}

const SinglePost = ({ post }: SinglePostProps) => {
    const navigate = useNavigate();
    const { postId: postIdParam } = useParams();

    const { users, setPostId } = useContext(AppContext);
    const associatedUser = useMemo(() => users.find(user => user.id === post?.userId), [users]);

    const { data: postComments, isLoading: commentsLoading } = useQuery({
        queryKey: ["post", post.id, "comments"],
        queryFn: () => getPostComments(post.id)
    })

    const postRedirectHandler = () => {
        if (!postIdParam) {
            setPostId(post.id as unknown as string)
            navigate(`/posts/${post?.id}`, { preventScrollReset: true })
        }
    }

    const getPostComments = async (id: number | string | undefined) => {
        let comments: Comment[] = []
        try {
            // if (typeof id === undefined) return [EMPTY_COMMENT]
            const res = await server.get(`/posts/${id}/comments`);
            comments = res.data;
            return res
        } catch (e) {
            console.error(e)
        }
        return comments
    }

    return (
        <div key={post?.id} className='single-post-wrapper'>
            <div className='single-post-container' onClick={postRedirectHandler}>
                {postIdParam && <Link to="/posts" preventScrollReset={true} onClick={() => setPostId('')}>back</Link>}
                <div className='post-info-container'>
                    <h3>{associatedUser?.name}</h3>
                    <h3>{post?.title}</h3>
                    <span>{post?.body}</span>
                </div>
                {commentsLoading ? <div>loading comments...</div> :
                    <div className='post-comments-container' style={{ height: postIdParam ? 'auto' : '200px' }}>
                        {/* @ts-ignore */}
                        <h5>Comments: ({(postComments)?.data.length})</h5>
                        {/* @ts-ignore */}
                        {postComments && (postComments)?.data.map(comment => (
                            <div key={comment.id}>
                                <h4>{comment.email}</h4>
                                <span>{comment.name}</span>
                                <span>{comment.body}</span>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default LoggerHOC(SinglePost)