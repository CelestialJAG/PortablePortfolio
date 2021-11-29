import { ChakraProvider, theme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  </ChakraProvider>
);

export default MyApp;
