import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default () => (
  <div className="footer">
    <Grid>
      <Row className="show-grid">
        <Col sm={6}>hello</Col>
        <Col sm={6}>world</Col>
      </Row>
    </Grid>
  </div>
);
