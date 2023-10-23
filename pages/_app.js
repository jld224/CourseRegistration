import React from 'react';
import '../styles/globals.css'; // Your global styles
import Layout from '../components/Layout'; // Adjust the import path as needed

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;