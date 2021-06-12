import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { motion } from "framer-motion";
import Head from 'next/head'
import { CloudinaryContext } from 'cloudinary-react';

import "../styles/main.css";

function MyApp({ Component, pageProps, router }) {
  const headName = router.route.substring(1);
  const headTitle = headName.charAt(0).toUpperCase() + headName.slice(1);
  return (
    <ApolloProvider client={client}>
      <CloudinaryContext cloudName="refuway">
        <Head>
          <title>{headTitle === "" ? "Refuway" : `Refuway: ${headTitle}`}</title>
        </Head>
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
      </CloudinaryContext>
    </ApolloProvider>
  );
}

export default MyApp;