import HomePage from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import { User } from 'api/types/user';
import { BrowserRouter as Router } from 'react-router-dom';

const mockPosts = [
    { id: 1, title: 'Test Post 1', body: 'Test post 1 body', userId: 1, author: { id: 1, name: 'User1' } as unknown as User },
    { id: 2, title: 'Test Post 2', body: 'Test post 2 body', userId: 2, author: { id: 2, name: 'User2' } as unknown as User },
];

test('renders correct number of posts posts', () => {
    const { container } = render(<HomePage posts={[]} />);
    const postsNumber = Number(container.querySelector('span'));
    expect(postsNumber).toBe(0);
});

test('HomePage renders correctly with mock data', () => {
    render(
        <Router>
            <HomePage posts={mockPosts} />
        </Router>
    );

    // Check if the component renders correctly with the mock data
    expect(screen.getByText('Welcome to our posts app')).toBeInTheDocument();
    expect(screen.getByText('Total number of posts:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Assuming there are 2 posts in the mock data
    expect(screen.getByText('See all posts')).toBeInTheDocument();
});

test('Clicking link navigates to correct route', () => {
    const { container } = render(
        <Router>
            <HomePage posts={mockPosts} />
        </Router>
    );

    // Click the "See all posts" link
    fireEvent.click(screen.getByText('See all posts'));

    // Check if the URL has changed to the correct route
    expect(window.location.pathname).toBe('/posts');
});

