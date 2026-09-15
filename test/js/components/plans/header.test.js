import React from 'react';

import Header from '@/js/components/plans/header';

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
  const version = { id: 'v1', label: '1.0' };
  const plan = { id: 'plan-1', title: 'My Plan' };

  test('moves focus to the page heading on mount', () => {
    render(<Header product={product} version={version} plan={plan} />);

    const focused = document.activeElement;
    expect(focused).toHaveAttribute('tabindex', '-1');
    expect(focused).toHaveTextContent('My Plan');
  });
});
