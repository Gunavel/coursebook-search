import React, { useState } from 'react';

function BooksList(props) {
  const { books } = props;

  return (
    <div className="books-list">
      {books.map(book => (
        <div key={book.title}>{book.author}</div>
      ))}
    </div>
  );
}

export default BooksList;
