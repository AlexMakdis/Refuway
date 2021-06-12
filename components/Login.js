import React, {useState, useEffect} from 'react';

import {  gql, useLazyQuery } from '@apollo/client';





function Login() {

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
    if(data) { localStorage.setItem('userId', data.login.userId) 
    }
    if(data) { window.location.reload() 
    }
    } else {
        console.log('we are running on the server');
    }
    
  }, [data]);
  
  if (typeof window !== 'undefined') {
    if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== "" && localStorage.getItem('token') !== undefined) return( 
        <div className="container">
          <div className="row">
            <div className="col-12 loggedIn">
              <h1>You are logged in</h1>
            </div>
          </div>
        </div>
      );
      
  }
  

  if(loading) return (
    <div>
        <h1>Loading...</h1>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="socks"
            className="svg-inline--fa fa-socks fa-w-16 App-logo" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path fill="currentColor"
                d="M214.66 311.01L288 256V96H128v176l-86.65 64.61c-39.4 29.56-53.86 84.42-29.21 127.06C30.39 495.25 63.27 512 96.08 512c20.03 0 40.25-6.25 57.52-19.2l21.86-16.39c-29.85-55.38-13.54-125.84 39.2-165.4zM288 32c0-11.05 3.07-21.3 8.02-30.38C293.4.92 290.85 0 288 0H160c-17.67 0-32 14.33-32 32v32h160V32zM480 0H352c-17.67 0-32 14.33-32 32v32h192V32c0-17.67-14.33-32-32-32zM320 272l-86.13 64.61c-39.4 29.56-53.86 84.42-29.21 127.06 18.25 31.58 50.61 48.33 83.42 48.33 20.03 0 40.25-6.25 57.52-19.2l115.2-86.4A127.997 127.997 0 0 0 512 304V96H320v176z">
            </path>
        </svg>
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
    <div className="container">
        <div className="row home_sock home_sock_profile animate__animated animate__fadeInUp">
            <div className="col-12 loginPage">
                <h1>Login</h1>
                <p>Hier kan je inloggen</p>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-6 container_add_sock">
                <form className="edit_sock add_sock login" onSubmit={e=> {
                    login();
                    }}
                    >
                    <div className="form_login">
                        <label htmlFor="email">E-mail</label>
                        <input onChange={e=> setEmail(e.target.value)} type="text" id="email"></input>
                    </div>
                    <div className="form_login">
                        <label htmlFor="password">Password</label>
                        <input onChange={e=> setPassword(e.target.value)} type="text" id="password"></input>
                    </div>
                    <div className="form_switch">
                        <button type="submit">Login</button><br></br>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login;
