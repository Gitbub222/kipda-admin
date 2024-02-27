import { AppProps } from 'next/app';
import RootLayout from '@/layout'; 

function MyApp({ Component, pageProps }: AppProps) {

  const { pageTitle, pageDescription, ...restPageProps } = pageProps;

  return (
    <RootLayout pageTitle={pageTitle} pageDescription={pageDescription}>
      <Component {...restPageProps} />
    </RootLayout>
  );
}

export default MyApp;
