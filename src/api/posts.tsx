import server from 'api/server'
import { Post, Comment, EMPTY_COMMENT, EMPTY_POST } from 'api/types/post';

export const getPosts = async () => {
    try {
        const response = await server.get('/posts');
        return response
    } catch (e) {
        console.error(e)
    }
}

export const getPost = async (id: number) => {
    let post: Post = EMPTY_POST
    try {
        const response = await server.get(`/posts/${id}`);
        return response;
    } catch (e) {
        console.error(e)
    }
}

export const getPostComments = async (id: number) => {
    let comment: Comment = EMPTY_COMMENT
    try {
        const response = await server.get(`/posts/${id}/comments`);
        return response;
    } catch (e) {
        console.error(e)
    }
    return comment
}