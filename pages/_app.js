import { MantineProvider } from '@mantine/core';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;