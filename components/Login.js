import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {  gql, useLazyQuery } from '@apollo/client';
import { useAuth } from '../context';





function Login() {
  const [user, setUser] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailString= JSON.stringify(email);
  const passwordString= JSON.stringify(password);

  const LOGIN = gql`
    query login {
        login(user:{email: ${emailString}, password: ${passwordString} }){userId token}
        }
         `;



  const [login, { loading, error, data }] = useLazyQuery(LOGIN);
  

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
        if(data) { localStorage.setItem('token', data.login.token) 
    }
    if(data) { 
      setUser(data.login);
      localStorage.setItem('userId', data.login.userId) 
    }
    } else {
        console.log('we are running on the server');
    }
    
  }, [data]);

  if(loading) return (
    <div>
        <h1>Loading...</h1>

    </div>
  );
  if(error) {return (
    <div className="container">
        <div className="row">
            <h3 className="col-12 text-align-center">Warning: Case sensitive</h3>
            <p className="col-12 text-align-center">Wrong username or wrong password..</p>
            <div className="col-12 text-align-center">
                <button onClick={()=> window.location.reload(false)} className="refresh_button">Try again</button>
            </div>
        </div>
    </div>
  )};
  

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
              <h1 className="text-2xl">To acces the admin:</h1>
              <p>You need to be logged in.</p>
              </div>
            <div className="flex items-center justify-center  mt-2 mb-32">
                    <form  onSubmit={e=> {
                        e.preventDefault();
                        login();
                        }}
                        >
                    <div className="flex justify-center py-4">
                        <div className="flex bg-green rounded-full md:p-4 p-2 border-2 border-green">
                            <Image 
                                src="/icons/user.svg"
                                alt="logo"
                                width={40}
                                height={40}
                            />
                        </div>
                    </div>
                   
                        <div className="grid grid-cols-1 mt-5 mx-7">
                            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold" htmlFor="email">E-mail</label>
                            <input className="py-2 px-3 rounded-lg border-2 border-green mt-1 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" onChange={e=> setEmail(e.target.value)} type="text" id="email"></input>
                        </div>
                        <div className="grid grid-cols-1 mt-5 mx-7">
                            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold" htmlFor="password">Password</label>
                            <input className="py-2 px-3 rounded-lg border-2 border-green mt-1 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent" onChange={e=> setPassword(e.target.value)} type="text" id="password"></input>
                        </div>
                        <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
                        <button type="submit" className='w-auto bg-green hover:bg-blue duration-500 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Login</button>
                        </div>
                    </form>
            </div>
    </>
  )
}

export default Login;
