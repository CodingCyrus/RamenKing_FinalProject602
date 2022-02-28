import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers } from '../actions/userActions'

export default function Userslist() {
    const dispatch = useDispatch()
    const usersstate = useSelector(state=>state.getAllUsersReducer)
    const {items} = usersstate

    useEffect (() => {

        dispatch(getAllUsers())

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

                    <h2>Users List</h2>
                    <table className='table table-light table-bordered'>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items && items.map(user=>{
                                return <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><i className='fa fa-trash' onClick={()=>{dispatch(deleteUser(user._id))}}></i></td>
                                </tr>
                            })}
                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}
