import React, { useContext } from 'react'
import { AppContext } from 'contexts/AppContext';
import HomePage from 'components/home';
import LoggerHOC from 'utils/logger-hoc';

const Home = () => {

    const { posts } = useContext(AppContext)

    // const { data, isLoading } = useQuery({ queryKey: ["posts"], queryFn: getPosts })

    return (
        <HomePage posts={posts ?? []} message='HP: Hello from' />
    )
}

export default LoggerHOC(Home);