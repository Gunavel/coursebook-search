import React, { useState } from 'react';

// Components
import FilterableSearchBar from '../SearchBar';
import BooksList from '../BooksList';

// Helpers
import _isEmptyObject from '../../helpers/is-empty-object';

function BookFinder() {
  const [books, setBooks] = useState([]);

  const handleSearchSubmit = book => {
    if (_isEmptyObject(book)) {
      return;
    }

    const isBookAdded = books.find(({ title }) => title === book.title);
    if (!isBookAdded) {
      setBooks([...books, book]);
    }
  };

  return (
    <div className="book-finder">
      <FilterableSearchBar onSubmit={handleSearchSubmit} />
      <BooksList books={books} />
    </div>
  );
}

export default BookFinder;
