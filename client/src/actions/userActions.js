import axios from "axios"

export const registerUser =(user)=>async dispatch=>{
    dispatch({type:'USER_REGISTER_REQUEST'})

    try{
        const response = await axios.post('/api/users/register', user)
        console.log(response);
        dispatch({type:'USER_REGISTER_SUCCESS'})
    } catch (error) {
        dispatch({type:'USER_REGISTER_FAILED', payload: error})
    }
}

export const loginUser =(user)=>async dispatch=>{
    dispatch({type:'USER_LOGIN_REQUEST'})

    try{
        const response = await axios.post('/api/users/login', user)
        console.log(response);
        dispatch({type:'USER_LOGIN_SUCCESS', payload: response.data})
        //store currentuser data in local storage
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        //navigate to homepage if login success
        window.location.href='/'
    } catch (error) {
        dispatch({type:'USER_LOGIN_FAILED', payload: error})
    }
}

//logout user from application by removing user login data from local storage
export const logoutUser =()=>dispatch=>{
    localStorage.removeItem('currentUser')
    window.location.href='/login'
}

//get all users data from menu list collection
export const getAllUsers = () => async dispatch => {

    dispatch({ type: 'GET_USERS_REQUEST'})

    try {
        const response = await axios.get("/api/users/getallusers")
        console.log(response);
        dispatch({ type: 'GET_USERS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_USERS_FAILED', payload: error })
    }
}

//delete users from database 
export const deleteUser=(userid)=> async dispatch => {
    try {
        await axios.post('/api/users/deleteuser', {userid})
        alert('User Account Deleted Successfully')
        window.location.reload()
    } catch (error) {
        alert('ERROR Something went wrong with deleting user')
        console.log(error);
    }
}