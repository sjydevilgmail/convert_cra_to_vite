import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello world text', () => {
  render(<App />);
  const headingElement = screen.getByText('Hello Wd');
  expect(headingElement).toBeInTheDocument();
});

test('renders vite and react logos', () => {
  render(<App />);
  const viteLogo = screen.getByAltText('Vite logo');
  const reactLogo = screen.getByAltText('React logo');
  expect(viteLogo).toBeInTheDocument();
  expect(reactLogo).toBeInTheDocument();
});
