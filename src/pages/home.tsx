import React, { useContext } from 'react'
import { AppContext } from 'contexts/AppContext';
import HomePage from 'components/home';
import LoggerHOC from 'utils/logger-hoc';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from 'api/posts';

const Home = () => {

    const { posts } = useContext(AppContext)

    // const { data, isLoading } = useQuery({ queryKey: ["posts"], queryFn: getPosts })

    return (
        <HomePage posts={posts ?? []} message='HP: Hello from' />
    )
}

export default LoggerHOC(Home);