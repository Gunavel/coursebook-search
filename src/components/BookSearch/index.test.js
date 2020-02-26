import React from 'react';
import { shallow } from 'enzyme';

import BookSearch from './index';

describe('BookSearch', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  beforeEach(() => {
    wrapper = shallow(<BookSearch />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const searchBar = wrapper.find('FilterableSearchBar');
    expect(searchBar.length).toBe(1);

    const bookList = wrapper.find('BooksList');
    expect(bookList.length).toBe(1);
  });

  it('should not call setState if book is an empty object', () => {
    wrapper
      .find('FilterableSearchBar')
      .props()
      .onSubmit({});
    expect(setState).not.toHaveBeenCalled();
  });
});
