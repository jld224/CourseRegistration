import React from 'react';
import '../styles/globals.css'; // Your global styles
import DefaultLayout from '../components/Layout'; // Adjust to your main layout path
import LoginLayout from '../components/LoginLayout'; // Adjust to your secondary layout path

function MyApp({ Component, pageProps }) {
  // If the incoming component has a layout property, use it; otherwise, fall back to DefaultLayout
  const Layout = Component.Layout || DefaultLayout;

  // Render the current page component inside the determined layout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;