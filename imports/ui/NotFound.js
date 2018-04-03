import React from 'react';
import { Link } from 'react-router';

const NotFound = () => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>Not Found 404</h1>
      <p>Nothing Here</p>
      <Link to="/" className="button button-link">Go Home</Link>
    </div>
  </div>
);

export default NotFound;
