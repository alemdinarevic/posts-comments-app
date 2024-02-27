import { createContext, useMemo, useState } from "react";
import server from "api/server";
import { Post, EMPTY_POST, Comment } from "api/types/post";
import { User } from "api/types/user";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "utils/debounce";

type ContextProps = {
    children: React.ReactNode
}

export type PostWithAuthor = Post & { author: User }

type ContextType = {
    users: User[],
    posts: PostWithAuthor[],
    post?: Post,
    // setPost?: React.Dispatch<React.SetStateAction<Post | undefined>>,
    postId: string,
    setPostId: React.Dispatch<React.SetStateAction<string>>,
    getPost?: (id: number | string | undefined) => Promise<Post>,
    searchUser: string,
    setSearchUser: (val: string) => void
    debouncedSearch: string,
    postComments?: Comment[]
}

const INIT_STATE = {
    users: [],
    posts: [],
    setPost: () => { },
    postId: '',
    setPostId: () => { },
    searchUser: '',
    setSearchUser: () => { },
    debouncedSearch: ''
}

export const AppContext = createContext<ContextType>(INIT_STATE)

const AppContextProvider = ({ children }: ContextProps) => {
    const [postId, setPostId] = useState<string>('');
    const [searchUser, setSearchUser] = useState<string>('')

    const { data: posts, isLoading: postsLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: () => getPosts()
    })

    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers()
    })

    const { data: postData } = useQuery({
        queryKey: ["post", postId],
        queryFn: () => getPost(postId)
    })

    const { data: postComments } = useQuery({
        queryKey: ["post", postId, "comments"],
        queryFn: () => getPostComments(postId)
    })

    const debouncedSearch = useDebounce(searchUser);

    const getUsers = async () => {
        try {
            const res = await server.get('/users');
            return res
        } catch (e) {
            console.error(e)
        }
    }

    const getPosts = async () => {
        try {
            const res = await server.get('/posts');
            return res
        } catch (e) {
            console.error(e)
        }
    }

    const getPost = async (id: number | string | undefined) => {
        try {
            const res = await server.get(`/posts/${id}`);
            return res
        } catch (e) {
            console.error(e)
        }
    }

    const getPostComments = async (id: number | string | undefined) => {
        try {
            const res = await server.get(`/posts/${id}/comments`);
            return res
        } catch (e) {
            console.error(e)
        }
    }


    const postsWithUsers = useMemo(() =>
        !postsLoading && posts ? posts.data.map((post: Post) => ({ ...post, author: users?.data.find((user: User) => user.id === post.userId) as User })) : [],
        [posts, users]
    )


    return (
        <AppContext.Provider
            value={{
                users: users?.data ?? [],
                posts: postsWithUsers ?? [],
                post: postData?.data ?? EMPTY_POST,
                postId,
                setPostId,
                searchUser,
                setSearchUser,
                debouncedSearch,
                postComments: postComments?.data
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
