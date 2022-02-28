import {combineReducers} from 'redux'

import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'
import { getAllItemsReducer, addItemReducer, getItemByIdReducer, editItemsReducer } from './reducers/menuitemsReducers'
import {orderReducer} from './reducers/orderReducer'
import { loginUserReducer, registerUserReducer, getAllUsersReducer } from './reducers/userReducer'
import {placeOrderReducer, getUserOrdersReducer, getAllOrdersReducer} from './reducers/placeorderReducer'

const finalReducer = combineReducers({
    getAllItemsReducer : getAllItemsReducer,
    orderReducer : orderReducer,
    registerUserReducer : registerUserReducer,
    loginUserReducer : loginUserReducer,
    placeOrderReducer : placeOrderReducer,
    getUserOrdersReducer : getUserOrdersReducer,
    addItemReducer : addItemReducer,
    getItemByIdReducer : getItemByIdReducer,
    editItemsReducer : editItemsReducer,
    getAllOrdersReducer : getAllOrdersReducer,
    getAllUsersReducer : getAllUsersReducer
})

//if there are any variables orderitems or currentUser store the data in the localstorage for user
//if variable non-existent store as empty array for orderitems or null for currentUser
const orderItems = localStorage.getItem('orderItems') ? JSON.parse(localStorage.getItem('orderItems')) : []

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

const initialState = {
    orderReducer : {
        orderItems : orderItems
    },
    loginUserReducer : {
        currentUser : currentUser
    }
}

const composeEnhancers = composeWithDevTools({})

const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default store