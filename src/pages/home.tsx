import React, { useContext } from 'react'
import { AppContext } from 'contexts/AppContext';
import HomePage from 'components/home';

const Home = () => {
    const { posts } = useContext(AppContext)

    return (
        <HomePage posts={posts} />
    )
}

export default Home;