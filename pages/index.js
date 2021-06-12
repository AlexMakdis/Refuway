import { gql } from "@apollo/client";
import client from "../apollo-client";
import Wizard from "../components/Wizard"
import { useState } from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useRouter } from 'next/router';


export default function Home({ questions, info }) {
  const [dataId, setDataId] = useState('');
  const [questionWizard, setQuestionWizard] = useState('question001')
  const data = info.filter(inf => inf.dataLi === dataId)[0];
  const router = useRouter();
  
  function createMarkup(data) {
    if (data !== undefined) {
    return {__html: data}
    } else {
      return {__html: "No Data found"}
    }
  }
  return (
    <>
    <div className="h-full min-h-screen pb-8 bg-home bg-fixed bg-no-repeat bg-center bg-cover ">
      <Header/>
      <div className="mx-auto my-10 bg-white rounded-xl shadow-md w-4/5 p-8 relative overflow-hidden">
      { data === undefined ? 
            <Wizard questions={questions} changeData={dataId => setDataId(dataId)} questionLi={questionWizard}/>
            :
            <div className="animate__animated animate__fadeInLeft">
            <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
               
            { data.title !== undefined ? <h2 className="text-2xl font-bold mt-8" dangerouslySetInnerHTML={createMarkup(data.title)}></h2> : console.log('No Title')}
            { data.description !== undefined ? <p className="text-xs italic mt-2 mx-2 mb-8 font-thin" dangerouslySetInnerHTML={createMarkup(data.description)}></p> : console.log('No Description')}
            </div>
            { data.imgURL !== undefined ? 
              <div className="dataWizardImage">
                {/* <Image 
                  src={data.imgURL}
                  alt="logo"
                  width={300}
                  height={200}
                  className="rounded"
                /> */}
              </div> : console.log('No Image')}
            </div>
            { data.text !== undefined ? 
              <div className="my-8 dataWizardText" dangerouslySetInnerHTML={createMarkup(data.text)}>
                
              </div>
              : console.log('No Text')}
            </div>
        }
        { dataId !== "" ?
        <button onClick={() => {setDataId(''); setQuestionWizard(data.prevQuestionLi);}} className="bg-green hover:bg-blue duration-500 mt-6 px-4 py-2 rounded-full text-white flex font-semibold items-center focus:outline-none text-sm animate__animated animate__fadeInUp">
        <Image 
          src="/icons/left-arrow.svg"
          alt="logo"
          width={15}
          height={15}
          className="rounded"
        />
        <p className="ml-2">Previous</p>
        </button>
        : 
        <></>
      }
      <img onClick={() => router.reload(window.location.pathname)} className="w-6 absolute top-2 right-5 cursor-pointer" src="./icons/wizard.svg" />
    </div>
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
              prevQuestionLi
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
          prevQuestionLi
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