import React from 'react';
import ReactStars from 'react-stars';
import faker from 'faker';

const cards = [];
Array.from({ length: 55 }).forEach(async (_, i) => {
  cards.push({
    id: i,
    name: faker.name.findName(),
    category: 'Games',
    description: faker.lorem.sentence(3),
    image: faker.image.image()
  });
});

const ratingChanged = newRating => {
  console.log(newRating);
};

export default () => (
  <div className="content">
    <div className="container">
      {cards.map((card, i) => (
        <div key={i} className="item">
          <b>{card.name}</b>
          <br />
          <p>{card.description}</p>
          <div className="card-bottom" />
        </div>
      ))}
    </div>
  </div>
);
