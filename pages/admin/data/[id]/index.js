import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQuery, useMutation, gql } from '@apollo/client';
import client from "../../../../apollo-client";
import { useAuth } from "../../../../context";
import Login from "../../../../components/Login";

import Link from 'next/link';
import { Formik, useField, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/router';


const CustomTextInput = ({ label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold" htmlFor={props.id || props.name}>{label}</label>
            <input className="py-2 px-3 rounded-lg border-2 border-green mt-1 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"  {...field} {...props} />
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ) : null}
        </>
    )
}

const CustomSelect = ({ label, ...props}) => {
  const [field, meta] = useField(props);

  return (
      <>
          <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold" htmlFor={props.id || props.name}>{label}</label>
          <select className="py-2 px-3 rounded-lg border-2 border-green mt-1 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" {...field} {...props} />
          {meta.touched && meta.error ? (
              <div>{meta.error}</div>
          ) : null}
      </>
  )
}


export default function Data2({}) {
    const [user, logout] = useAuth()

    useEffect(() => {
        if (window !== undefined && user !== undefined) {
          const token = localStorage.getItem('token'); 
          if ( typeof user === 'string'){
            console.log(user)
            if (user !== token){
            logout();
          }
          }
    
      }
      }, [user])

  
    const [ datId, setDatId ] = useState("")
    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const m = window.location.pathname
        setDatId(m.replace('/admin/data/',''))
        
      } else {
          null
      }
    }, [])


    
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const [ loading1, setLoading1 ] = useState("Upload");

    const uploadImage = () => {
    setLoading1("Loading...")
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
    setLoading1("Uploaded")
    })
    .catch(err => console.log("err"))
    }

    const [imgURL1, setImgURL] = useState('');

    const GET_DATABYID = gql`
    query dataById {
      dataById(id: ${JSON.stringify(datId)})
      {
        text
        title
        description
        imgURL
        category
        dataLi
        prevQuestionLi
      }
    }  
  `;
    const org = useQuery(GET_DATABYID);
    console.log(org)
    
    const UPDATE = gql`
    mutation updateData($id: ID!, $text: String!, $title: String!,  $dataLi: String!, $description: String!, $imgURL: String!, $prevQuestionLi: String!) {
    updateData(dataId: $id, data:{text: $text, title: $title, imgURL: $imgURL , dataLi: $dataLi, description: $description, prevQuestionLi: $prevQuestionLi}){
     title 
    }}
    `;



    const [updateItem, {error, loading, data}] = useMutation(UPDATE);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            if(data) {
                alert("Data has been edited")
              }
              } else {
                  console.log('Server');
              }
        
      }, [data]);

  return (
    <>
    {!user && <Login />}
    {user && <>
      <Formik
        initialValues={
            {
                text: "",
                title:"",
                description: "",
                category: "",
                dataLi:"",
                prevQuestionLi: ""
                
            }
        }
        validationSchema={Yup.object({
            text: Yup.string(),
            title: Yup.string(),
            description: Yup.string(),
            category: Yup.string(),
            dataLi: Yup.string(),
            prevQuestionLi: Yup.string()
            
        })}
        onSubmit={(values, { setSubmitting, resetForm }) =>{
            setTimeout(() => {
              updateItem({ variables: { id: datId, title: values.title, description: values.description, text: values.text, 
                     dataLi: values.dataLi, imgURL: imgURL1, prevQuestionLi: values.prevQuestionLi, category: values.category
              } });
              
                resetForm();
                setSubmitting(false)
                window.location.reload();
            }, 2000)
        }}
      >
          {props => (
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
              
              <div className="flex items-center justify-center  mt-2 mb-32"> 
              <Form>
              <div className="flex justify-center py-4">
                    <div className="flex bg-green rounded-full md:p-4 p-2 border-2 border-green">
                        <Image 
                            src="/icons/folders.svg"
                            alt="logo"
                            width={40}
                            height={40}
                        />
                    </div>
                    </div>

                    <div className="flex justify-center">
                    <div className="flex">
                        <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Edit data</h1>
                    </div>
                    </div>
                    <div className="grid grid-cols-1 mt-5 mx-7">
                    <CustomTextInput  label="Title" name="title" placeholder="What is the title?" />
                    </div>
                    <div className="grid grid-cols-1 mt-5 mx-7">
                    <CustomTextInput label="Description" name="description" placeholder="What is the description?" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                    <div className="grid grid-cols-1">
                    <CustomTextInput label="To which Question?" name="prevQuestionLi" placeholder="What is the longitude?" />
                    </div>
                    </div> 
                    <div className="grid grid-cols-1 mt-5 mx-7">
                    <CustomTextInput label="Full text" name="text" placeholder="Data" />
                    </div>
                    <div className="grid grid-cols-1 mt-5 mx-7">
                    <CustomTextInput label="Data number" name="dataLi" placeholder="data001" />
                    </div>
                    <div className="grid grid-cols-1 mt-5 mx-7">
                      <CustomSelect label="Category" name="category">
                        <option value="WORK">Work</option>
                        <option value="HOUSE">House</option>
                        <option value="LANGUAGE">Language</option>
                        <option value="CULTURE">Culture</option>
                      </CustomSelect>
                    </div>

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
                        <button type="button" onClick={uploadImage}>{loading1}</button>
                    </div>
                    <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
                        <button type="submit" className='w-auto bg-green hover:bg-blue duration-500 rounded-lg shadow-xl font-medium text-white px-4 py-2'>{props.isSubmitting ? 'Loading....' : 'Create'}</button>
                    </div>
              </Form>
              </div>
              </>
          )}
      </Formik>
      </>}
    </>
  );
}
