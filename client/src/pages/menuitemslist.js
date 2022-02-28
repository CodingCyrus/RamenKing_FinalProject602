import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, getAllItems } from '../actions/menuitemsActions';
import { Link } from 'react-router-dom';

export default function Menuitemslist() {
        const dispatch = useDispatch();
        const itemsstate = useSelector(state => state.getAllItemsReducer);
        const { items, error, loading } = itemsstate;
        useEffect(() => {
            dispatch(getAllItems());
        }, [dispatch]);
    return <div>

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

                    <h2>Menu Items</h2>
                    <table className='table table-light table-bordered'>
                    <thead className='thead'>
                        <tr>
                            <th>Item</th>
                            <th>Prices</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                       {items && items.map(item=>{
                           return <tr>
                               <td>{item.item}</td>
                               <td>
                                   S: ${item.prices[0]['S']}<br/>
                                   M: ${item.prices[0]['M']}<br/>
                                   L: ${item.prices[0]['L']}
                               </td>
                               <td>{item.category}</td>
                               <td>
                                   <i className='fa fa-trash m-1' onClick={()=>{dispatch(deleteItem(item._id))}}></i>
                                   <Link to={`/admin/edititem/${item._id}`}><i className='fa fa-edit m-1'></i></Link>
                               </td>
                           </tr>
                       })}
                    </tbody>
                    </table>



                </div>

            </div>

        </div>;
}