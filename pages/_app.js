import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div id='modal-root'></div>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
