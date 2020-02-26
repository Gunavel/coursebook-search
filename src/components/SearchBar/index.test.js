import React from 'react';
import { shallow } from 'enzyme';

import FilterableSearchBar from './index';
import AutoComplete from './auto-complete';

describe('FilterableSearchBar', () => {
  it('should render without errors', () => {
    const noop = () => {};
    const comp = shallow(<FilterableSearchBar onSubmit={noop} />);

    expect(comp.find(AutoComplete).length).toEqual(1);
  });
});

describe('FilterableSearchBar Instance methods', () => {
  describe('handleSearchTextChange', () => {
    it('should call setState and performSearch', () => {
      const noop = () => {};
      const comp = shallow(<FilterableSearchBar onSubmit={noop} />);
      const instance = comp.instance();

      // Mocks
      instance.setState = jest.fn();
      instance.performSearch = jest.fn();

      const searchText = 'welcome';
      instance.handleSearchTextChange(searchText);

      expect(instance.setState).toHaveBeenCalledWith({ searchText });
      expect(instance.performSearch).toHaveBeenCalled();
    });
  });

  describe('handleSuggestionCountChange', () => {
    it('should call setState and performSearch', () => {
      const noop = () => {};
      const comp = shallow(<FilterableSearchBar onSubmit={noop} />);
      const instance = comp.instance();

      // Mocks
      instance.setState = jest.fn();
      instance.performSearch = jest.fn();

      const suggestionCount = 5;
      instance.handleSuggestionCountChange(suggestionCount);

      expect(instance.setState).toHaveBeenCalledWith({ suggestionCount });
      expect(instance.performSearch).toHaveBeenCalled();
    });
  });

  describe('updateSearchResults', () => {
    it('should call setState', () => {
      const noop = () => {};
      const comp = shallow(<FilterableSearchBar onSubmit={noop} />);
      const instance = comp.instance();

      // Mocks
      instance.setState = jest.fn();

      const searchResults = [];
      const data = {
        searchResults,
        showAutoComplete: true,
      };
      instance.updateSearchResults(searchResults);
      expect(instance.setState).toHaveBeenCalledWith(data);
    });
  });

  describe('handleListItemSelection', () => {
    it('should call setState', () => {
      const noop = () => {};
      const comp = shallow(<FilterableSearchBar onSubmit={noop} />);
      const instance = comp.instance();

      // Mocks
      instance.setState = jest.fn();

      const item = {
        title: 'hello',
      };
      const data = {
        searchText: item.title,
        selectedBook: item,
        showAutoComplete: false,
      };
      instance.handleListItemSelection(item);
      expect(instance.setState).toHaveBeenCalledWith(data);
    });
  });

  describe('handleSearchFormSubmit', () => {
    it('should call setState and onSubmit props function', () => {
      const onSubmit = jest.fn();
      const comp = shallow(<FilterableSearchBar onSubmit={onSubmit} />);
      const instance = comp.instance();

      // Mocks
      instance.setState = jest.fn();

      // set State
      const selectedBook = {
        title: 'hello',
      };
      comp.setState({
        selectedBook,
      });

      const data = {
        searchText: '',
      };
      instance.handleSearchFormSubmit();
      expect(instance.setState).toHaveBeenCalledWith(data);
      expect(instance.props.onSubmit).toHaveBeenCalledWith(selectedBook);
    });
  });
});
