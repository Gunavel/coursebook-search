import React from 'react';
import { shallow } from 'enzyme';

import Card from './index';

describe('Card', () => {
  it('should render with correct div elements', () => {
    const comp = shallow(<Card header="ss" footer="ff" content="cc" />);

    expect(comp.find('div.card').length).toEqual(1);

    // header
    const header = comp.find('div.header');
    expect(header.length).toEqual(1);
    expect(header.text()).toEqual('ss');

    // content
    const content = comp.find('div.content');
    expect(content.length).toEqual(1);
    expect(content.text()).toEqual('cc');

    // footer
    const footer = comp.find('div.footer');
    expect(footer.length).toEqual(1);
    expect(footer.text()).toEqual('ff');
  });
});
