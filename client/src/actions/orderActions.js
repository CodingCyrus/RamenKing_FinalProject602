export const addToOrder=(foodItem , quantity, sizes)=>(dispatch , getState)=>{

    let orderItem = {
        item : foodItem.item,
        _id : foodItem._id,
        image : foodItem.imageURL,
        sizes : sizes,
        quantity : Number(quantity), 
        prices : foodItem.prices,
        price : foodItem.prices[0][sizes]*quantity

    }

    //if order quantity is greater than 12 show alert message and dont allow customer to add more
    if (orderItem.quantity >12) {
        alert('MAX PER ITEM ORDER AMOUNT IS 12 PER CUSTOMER!')
    } else {
        //if customer order number for item is 0 or less item will be deleted from order
        if(orderItem.quantity < 1) {
            dispatch({type:'DELETE_FROM_ORDER' , payload: orderItem})
        } else {
            dispatch({type: 'ADD_TO_ORDER', payload : orderItem})
        }
    }

    const orderItems = getState().orderReducer.orderItems
    localStorage.setItem('orderItems', JSON.stringify(orderItems))
}

export const deleteFromOrder=(item)=>(dispatch , getState)=>{

    dispatch({type:'DELETE_FROM_ORDER' , payload: item})
    const orderItems = getState().orderReducer.orderItems
    localStorage.setItem('orderItems', JSON.stringify(orderItems))
}