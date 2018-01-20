import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="container">
    <div className="row">
      <h2 className="title">Admin</h2>
      <ul style={{ listStyle: 'none', fontSize: 14 }}>
        <li>
          <Link to="/admin/categories/bot">Categories</Link>
        </li>
        <li>
          <Link to="/admin/moderation">Moderation</Link>
        </li>
      </ul>
    </div>
  </div>
);
