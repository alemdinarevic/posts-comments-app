export type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
}

export type Comment = {
    postId: number,
    id: number,
    email: string,
    name: string,
    body: string
}

export const EMPTY_POST = {
    userId: 0,
    id: 0,
    title: "No post",
    body: "No post yet"
}

export const EMPTY_COMMENT = {
    postId: 0,
    id: 0,
    email: 'none',
    name: "No post",
    body: "No post yet"
}