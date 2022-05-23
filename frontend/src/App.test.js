import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import BrowseArticles from "./Components/BrowseArticles";


test ('renders table',() => {
  render(<BrowseArticles/>);
  const titleHeading = screen.getByTestId('tableTest');
  expect(titleHeading).toBeInTheDocument();
})

test('', async () => {
  render(<BrowseArticles/>);
  const authorHeading = screen.getByTestId('authorsTest');
  fireEvent.click(authorHeading);
  await expect(screen.getByTestId('sortOrderTest').toBeInTheDocument);
})
