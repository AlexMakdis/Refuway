import Image from 'next/image';
import React, {useState} from 'react';



export default function Wizard({ questions, changeData }) {
  const [questionNumber, setQuestionNumber] = useState("question001");
  const question = questions.filter(question => question.questionLi === questionNumber)[0]
  const answerButton = (data) => {
    if (data.nextQuestionId !== null) {
      setQuestionNumber(data.nextQuestionId);
    } else if (data.conclusionId !== null){
      changeData(data.conclusionId)
    }
  }
  return (
    <>
    <div className="mx-auto my-32 bg-white rounded-xl shadow-md md:max-w-2xl p-8 relative">
      <h1 className="">{question.text}</h1>
      <hr />
      <div className="flex flex-col my-6">
      {question.answers.map((answer) => (
            <button className="answerButton m-2 flex flex-row items-center" key={answer.id} onClick={() => answerButton(answer)}>
              { answer.conclusionId === null ? 
                <Image 
                src="/icons/right.svg"
                alt="logo"
                width={20}
                height={20}
               /> : 
               <Image
                src="/icons/right-arrow.svg"
                alt="logo"
                width={20}
                height={20}
               />
              }
              {/*  */}
              <p className="italic ml-4">{answer.text}</p>
            </button>
          ))}
      </div>
      <img className="w-6 absolute top-2 right-5" src="./icons/wizard.svg" />
    </div>
    </>
  );
}
