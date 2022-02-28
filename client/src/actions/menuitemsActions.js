import axios from "axios";

//get all item from menu list collection
export const getAllItems = () => async dispatch => {

    dispatch({ type: 'GET_ITEMS_REQUEST'})

    try {
        const response = await axios.get("/api/items/getallitems")
        console.log(response);
        dispatch({ type: 'GET_ITEMS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_ITEMS_FAILED', payload: error })
    }
}

//get item from menu list by object id
export const getItemById = (itemid) => async dispatch => {

    dispatch({ type: 'GET_ITEMBYID_REQUEST'})

    try {
        const response = await axios.post("/api/items/getitembyid", {itemid})
        console.log(response);
        dispatch({ type: 'GET_ITEMBYID_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_ITEMBYID_FAILED', payload: error })
    }
}

//filter item from menu list
export const filterItems = (searchkey , category)=> async dispatch=> {

    let filteredItems ;
    dispatch({ type: 'GET_ITEMS_REQUEST'})

    try {
        const response = await axios.get("/api/items/getallitems")
        filteredItems = response.data.filter(item => item.item.toLowerCase().includes(searchkey))
        
        if(category != 'all') {
            filteredItems = response.data.filter(item => item.category.toLowerCase()==category)
        }
        
        dispatch({ type: 'GET_ITEMS_SUCCESS', payload: filteredItems})

    } catch (error) {
        dispatch({ type: 'GET_ITEMS_FAILED', payload: error })
    }
}

//add item from menu list
export const addItem=(item)=> async dispatch=>{
    dispatch({type:'ADD_ITEM_REQUEST'})
    try {
        const response = await axios.post("/api/items/additem", {item})
        alert('Item Added Successfully')
        console.log(response)
        dispatch({type:'ADD_ITEM_SUCCESS'})
    } catch (error) {
        dispatch({type:'ADD_ITEM_FAILED', payload : error})
    }
}

//edit item from menu list
export const editItem=(editeditem)=> async dispatch=>{
    dispatch({type:'EDIT_ITEM_REQUEST'})
    try {
        const response = await axios.post("/api/items/edititem", {editeditem})
        alert('Item Edited Successfully')
        console.log(response);
        dispatch({type:'EDIT_ITEM_SUCCESS'})
        window.location.href='/admin/menuitemslist'
    } catch (error) {
        dispatch({type:'EDIT_ITEM_FAILED', payload : error})
    }
}

//delete item from menu list
export const deleteItem=(itemid)=> async dispatch => {
    try {
        const response = await axios.post('/api/items/deleteitem' , {itemid})
        alert('Item Deleted Successfully')
        console.log(response)
        window.location.reload()
    } catch(error) {
        alert("ERROR Item did not delete properly")
        console.log(error);
    }
}