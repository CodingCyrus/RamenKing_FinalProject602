import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../actions/userActions'

export default function LoginPage() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()

  //if user present do not show login page instead show homepage
  useEffect(() => {
    if(localStorage.getItem('currentUser')){
      window.location.href='/'
    }
  }, [])


  function login(){
    const user={email, password}
    dispatch(loginUser(user))
  }


  return (
    <div>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>

                    <div>
                        <h1>User Login</h1>
                        <input required type="text" placeholder="email" className="form-control" value={email} onChange={(e) => {setemail(e.target.value)}}/>
                        <input required type="text" placeholder="password" className="form-control" value={password} onChange={(e) => {setpassword(e.target.value)}}/>
                        <button onClick={login} className='btn mt-2 mb-2'>LOGIN</button>
                        <br/>
                        <a href="/register">Not registered yet?</a>
                    </div>

                </div>
            </div>
    </div>
  )
}
