import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQuery, useMutation, gql } from '@apollo/client';
import client from "../../../apollo-client";
import { useAuth } from "../../../context";
import Login from "../../../components/Login";

import Link from 'next/link';
import { Formik, useField, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';

import OrganisationList from '../../../components/OrganisationsList';


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


export default function Organisations({organisations}) {
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



  console.log(organisations)
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
    
    const ADD = gql`
    mutation addOrganisation( $text: String!, $title: String!,  $organisationLi: String!, $description: String!, $imgURL: String!, $longitude: String!, $latitude: String!, $category: Category) {
    addOrganisation(organisation:{text: $text, title: $title, imgURL: $imgURL , organisationLi: $organisationLi, description: $description, longitude: $longitude, latitude: $latitude, category: $category}){
     title 
    }}
    `;

    const [addItem, {error, loading, data}] = useMutation(ADD);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            if(data) {
                alert("New data has been added")
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
                category: "WORK",
                organisationLi:"",
                longitude:"",
                latitude:""
                
            }
        }
        validationSchema={Yup.object({
            text: Yup.string(),
            title: Yup.string(),
            description: Yup.string(),
            category: Yup.string(),
            organisationLi: Yup.string(),
            longitude: Yup.string(),
            latitude: Yup.string(),
            
        })}
        onSubmit={(values, { setSubmitting, resetForm }) =>{
            setTimeout(() => {
              addItem({ variables: {  title: values.title, description: values.description, text: values.text, 
                     organisationLi: values.organisationLi, imgURL: imgURL1, longitude: values.longitude, latitude: values.latitude, category: values.category
              } });

                resetForm();
                setSubmitting(false)
                window.location.reload();
            }, 3000)
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
              <div className="mx-auto my-10 w-fit text-center">
              <h1 className="text-2xl">All organisations</h1>
              <p>Choose an organisation to edit.</p>
              </div>
              <OrganisationList organisations={organisations} />
              <div className="mx-auto mt-10 w-fit text-center">
                  <p>Do you want to add an Organisation?</p>
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
                        <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Create an organisation</h1>
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
                    <CustomTextInput label="Longitude" name="longitude" placeholder="What is the longitude?" />
                    </div>
                    <div className="grid grid-cols-1">
                    <CustomTextInput label="Latitude" name="latitude" placeholder="What is the latitude?" />
                    </div>
                    </div> 
                    <div className="grid grid-cols-1 mt-5 mx-7">
                    <CustomTextInput label="Full text" name="text" placeholder="Data" />
                    </div>
                    <div className="grid grid-cols-1 mt-5 mx-7">
                    <CustomTextInput label="Organisation number" name="organisationLi" placeholder="data001" />
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

export const getStaticProps = async () => {
    const { data: organisations } = await client.query({
        query: gql`
          query organisations {
            organisations{
                  title
                  text
                  id
                  description
                  organisationLi
                  longitude
                  latitude
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
            organisations: organisations.organisations
        }
    }
}