import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {addToOrder} from '../actions/orderActions'
import {deleteFromOrder} from '../actions/orderActions'
import Checkout from '../components/Checkout'

export default function OrderPage() {

    const orderstate = useSelector(state=>state.orderReducer)
    const orderItems = orderstate.orderItems
    let pricetotal = orderItems.reduce((x , item) => x+item.price, 0)
    const dispatch = useDispatch()

  return (
    <div>
        
        <div className='row justify-content-center'>

            <div className='col-md-6'>
                <h3>CUSTOMER ORDER</h3>

                {orderItems.map(item=>{
                    return <div className='flex-container'>

                    <div className='text-left m-1 w-100'>
                        <h2>{item.item} ({item.sizes} size)</h2>
                        <h1>Price: {item.quantity} x ${item.prices[0][item.sizes]} = ${item.price}</h1>
                        <h1>Qty: 
                        <i className="fa fa-plus" aria-hidden="true" onClick={()=>{dispatch(addToOrder(item , item.quantity+1, item.sizes))}}></i>
                        <b>{item.quantity}</b>
                        <i className="fa fa-minus" aria-hidden="true" onClick={()=>{dispatch(addToOrder(item , item.quantity-1, item.sizes))}}></i>
                        </h1>
                        <hr/>
                    </div>

                    <div className='m-1 w-100'>
                        <i className="fa fa-trash mt-5" aria-hidden="true" onClick={()=>{dispatch(deleteFromOrder(item))}}></i>
                    </div>

                </div>
                })}
            </div>


            <div className='col-md-4 text-right'>
                <h3>TOTAL PRICE:</h3> 
                <h3>${pricetotal}</h3>
                <Checkout pricetotal={pricetotal}/>
            </div>
        </div>
    </div>
  )
}
