import React, { useState } from 'react';

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

export default BooksList;
