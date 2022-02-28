import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../actions/userActions'

export default function RegisterPage() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const registerstate = useSelector(state=>state.registerUserReducer)
    const {error, loading, success} = registerstate
    const dispatch = useDispatch()

    //Register function if password do not match alert, else create user object with details for backend
    function register() {
        if(password!=cpassword){
            alert("Password do not match!")
        } else {
            const user={
                name,
                email,
                password
            }
            console.log(user)
            dispatch(registerUser(user))
        }
    }


    return (
        <div>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>


                    <div>
                        <h1>User Registration</h1>
                        <input required type="text" placeholder="name" className="form-control" value={name} onChange={(e) => {setname(e.target.value)}}/>
                        <input required type="text" placeholder="email" className="form-control" value={email} onChange={(e) => {setemail(e.target.value)}}/>
                        <input required type="text" placeholder="password" className="form-control" value={password} onChange={(e) => {setpassword(e.target.value)}}/>
                        <input required type="text" placeholder="confirm password" className="form-control" value={cpassword} onChange={(e) => {setcpassword(e.target.value)}}/>
                        <button onClick={register} className='btn mt-2 mb-2'>REGISTER</button>
                        <br/>
                        <a href="/login">Already registered? Click here to login</a>
                    </div>

                </div>
            </div>
        </div>
    )
}
