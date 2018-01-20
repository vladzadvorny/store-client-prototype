import React from 'react';

export default ({ rating }) => {
  if (rating < 1.5) {
    return <div className="stars">★☆☆☆☆</div>;
  } else if (rating < 2.5) {
    return <div className="stars">★★☆☆☆</div>;
  } else if (rating < 3.5) {
    return <div className="stars">★★★☆☆</div>;
  } else if (rating < 4.5) {
    return <div className="stars">★★★★☆</div>;
  }
  return <div className="stars">★★★★★</div>;
};
