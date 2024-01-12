import React from 'react'
import { Post } from 'api/types/post'
import { Link } from 'react-router-dom'

import './styles.css';

type HomePageProps = {
    posts: Post[]
}

const HomePage = ({ posts }: HomePageProps) => {
    return (
        <div className='home-container'>
            <h2>Welcome to our posts app</h2>
            <span>Total number of posts: {posts.length}. </span>
            <Link to='/posts'>See all posts</Link>
        </div>
    )
}

export default HomePage;