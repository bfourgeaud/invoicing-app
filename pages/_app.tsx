import 'windi.css'
import "styles/globals.scss";
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'lib/context/ThemeContext';
import { ScreenProvider } from 'lib/context/ScreenContext';
import Header from 'components/shared/Header';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return(
  <ThemeProvider>
    <ScreenProvider>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </ScreenProvider>
  </ThemeProvider>
)}

export default MyApp
