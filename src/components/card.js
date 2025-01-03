'use client';

import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function FactCard({ fact }) {
  return (
    <Card>
      <Card.Body>{fact}</Card.Body>
    </Card>
  );
}
FactCard.propTypes = {
  fact: PropTypes.string.isRequired,
};

export default FactCard;
