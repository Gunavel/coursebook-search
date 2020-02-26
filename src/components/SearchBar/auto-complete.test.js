import React from 'react';
import { shallow } from 'enzyme';

import AutoCompleteList from './auto-complete';

describe('AutoCompleteList', () => {
  it('should render without errors', () => {
    const listItems = [
      {
        title: 'hello',
        summary: 'something',
        author: 'myself,',
      },
    ];
    const noop = () => {};
    const comp = shallow(
      <AutoCompleteList
        listItems={listItems}
        onListItemClick={noop}
        showList
        searchText="hi"
        suggestionCount={5}
        onSearchTextChange={noop}
        onSuggestionCountChange={noop}
        onFormSubmit={noop}
      />
    );

    expect(comp.find('form').length).toEqual(1);
    expect(comp.find('input').length).toEqual(2);
    expect(comp.find('button').length).toEqual(1);
  });

  it('should call onFormSubmit when submit button is clicked', () => {
    const listItems = [
      {
        title: 'hello',
        summary: 'something',
        author: 'myself,',
      },
    ];
    const noop = () => {};
    const onFormSubmit = jest.fn();
    const comp = shallow(
      <AutoCompleteList
        listItems={listItems}
        onListItemClick={noop}
        showList
        searchText="hi"
        suggestionCount={5}
        onSearchTextChange={noop}
        onSuggestionCountChange={noop}
        onFormSubmit={onFormSubmit}
      />
    );

    const fakeEvent = {
      preventDefault: noop,
    };
    comp
      .find('form')
      .props()
      .onSubmit(fakeEvent);
    expect(onFormSubmit).toHaveBeenCalled();
  });

  it('should call onFormSubmit when submit button is clicked', () => {
    const listItems = [
      {
        title: 'hello',
        summary: 'something',
        author: 'myself,',
      },
    ];
    const noop = () => {};
    const onSuggestionCountChange = jest.fn();
    const comp = shallow(
      <AutoCompleteList
        listItems={listItems}
        onListItemClick={noop}
        showList
        searchText="hi"
        suggestionCount={5}
        onSearchTextChange={noop}
        onSuggestionCountChange={onSuggestionCountChange}
        onFormSubmit={noop}
      />
    );

    const fakeEvent = {
      target: {
        value: 5,
      },
    };
    comp
      .find('.input-count')
      .props()
      .onChange(fakeEvent);
    expect(onSuggestionCountChange).toHaveBeenCalledWith(5);
  });

  it('should call onFormSubmit when submit button is clicked', () => {
    const listItems = [
      {
        title: 'hello',
        summary: 'something',
        author: 'myself,',
      },
    ];
    const noop = () => {};
    const onSearchTextChange = jest.fn();
    const comp = shallow(
      <AutoCompleteList
        listItems={listItems}
        onListItemClick={noop}
        showList
        searchText="hi"
        suggestionCount={5}
        onSearchTextChange={onSearchTextChange}
        onSuggestionCountChange={noop}
        onFormSubmit={noop}
      />
    );

    const fakeEvent = {
      target: {
        value: 'hey man',
      },
    };
    comp
      .find('.input-search')
      .props()
      .onChange(fakeEvent);
    expect(onSearchTextChange).toHaveBeenCalledWith('hey man');
  });

  it('should call onFormSubmit when submit button is clicked', () => {
    const listItems = [
      {
        title: 'hello',
        summary: 'something',
        author: 'myself,',
      },
    ];
    const noop = () => {};
    const onListItemClick = jest.fn();
    const comp = shallow(
      <AutoCompleteList
        listItems={listItems}
        onListItemClick={onListItemClick}
        showList
        searchText="hi"
        suggestionCount={5}
        onSearchTextChange={noop}
        onSuggestionCountChange={noop}
        onFormSubmit={noop}
      />
    );

    comp
      .find('.list-item')
      .at(0)
      .props()
      .onClick(listItems[0]);
    expect(onListItemClick).toHaveBeenCalledWith(listItems[0]);
  });
});
