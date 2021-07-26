import React from 'react';
import { render } from '../testUtils';
import { Page } from '~/pages/main';

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Page />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
