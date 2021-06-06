import Head from "next/head";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Header from "../components/Header";

export default function Work() {
  return (
    <>
    <div className="h-screen bg-work bg-no-repeat bg-center bg-cover ">
      <Header/>
      <h1 className="mx-auto my-32 rounded-xl shadow-md md:max-w-2xl p-8 relative">Work</h1>
    </div>
    
    </>
  );
}

// export async function getStaticProps() {
//   const { data } = await client.query({
//     query: gql`
//       query Countries {
//         countries {
//           code
//           name
//           emoji
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       countries: data.countries.slice(0, 4),
//     },
//   };
// }