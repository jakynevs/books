import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../components/styles/global";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
