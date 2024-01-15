import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// @ts-ignore
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContextProvider from 'contexts/AppContext';
import PostsHome from './index';
import { User } from 'api/types/user';

const mockPosts = [
    { id: 1, title: 'Test Post 1', body: 'Test post 1 body', userId: 1, author: { id: 1, name: 'User1' } as unknown as User },
    { id: 2, title: 'Test Post 2', body: 'Test post 2 body', userId: 2, author: { id: 2, name: 'User2' } as unknown as User },
];

const server = setupServer(
    rest.get('https://jsonplaceholder.typicode.com/posts', (_: any, res: any, ctx: any) => {
        return res(ctx.json(mockPosts));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('PostsHome renders correctly with mock data', async () => {
    render(
        <Router>
            <AppContextProvider>
                <PostsHome posts={mockPosts} />
            </AppContextProvider>
        </Router>
    );

    await waitFor(() => screen.getByText('Test Post 1'));

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
});

test('PostsHome filters posts based on user search', async () => {
    render(
        <Router>
            <AppContextProvider>
                <PostsHome posts={mockPosts} />
            </AppContextProvider>
        </Router>
    );

    await waitFor(() => screen.getByText('Test Post 1'));

    fireEvent.change(screen.getByPlaceholderText('Search posts by user'), { target: { value: 'User1' } });

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Post 2')).not.toBeInTheDocument();
});

test("Clicking link navigates to correct route", async () => {
    render(
        <Router>
            <AppContextProvider>
                <PostsHome posts={mockPosts} />
            </AppContextProvider>
        </Router>
    );

    await waitFor(() => screen.getByText('Test Post 1'));

    fireEvent.click(screen.getByText('Test Post 1'));
    expect(window.location.pathname).toBe('/posts/1');
})


