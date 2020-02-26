import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_SUGGESTION_LIMIT = 3;

function AutoCompleteList(props) {
  const {
    listItems,
    onListItemClick,
    showList,
    searchText,
    suggestionCount,
    onSearchTextChange,
    onSuggestionCountChange,
    onFormSubmit,
  } = props;

  const handleListItemClick = item => () => {
    onListItemClick(item);
  };

  const handleSearchTextChange = e => {
    onSearchTextChange(e.target.value);
  };

  const handleSuggestionCountChange = e => {
    onSuggestionCountChange(e.target.value);
  };

  const handleSearchFormSubmit = e => {
    e.preventDefault();
    onFormSubmit();
  };

  const autoCompleteItems = listItems.length > 0 && showList && (
    <div className="autocomplete-items">
      {listItems.map(item => (
        <div
          className="list-item"
          key={item.title}
          onClick={handleListItemClick(item)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );

  return (
    <form autoComplete="off" onSubmit={handleSearchFormSubmit}>
      <div className="autocomplete">
        <input
          className="input-search"
          type="text"
          aria-label="Search"
          name="searchInput"
          placeholder="Search by keyword"
          value={searchText}
          onChange={handleSearchTextChange}
        />
        {autoCompleteItems}
        <input
          className="input-count"
          type="number"
          value={suggestionCount}
          onChange={handleSuggestionCountChange}
        />
        <button className="btn-submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

const itemShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
});

AutoCompleteList.propTypes = {
  listItems: PropTypes.arrayOf(itemShape),
  onListItemClick: PropTypes.func.isRequired,
  showList: PropTypes.bool,
  searchText: PropTypes.string,
  suggestionCount: PropTypes.number,
  onSearchTextChange: PropTypes.func.isRequired,
  onSuggestionCountChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

AutoCompleteList.defaultProps = {
  listItems: [],
  showList: true,
  searchText: '',
  suggestionCount: DEFAULT_SUGGESTION_LIMIT,
};

export default AutoCompleteList;
