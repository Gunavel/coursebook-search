import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Card from '../Card';

// CSS
import './books-list.css';

function BooksList(props) {
  const { books } = props;

  if (books.length === 0) {
    return <h4>No Books Selected</h4>;
  }

  return (
    <div className="books-list">
      {books.map(book => (
        <Card
          key={book.title}
          header={book.title}
          content={book.summary}
          footer={book.author}
        />
      ))}
    </div>
  );
}

const bookShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
});
BooksList.propTypes = {
  books: PropTypes.arrayOf(bookShape),
};

BooksList.defaultProps = {
  books: [],
};

export default BooksList;
