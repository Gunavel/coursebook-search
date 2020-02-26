import React from 'react';

// CSS
import './card.css';

function Card(props) {
  const { header, footer, content } = props;

  return (
    <div className="card">
      <div className="header">
        <h2>{header}</h2>
      </div>
      <div className="content">
        <p>{content}</p>
      </div>
      <div className="footer">
        <h3>{footer}</h3>
      </div>
    </div>
  );
}

export default Card;
