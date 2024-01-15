import React from 'react'
import { Post } from 'api/types/post'
import { Link } from 'react-router-dom'

import './styles.css';
import LoggerHOC from 'utils/logger-hoc';

type HomePageProps = {
    posts: Post[]
}

const HomePage = ({ posts }: HomePageProps) => {
    return (
        <div className='home-container'>
            <h2>Welcome to our posts app</h2>
            <h3>Total number of posts: <span>{posts.length}</span>. </h3>
            <Link to='/posts'>See all posts</Link>
        </div>
    )
}

export default LoggerHOC(HomePage);