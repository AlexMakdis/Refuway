import Head from "next/head";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Wizard from "../components/Wizard"
import { useState } from "react";
import Header from "../components/Header";

export default function Home({ questions, info }) {
  const [dataId, setDataId] = useState('');
  const data = info.filter(inf => inf.dataLi === dataId)[0];
  
  function createMarkup(data) {
    if (data !== undefined) {
    return {__html: data.text}
    } else {
      return {__html: "hey"}
    }
  }
  return (
    <>
    <div className="h-screen bg-home bg-no-repeat bg-center bg-cover ">
      <Header/>
        <Wizard questions={questions} changeData={dataId => setDataId(dataId)}/>
    </div>
    <div dangerouslySetInnerHTML={createMarkup(data)}>
         
         </div>
 
    </>
  );
}

export async function getStaticProps() {
  const { data: questions } = await client.query({
    query: gql`
      query Questions {
        questions{
              text
              id
              questionLi
              answers{
                text
                id
                editedOn
                addedOn
                nextQuestionId
                conclusionId
                answerLi
                imgURL
              }
              imgURL
              editedOn
              addedOn
              category
            }
                  }
    `,
  });

  const { data: data } = await client.query({
    query: gql`
      query Data {
        data{
          id
          text
          title
          description
          imgURL
          category
          dataLi
          addedOn
          editedOn
        }
                  }
    `,
  });

  return {
    props: {
      questions: questions.questions,
      info: data.data
    },
  };
}