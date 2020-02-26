import React, { Component } from 'react';

// Components
import AutoComplete from './auto-complete';

// API
const CourseBookFinder = require('../../api/course-book-finder');

// Helpers
import _debounce from '../../helpers/debounce';

// CSS
import './search-bar.css';

// Mock data
const mockData = require('../../../mock/data.json');

class FilterableSearchBar extends Component {
  constructor(props) {
    super(props);

    // Initialize local state
    this.state = {
      searchText: '',
      selectedBook: {},
      suggestionCount: 3,
      searchResults: [],
      showAutoComplete: false,
    };

    // Debounce search method
    this.performSearch = _debounce(this.performSearch, 500);
  }

  componentDidMount() {
    // Initialize CourseBookFinder API
    this.bookFinder = new CourseBookFinder(mockData);
  }

  handleSearchTextChange = searchText => {
    this.setState({
      searchText,
    });

    // It's debounced!
    this.performSearch();
  };

  handleSuggestionCountChange = suggestionCount => {
    this.setState({
      suggestionCount,
    });

    // It's debounced!
    this.performSearch();
  };

  performSearch = () => {
    const { searchText, suggestionCount } = this.state;

    this.bookFinder
      .search(searchText, suggestionCount)
      .then(this.updateSearchResults);
  };

  updateSearchResults = searchResults => {
    this.setState({
      searchResults,
      showAutoComplete: true,
    });
  };

  handleListItemSelection = item => {
    this.setState({
      searchText: item.title,
      selectedBook: item,
      showAutoComplete: false,
    });
  };

  handleSearchFormSubmit = () => {
    this.setState({
      searchText: '',
    });

    this.props.onSubmit(this.state.selectedBook);
  };

  render() {
    const {
      searchText,
      suggestionCount,
      searchResults,
      showAutoComplete,
    } = this.state;

    return (
      <div className="search-bar">
        <AutoComplete
          searchText={searchText}
          listItems={searchResults}
          showList={showAutoComplete}
          suggestionCount={suggestionCount}
          onListItemClick={this.handleListItemSelection}
          onSearchTextChange={this.handleSearchTextChange}
          onSuggestionCountChange={this.handleSuggestionCountChange}
          onFormSubmit={this.handleSearchFormSubmit}
        />
      </div>
    );
  }
}

export default FilterableSearchBar;
