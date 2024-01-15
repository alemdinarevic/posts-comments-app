import { createContext, useEffect, useMemo, useState } from "react";
import server from "api/server";
import { Post, EMPTY_POST } from "api/types/post";
import { User } from "api/types/user";

type ContextProps = {
    children: React.ReactNode
}

export type PostWithAuthor = Post & { author: User }

type ContextType = {
    users: User[],
    posts: PostWithAuthor[],
    post?: Post,
    setPost: React.Dispatch<React.SetStateAction<Post | undefined>>,
    getPost?: (id: number | string | undefined) => Promise<Post>,
    searchUser: string,
    setSearchUser: React.Dispatch<React.SetStateAction<string>>
}

const INIT_STATE = {
    users: [],
    posts: [],
    setPost: () => { },
    searchUser: '',
    setSearchUser: () => { }
}

export const AppContext = createContext<ContextType>(INIT_STATE)

const AppContextProvider = ({ children }: ContextProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [post, setPost] = useState<Post>();
    const [searchUser, setSearchUser] = useState<string>('')

    const getUsers = async () => {
        let users: User[] = []
        try {
            const res = await server.get('/users');
            setUsers(res.data)
            users = res.data;
        } catch (e) {
            console.error(e)
        }
        return users;
    }

    const getPosts = async () => {
        let posts: Post[] = []
        try {
            const res = await server.get('/posts');
            setPosts(res.data);
            posts = res.data;
        } catch (e) {
            console.error(e)
        }
        return posts;
    }

    const getPost = async (id: number | string | undefined) => {
        let post: Post = EMPTY_POST
        try {
            if (typeof id === undefined) return EMPTY_POST
            const res = await server.get(`/posts/${id}`);
            setPost(res.data);
            post = res.data;
        } catch (e) {
            console.error(e)
        }
        return post;
    }

    const postsWithUsers = useMemo(() =>
        posts.map(post => ({ ...post, author: users.find(user => user.id === post.userId) as User })),
        [posts, users]
    )

    useEffect(() => {
        getPosts();
        getUsers();
    }, [])

    return (
        <AppContext.Provider value={{ users, posts: postsWithUsers, post, setPost, getPost, searchUser, setSearchUser }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
