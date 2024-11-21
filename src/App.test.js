import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Data Extraction tool link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Data Extraction tool/i);
  expect(linkElement).toBeInTheDocument();
});
