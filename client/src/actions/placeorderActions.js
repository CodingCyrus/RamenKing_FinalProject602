import axios from "axios";
export const placeOrder=(token, pricetotal)=> async (dispatch, getState)=>{

    dispatch({type:'PLACE_ORDER_REQUEST'})
    const currentUser= getState().loginUserReducer.currentUser
    const orderItems = getState().orderReducer.orderItems

    try {
        const response = await axios.post('/api/orders/placeorder', {token , pricetotal, currentUser, orderItems})
        dispatch({type:'PLACE_ORDER_SUCCESS'})
        console.log(response);
    } catch (error) {
        dispatch({type:'PLACE_ORDER_FAILED'})
        console.log(error);
    }
}

//Request for user orders data, if success get response else fail error message
export const getUserOrders = () => async (dispatch, getState) => {

    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: 'GET_USER_ORDERS_REQUEST'})

    try {
        const response = await axios.post("/api/orders/getuserorders" , {userid : currentUser._id})
        console.log(response);
        dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_USER_ORDERS_FAILED', payload: error })
    }
}

//Request for ALL USERS order data, if success get response else fail error message
export const getAllOrders = () => async (dispatch, getState) => {

    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: 'GET_ALLORDERS_REQUEST'})

    try {
        const response = await axios.get("/api/orders/getallorders" , {userid : currentUser._id})
        console.log(response);
        dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_ALLORDERS_FAILED', payload: error })
    }
}

//delete orders from menu list
export const deleteOrder=(orderid)=> async dispatch => {
    try {
        const response = await axios.post('/api/orders/deleteorder' , {orderid})
        alert('Order Deleted Successfully')
        console.log(response)
        window.location.reload()
    } catch(error) {
        alert("ERROR Order did not delete properly")
        console.log(error);
    }
}

//Update Order Delivery Status
export const deliverOrder=(orderid)=>async dispatch => {

    try {
        const response = await axios.post('/api/orders/deliverorder', {orderid})
        console.log(response);
        alert('ORDER DELIVERED')
        const orders = await axios.get('/api/orders/getallorders')
        dispatch({type:"GET_ALLORDERS_SUCCESS" , payload:orders.data})
    } catch (error) {
        console.log(error);
    }

}