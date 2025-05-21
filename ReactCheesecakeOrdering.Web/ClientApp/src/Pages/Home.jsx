import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh', backgroundColor: 'rgb(238, 238, 238)' }}
    >
      <div className="text-center">
        <h1 className="display-4">Welcome to the Cheesecake Factory</h1>
        <p className="lead">
          <Link to="/order" className="btn btn-dark btn-lg">
            Click here to order your own custom cheesecake
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;