import React from 'react';
import PropTypes from 'prop-types';

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

Card.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  content: PropTypes.node,
};

Card.defaultProps = {
  header: '',
  footer: '',
  content: '',
};

export default Card;
