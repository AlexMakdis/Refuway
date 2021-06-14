import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "../../components/Login";
import { useAuth } from "../../context";


export default function Admin() {
  const [user, logout] = useAuth()
  
  useEffect(() => {
    if (window !== undefined && user !== undefined) {
      const token = localStorage.getItem('token'); 
      if ( typeof user === 'string'){
        if (user !== token){
        logout();
      }
      }

  }
  }, [user])

  return (
    <>
    {!user && <Login />}
    {user && <>
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
        <div className="mx-auto my-20 w-fit text-center">
          <h1 className="text-2xl">Welcome to the admin page.</h1>
          <p>On what are we working on today?</p>
        </div>
        <div className="container mx-auto rounded-xl w-4/5 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-20">
            <Link href='/admin/questions'>
            <div className="adminCard p-8 overflow-hidden text-center shadow-md rounded-xl font-bold hover:bg-green hover:text-white transition duration-500 ease-in-out cursor-pointer">
              <Image 
                src="/icons/wizardAdmin.svg"
                alt="logo"
                width={100}
                height={100}
                className="adminIcon"
              />
              <h3 className="my-4">Wizard</h3>
            </div>
            </Link>
            <Link href='/admin/data'>
            <div className="adminCard p-8 overflow-hidden text-center shadow-md rounded-xl font-bold hover:bg-green hover:text-white transition duration-500 ease-in-out cursor-pointer">
              <Image 
                  src="/icons/folders.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  className="adminIcon"
                />
              <h3 className="my-4">Data</h3>
            </div>
            </Link>
            <Link href='/admin/organisations'>
            <div className="adminCard p-8 overflow-hidden text-center shadow-md rounded-xl font-bold hover:bg-green hover:text-white transition duration-500 ease-in-out cursor-pointer">
              <Image 
                  src="/icons/team.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  className="adminIcon"
                />
              <h3 className="my-4">Organisations</h3>
            </div>
            </Link>
          </div>
        </div>
        <div className="w-fit mx-auto">
          <Link href='/'>
            <button className="bg-green hover:bg-blue duration-500 mt-6 px-4 py-2 rounded-full text-white flex font-semibold items-center focus:outline-none text-sm animate__animated animate__fadeIn">
              <Image 
                src="/icons/left-arrow.svg"
                alt="logo"
                width={15}
                height={15}
                className="rounded"
              />
              <p className="ml-2">Go back to the site</p>
            </button>
          </Link>
        </div>
    </>}
    </>
  );
}
