import Image from 'next/image';
import React, {useState} from 'react';



export default function Wizard({ questions, changeData, questionLi }) {
  const [questionNumber, setQuestionNumber] = useState(questionLi);
  const [previousQuestionNumber, setPreviousQuestionNumber] = useState("");

  const question = questions.filter(question => question.questionLi === questionNumber)[0]

  const animateClass = () => {
    if (document.getElementById("answers") !== null){
      document.getElementById("answers").classList.remove("animate__fadeOutRight")
      void document.getElementById("answers").offsetWidth;
      document.getElementById("answers").classList.add("animate__fadeInLeft")
      }
    if (document.getElementById("questions") !== null){
          document.getElementById("questions").classList.remove("animate__fadeOutUp")
          void document.getElementById("questions").offsetWidth;
          document.getElementById("questions").classList.add("animate__fadeInDown")
        }
  }

  const test = () => {
    if (document.getElementById("answers").classList !== null)  {
      document.getElementById("answers").classList.remove("animate__fadeInLeft")
      document.getElementById("answers").classList.add("animate__fadeOutRight")
      }
    if (document.getElementById("questions").classList !== null)  {
      document.getElementById("questions").classList.remove("animate__fadeInDown")
      document.getElementById("questions").classList.add("animate__fadeOutUp")
      }
  }

  const answerButton = (data, question) => { 
    if (data.nextQuestionId !== null) {
      setQuestionNumber(data.nextQuestionId);
      setPreviousQuestionNumber(question.questionLi)
    } else if (data.conclusionId !== null){
      changeData(data.conclusionId)
    }
  }
  const previousButton = (prevQuestionLi) => {
    setQuestionNumber(prevQuestionLi)
  }
  return (
    <>
      <h1 id="questions" className="text-2xl font-bold text-blue animate__animated animate__fadeInDown">{question.text}</h1>
      <hr />
      <div id="answers" className="flex flex-col mt-6 animate__animated animate__fadeInLeft">
      {question.answers.map((answer) => (
            <button className="answerButton m-2 flex flex-row items-center rounded-xl border-2 border-blue focus:outline-none hover:bg-green duration-500 hover:text-white" key={answer.id} onClick={() => { test(); setTimeout(function () {answerButton(answer, question)}, 500);  setTimeout(animateClass, 500);}}>
              <p className="italic mx-4 my-2 p-2">{answer.text}</p>
            </button>
          ))}
      </div>
      { question.questionLi !== "question001" ?
        <button onClick={() => previousButton(question.prevQuestionLi)} className="bg-green hover:bg-blue duration-500 mt-6 px-4 py-2 rounded-full text-white flex font-semibold items-center focus:outline-none text-sm animate__animated animate__fadeInUp">
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
      <img className="w-6 absolute top-2 right-5" src="./icons/wizard.svg" />
    </>
  );
}
