import {ThemeProvider} from '@material-ui/core'
import { AppProps } from 'next/app';
import Head from 'next/head';
import tema from '../../lib/theme'
import CssBaseline from '@material-ui/core/CssBaseline';

// import LayoutWithMenu from '../../components/layout/LayoutWithMenu/LayoutWithMenu'

import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ALFA SENSE</title>
        <meta 
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-with"
        />
      </Head>
      <ThemeProvider theme={tema}> 
        {/* <LayoutWithMenu> */}

          <CssBaseline />
          <Component {...pageProps} />
        {/* </LayoutWithMenu> */}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
