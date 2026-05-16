import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

beforeAll(() => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: 1800,
  });
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
  await screen.findByRole('heading', { name: 'Bubble Sort' });
  const sidebarToggle = screen.queryByRole('button', { name: /Show algorithm sidebar/i });
  if (sidebarToggle) {
    await userEvent.click(sidebarToggle);
  }
  await userEvent.click(screen.getByRole('button', { name: /Quick Sort/i }));
  await screen.findByRole('heading', { name: 'Quick Sort' });

  const editor = screen.getByRole('textbox');
  await waitFor(() => expect(editor.value).not.toBe(''));

  await userEvent.clear(editor);
  await userEvent.type(editor, '9, 1, 5, 3');
  await userEvent.click(screen.getByRole('button', { name: /Apply/i }));

  expect(await screen.findByText('[9, 1, 5, 3]')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Quick Sort' })).toBeInTheDocument();
});
