import React from 'react';

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
        <div key={item.title} onClick={handleListItemClick(item)}>
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

export default AutoCompleteList;
