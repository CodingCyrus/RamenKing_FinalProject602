import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteOrder, deliverOrder, getAllOrders } from '../actions/placeorderActions';

export default function Orderslist() {
    const dispatch = useDispatch()
    const getorderstate = useSelector(state=>state.getAllOrdersReducer)
    const { orders} = getorderstate
    useEffect(() => {
        dispatch(getAllOrders())
    }, [])
  return (
    <div>

    <div className='row justify-content-center'>
        <div className='col-md-10'>
            <h3>Admin Interface</h3>

            <ul className='adminfunction'>
                <li>
                    <a href='/admin/userslist'>Users List</a>
                </li>
                <li>
                    <a href='/admin/menuitemslist'>Menu Items</a>
                </li>
                <li>
                    <a href='/admin/additem'>Add New Item</a>
                </li>
                <li>
                    <a href='/admin/orderslist'>Orders List</a>
                </li>
            </ul>
            <h2>Orders List</h2>
            <table className = 'table table-light table-bordered'>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Email</th>
                        <th>User Id</th>
                        <th>Total Price</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {orders && orders.map(order=>{
                        return <tr>
                            <td>{order._id}</td>
                            <td>{order.email}</td>
                            <td>{order.userid}</td>
                            <td>{order.orderAmount}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>
                                {order.isDelivered ? (<p>Delivered</p>) : (<button className='btn' onClick={()=>{dispatch(deliverOrder(order._id))}}>Deliver</button>)}
                            </td>
                            <td>
                                <i className='fa fa-trash m-1' onClick={()=>{dispatch(deleteOrder(order._id))}}></i>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

    </div>

</div>
  )
}
