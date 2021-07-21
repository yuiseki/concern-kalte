import Head from 'next/head';
import { GlobalStyles, css } from 'twin.macro';
import { Global } from '@emotion/react';
import { AppProps } from 'next/app';
import {} from 'react-icons/fa';

const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Concrn Kalte</title>
      <link rel='icon' href='/favicon.ico' />
      <link
        href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap'
        rel='stylesheet'
      />
    </Head>
    <GlobalStyles />
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
);

export default App;
