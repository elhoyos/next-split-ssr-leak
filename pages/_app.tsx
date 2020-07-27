import { AppProps } from 'next/app'
import { withSplit } from 'src/withSplit';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withSplit()(MyApp);
