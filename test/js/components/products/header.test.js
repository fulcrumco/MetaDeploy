import React from 'react';

import Header from '@/js/components/products/header';

import { render } from './../../utils';

describe('<Header />', () => {
  const product = {
    id: 'p1',
    slug: 'product-1',
    title: 'Product 1',
    category: 'salesforce',
    icon: {
      type: 'url',
      url: 'http://foo.bar',
    },
  };

  test('moves focus to the page heading on mount', () => {
    render(<Header product={product} versionLabel="1.0" />);

    const focused = document.activeElement;
    expect(focused).toHaveAttribute('tabindex', '-1');
    expect(focused).toHaveTextContent('Select a Plan');
  });
});
