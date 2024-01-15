// SinglePost.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// @ts-ignore
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';
import SinglePost from './index';

const mockPost = {
  id: 1,
  userId: 1,
  title: 'Test Post',
  body: 'This is a test post body',
};

const mockComments = [
  { id: 1, postId: 1, email: 'test@example.com', name: 'Test Comment', body: 'This is a test comment' },
];

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/posts/1', (_: any, res: any, ctx: any) => {
    return res(ctx.json(mockPost));
  }),
  rest.get('https://jsonplaceholder.typicode.com/posts/1/comments', (_: any, res: any, ctx: any) => {
    return res(ctx.json(mockComments));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('SinglePost renders correctly with mock data', async () => {
  render(
    <Router>
      <SinglePost post={mockPost} />
    </Router>
  );

  await waitFor(() => screen.getByText('This is a test post body'));

  expect(screen.getByText('Test Post')).toBeInTheDocument();
  expect(screen.getByText('This is a test post body')).toBeInTheDocument();
  expect(screen.getByText('Comments: (1)')).toBeInTheDocument();
  expect(screen.getByText('test@example.com')).toBeInTheDocument();
  expect(screen.getByText('Test Comment')).toBeInTheDocument();
  expect(screen.getByText('This is a test comment')).toBeInTheDocument();
});

// Add more test cases as needed...
