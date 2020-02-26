import React from 'react';
import { shallow } from 'enzyme';

import BooksList from './index';

describe('BooksList', () => {
  it('should render text when books is an empty array', () => {
    const comp = shallow(<BooksList books={[]} />);
    expect(comp.find('h4').text()).toEqual('No Books Selected');
  });

  it('should render correct number of Card components based on books length', () => {
    const books = [
      {
        title: 'welcome',
        summary: 'something',
        author: 'myself,',
      },
      {
        title: 'Hello',
        summary: 'nothing',
        author: 'yourself,',
      },
    ];
    const comp = shallow(<BooksList books={books} />);
    const cardComp = comp.find('Card');

    expect(cardComp.length).toEqual(2);
  });

  it('should render Card with correct props', () => {
    const books = [
      {
        title: 'welcome',
        summary: 'Something',
        author: 'myself',
      },
      {
        title: 'hello',
        summary: 'nothing',
        author: 'yourself',
      },
    ];
    const comp = shallow(<BooksList books={books} />);
    const cardComp = comp.find('Card');

    const expectedProps = {
      content: 'Something',
      footer: 'myself',
      header: 'welcome',
    };
    expect(cardComp.at(0).props()).toEqual(expectedProps);
  });
});
