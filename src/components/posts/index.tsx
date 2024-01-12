import React, { useContext, useMemo } from 'react'
import { AppContext, PostWithAuthor } from 'contexts/AppContext'

import './styles.css';
import SinglePost from 'components/post';

type PostsHomeProps = {
    posts: PostWithAuthor[]
}

const PostsHome = ({ posts }: PostsHomeProps) => {
    const { searchUser, setSearchUser } = useContext(AppContext)

    const filteredPosts = useMemo(
        () => posts?.filter(post => post.author?.name.toLowerCase().includes(searchUser.toLowerCase())),
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
            {filteredPosts.map(post => <SinglePost key={post.id} post={post} />)}
        </div>
    )
}

export default PostsHome