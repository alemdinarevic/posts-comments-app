import { render } from '@testing-library/react';
import App from './App';

test('renders all posts', () => {
  // init route /
  const { container } = render(<App />);
  const postsNumber = Number(container.querySelector('h3'));
  expect(postsNumber).toBe(0);
});
