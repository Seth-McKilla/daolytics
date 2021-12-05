import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Navigation } from "../components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </ChakraProvider>
  );
}
