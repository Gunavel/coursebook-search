import React from 'react';

// Components
import BookSearch from './components/BookSearch';

// CSS
import './app.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">Search Books</header>
      <BookSearch />
    </div>
  );
}

export default App;
