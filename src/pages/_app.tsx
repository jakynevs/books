import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import globalStyles from "../components/styles/global";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <style jsx global>
        {globalStyles}
      </style>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
