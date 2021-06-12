import { useState } from 'react';
import Image from 'next/image';
import { useQuery, useMutation, gql } from '@apollo/client';
import client from "../../../apollo-client";


import QuestionsList from '../../../components/QuestionsList';
import Link from 'next/link';

export default function Questions({questions}) {
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const uploadImage = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "refuway")
    data.append("cloud_name","refuway")
    fetch(" https://api.cloudinary.com/v1_1/refuway/image/upload",{
    method:"post",
    body: data
    })
    .then(resp => resp.json())
    .then(data => {
    setImgURL(data.public_id)
    })
    .catch(err => console.log("err"))
    }



    const [text1, setText] = useState('');
    const [questionLi1, setQuestionLi] = useState('');
    const [imgURL1, setImgURL] = useState('');
    const [category1, setCategory] = useState('');
    const [prevQuestionLi1, setPrevQuestionLi] = useState('');
    const [answers1, setAnswers1] = useState('');


    const ADD = gql`
    mutation addQuestion($text: String!, $questionLi: String!, $imgURL: String!, $prevQuestionLi: String!) {
    addQuestion(question:{text: $text, questionLi: $questionLi, imgURL: $imgURL, prevQuestionLi: $prevQuestionLi}){
    id text questionLi imgURL prevQuestionLi addedOn editedOn 
    }}
    `;

    const [addItem] = useMutation(ADD);

  return (
    <>
        <div className="w-fit mx-auto">
            <Link href='/' passHref>
                <a>
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={400}
                    height={150}
                />
                </a>
            </Link>
            </div>
            <div className="mx-auto my-10 w-fit text-center">
            <h1 className="text-2xl">All questions of the wizard</h1>
            <p>Choose a question to edit.</p>
            </div>
            <QuestionsList questions={questions} />
            <div className="mx-auto mt-10 w-fit text-center">
                <p>Do you want to add a question?</p>
            </div>
            <div className="flex items-center justify-center  mt-2 mb-32">
                <form className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2" onSubmit={e=> {
                            e.preventDefault();
                            addItem({ variables: { text: text1, questionLi: questionLi1, imgURL: imgURL1,
                                prevQuestionLi: prevQuestionLi1
                            } });
                            }}>
                    <div className="flex justify-center py-4">
                    <div className="flex bg-green rounded-full md:p-4 p-2 border-2 border-green">
                        <Image 
                            src="/icons/wizardAdmin1.svg"
                            alt="logo"
                            width={40}
                            height={40}
                        />
                    </div>
                    </div>

                    <div className="flex justify-center">
                    <div className="flex">
                        <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Create a Question</h1>
                    </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Question</label>
                    <input onChange={e=> setText(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-green mt-1 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" type="text" placeholder="Input 1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                    <div className="grid grid-cols-1">
                        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Question Number</label>
                        <input onChange={e=> setQuestionLi(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-green mt-1 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" type="text" placeholder="Input 2" />
                    </div>
                    <div className="grid grid-cols-1">
                        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Previous Question Number</label>
                        <input onChange={e=> setPrevQuestionLi(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-green mt-1 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" type="text" placeholder="Input 3" />
                    </div>
                    </div>

                    {/* <div className="grid grid-cols-1 mt-5 mx-7">
                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Category</label>
                    <select className="py-2 px-3 rounded-lg border-2 border-green mt-1 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent">
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                    </div> */}
{/* 
                    <div className="grid grid-cols-1 mt-5 mx-7">
                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Answers</label>
                    <input className="py-2 px-3 rounded-lg border-2 border-green mt-1 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" type="text" placeholder="Another Input" />
                    </div> */}

                    <div className="grid grid-cols-1 mt-5 mx-7">
                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Upload Photo</label>
                        <div className='flex items-center justify-center w-full'>
                            <label className='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-green group'>
                                <div className='flex flex-col items-center justify-center pt-7'>
                                    { image === "" ? <>
                                <svg className="w-10 h-10 text-green-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <p className='lowercase text-sm text-gray-400 group-hover:text-green-600 pt-1 tracking-wider'>Select a photo</p>
                                </>
                                : <p>{image.name}</p>   }
                                </div>
                            <input onChange= {(e)=> {setImage(e.target.files[0]); }} type='file' className="hidden" />
                            </label>
                            
                        </div>
                        <button type="button" onClick={uploadImage}>Upload</button>
                    </div>

                    <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
                    <button className='w-auto bg-green hover:bg-green rounded-lg shadow-xl font-medium text-white px-4 py-2'>Create</button>
                    </div>

                </form>
            </div>
    </>
  );
}

export const getStaticProps = async () => {
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
    

    return {
        props: {
            questions: questions.questions
        }
    }
}