import React, { useContext, useMemo } from 'react'
import { AppContext, PostWithAuthor } from 'contexts/AppContext'

import './styles.css';
import SinglePost from 'components/post';
import LoggerHOC from 'utils/logger-hoc';

type PostsHomeProps = {
    posts: PostWithAuthor[]
    postsLoading?: boolean
}

const PostsHome = ({ posts, postsLoading = false }: PostsHomeProps) => {
    const { searchUser, setSearchUser } = useContext(AppContext)

    const filteredPosts = useMemo(
        () => posts.filter(post => post.author?.name.toLowerCase().includes(searchUser.toLowerCase())),
        [searchUser, posts]
    )

    return (
        <div className='posts-container'>
            <h2>Posts Feed</h2>
            <input
                name={searchUser}
                onChange={(event) => setSearchUser(event.target.value)}
                placeholder='Search posts by user'
            />
            {filteredPosts.length > 0 ? filteredPosts.map(post => <SinglePost key={post.id} post={post} />) : <h3>No posts.</h3>}
        </div>
    )
}

export default LoggerHOC(PostsHome)