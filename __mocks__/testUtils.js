import mediaQuery from 'css-mediaquery';

import { render } from '@testing-library/react';

import Providers from '@components/utils/Providers.tsx';

function createMatchMedia(width) {
  return (query) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
}

const resizeScreen = (width) => {
  window.matchMedia = createMatchMedia(width);
}

const renderWithProviders = (ui, options) => render(ui, {wrapper: Providers, ...options});

export { 
  resizeScreen,
  renderWithProviders as render
};
