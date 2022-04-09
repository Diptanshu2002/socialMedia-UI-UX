import { useState } from "react";
import { useRef } from "react";
import {useHistory, Redirect, Link} from 'react-router-dom'
import axios from '../../hooks/axios'
import "./register.css";

export default function Register() {
  const history = useHistory()
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [reload, setReload] = useState(null)
  const [reloadClass, setReloadClass] = useState(null)


  //reloading page to login page
  function reloading(){
    setTimeout(() => {
      history.push('/login');
    },2000);
  }

  //handleSubmit function
   async function handleSubmit(e){
    e.preventDefault();

    if(password.current.value !== passwordAgain.current.value){
      password.current.setCustomValidity("password dont match");
    }else{
      const user = {
        username : username.current.value,
        email : email.current.value,
        password : password.current.value
      }
      try {
        await axios.post('/auth/register', user)
        setReloadClass('reloading')
        setReload("RELOADING TO THE LOGIN PAGE...")
        reloading();

      } catch (error) {
        console.log(error)
      }
    }

  }


  return (
    <div className="register">
      <video
        className="registerVideo"
        autoPlay
        loop
        muted
        poster="./assets/videoPoster.png"
      >
        <source src="./assets/video1.mp4" type="video/mp4" />
      </video>
      <div className={`${reloadClass}`}> {reload} </div>
      <div className={`registerWrapper`}>
        <div className="registerLeft"></div>
        <div className="registerRight">
          <h3 className="registerRightCompanyName">Social Media</h3>
          <form className="registerBox" onSubmit={handleSubmit}>
            <input placeholder="Username" type='text' className="registerInput" ref={username} />
            <input placeholder="Email" type='email' className="registerInput" ref={email} />
            <input placeholder="Password" type='password'  className="registerInput" ref={password}/>
            <input placeholder="Password Again" type='password' className="registerInput" ref={passwordAgain} />
            <button className="registerButton" type="submit" >Sign Up</button>
            <div className="registerExtraButton">
              <Link to='/login' style={{ textDecoration : "none" }} >
                <span className="registerRegister" type="button">
                  Already Registered ? Login Here..
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
