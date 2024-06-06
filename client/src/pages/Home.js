import React from 'react';
import MovieSearch from '../components/MovieSearch';
import Layout from '../components/layout';

const Home = () => {
  return (
    <Layout>
      <h1>Welcome to Movie Finder</h1>
      <MovieSearch />
    </Layout>
  );
};

export default Home;
