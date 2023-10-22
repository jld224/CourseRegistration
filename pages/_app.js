import Navbar from '../components/Navbar';
import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <MantineProvider theme={{ colorScheme: 'dark' }}>
        <Navbar />
        <Component {...pageProps} />
      </MantineProvider>
    </div>
  )
}

export default MyApp;