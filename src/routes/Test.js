import React from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import ReactStars from 'react-stars';
import faker from 'faker';

const cards = [];
Array.from({ length: 24 }).forEach(async (_, i) => {
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
  <Grid>
    <h4>Top Chart</h4>
    <Row>
      {cards.map((card, i) => (
        <Col key={card.id} lg={3} md={4} sm={6} className="column">
          <Thumbnail src={card.image} alt={card.name} className="card">
            <h4>{card.name}</h4>
            <p>{card.description}</p>
            <div className="card-bottom">
              <Button bsStyle="primary">Button</Button>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={20}
                color1="#ddd"
                color2="#ffd700"
              />
            </div>
          </Thumbnail>
        </Col>
      ))}
    </Row>
  </Grid>
);
