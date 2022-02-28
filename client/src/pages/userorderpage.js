import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/placeorderActions'

export default function UserOrdersPage() {

    const dispatch = useDispatch()
    const orderstate = useSelector(state => state.getUserOrdersReducer)
    const { orders, error, loading } = orderstate

    useEffect(() => {
        dispatch(getUserOrders())

    }, [])

    return (
        <div>
            <h3>My Account Orders</h3>
            <hr/>
            <div className='row justify-content-center'>
                {orders && orders.map(order => {
                    return <div className='col-md-8 m-3' style={{backgroundColor: 'white'}}>
                        <div className='flex-container'>
                            <div className='text-start w-100 m-1'>
                                <h2 style={{ fontSize: '25px' }}>ITEMS ORDERED</h2>
                                <hr/>
                                {order.orderItems.map(item => {
                                    return <div>
                                        <p>{item.item} [{item.sizes}] x {item.quantity} = ${item.price}</p>
                                    </div>
                                })}
                            </div>
                            <div className='text-start w-100 m-1'>
                                <h2 style={{ fontSize: '25px' }}>SHIPPING ADDRESS</h2>
                                <hr/>
                                <p>Street: {order.shippingAddress.street}</p>
                                <p>City: {order.shippingAddress.city}</p>
                                <p>Country: {order.shippingAddress.country}</p>
                                <p>ZipCode: {order.shippingAddress.zipcode}</p>
                            </div>
                            <div className='text-start w-100 m-1'>
                                <h2 style={{ fontSize: '25px' }}>ORDER INFORMATION</h2>
                                <hr/>
                                <p>Total Price: ${order.orderAmount}</p>
                                <p>Date Ordered: {order.createdAt.substring(0,10)}</p>
                                <p>Transaction ID: {order.transactionId}</p>
                                <p>Order ID: {order._id}</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
