export const orderReducer=(state={orderItems : []}, action) => {

    switch (action.type){
        case 'ADD_TO_ORDER' : 
        
        //check if item is already present in the order or not 
        const orderExists = state.orderItems.find(item=> item._id===action.payload._id)
        if(orderExists) {
            return {
                ...state ,
                orderItems : state.orderItems.map(item=> item._id ===action.payload._id ? action.payload : item)
            }
        } else {
        return{
            ...state,
            orderItems:[...state.orderItems , action.payload]
            
        }

    }
        case 'DELETE_FROM_ORDER' : return{    
            ...state ,
            orderItems : state.orderItems.filter(item => item._id !== action.payload._id)
    }
        default : return state
    }
}