import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

beforeAll(() => {
  window.matchMedia = window.matchMedia || (() => ({
    addEventListener: jest.fn(),
    addListener: jest.fn(),
    dispatchEvent: jest.fn(),
    matches: true,
    media: '',
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(),
  }));
});

test('applies a custom array to Quick Sort', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: /Initialize Workspace/i }));
  await userEvent.click(screen.getByRole('button', { name: /Quick Sort/i }));

  const editor = screen.getByRole('textbox');

  await userEvent.clear(editor);
  await userEvent.type(editor, '9, 1, 5, 3');
  await userEvent.click(screen.getByRole('button', { name: /Apply/i }));

  expect(screen.getByText('[9, 1, 5, 3]')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Quick Sort' })).toBeInTheDocument();
});
