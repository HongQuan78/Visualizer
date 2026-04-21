import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand name', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/Kinetic Blueprint/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
