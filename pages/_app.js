import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { motion } from "framer-motion";

import "../styles/main.css";

function MyApp({ Component, pageProps, router }) {
  return (
    <ApolloProvider client={client}>
      <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1
        }
      }}>
        <Component {...pageProps} />
      </motion.div>
    </ApolloProvider>
  );
}

export default MyApp;