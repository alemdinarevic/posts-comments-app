import server from 'api/server'
import { Post, Comment, EMPTY_COMMENT, EMPTY_POST } from 'api/types/post';

export const getPosts: () => Promise<Post[]> = async () => {
    let posts: Post[] = []
    try {
        const res = await server.get('/posts');
        posts = res.data
    } catch (e) {
        console.error(e)
    }
    return posts;
}

export const getPost = async (id: number) => {
    let post: Post = EMPTY_POST
    try {
        const res = await server.get(`/posts/${id}`);
        post = res.data;
    } catch (e) {
        console.error(e)
    }
    return post;
}

export const getPostComments = async (id: number) => {
    let comment: Comment = EMPTY_COMMENT
    try {
        const res = await server.get(`/posts/${id}/comments`);
        comment = res.data;
    } catch (e) {
        console.error(e)
    }
    return comment
}