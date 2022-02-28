import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../actions/menuitemsActions'

export default function Additem() {

    const [item, setitem] = useState('')
    const [smallprice, setsmallprice] = useState('')
    const [mediumprice, setmediumprice] = useState('')
    const [largeprice, setlargeprice] = useState('')
    const [imageURL, setimage] = useState('')
    const [description, setdescription] = useState('')
    const [category, setcategory] = useState('')

    const dispatch = useDispatch()
    const additemstate = useSelector((state)=>state.addItemReducer)
    const {addeditem} = additemstate;

    function formHandler(e){
        e.preventDefault();
        const newitem ={
            item,
            imageURL,
            description,
            category,
            prices: {
                S : smallprice,
                M : mediumprice,
                L : largeprice,
            }
        }
        console.log(newitem);
        dispatch(addItem(newitem));
    }

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
                    <h2>Add Items</h2>
                    <form onSubmit={formHandler}>
                        <input className='form-control' type="text" placeholder="item name" value={item} onChange={(e) => { setitem(e.target.value) }} />
                        <input className='form-control' type="text" placeholder="S size price" value={smallprice} onChange={(e) => { setsmallprice(e.target.value) }} />
                        <input className='form-control' type="text" placeholder="M size price" value={mediumprice} onChange={(e) => { setmediumprice(e.target.value) }} />
                        <input className='form-control' type="text" placeholder="L size price" value={largeprice} onChange={(e) => { setlargeprice(e.target.value) }} />
                        <input className='form-control' type="text" placeholder="Item Category" value={category} onChange={(e) => { setcategory(e.target.value) }} />
                        <input className='form-control' type="text" placeholder="Item Description" value={description} onChange={(e) => { setdescription(e.target.value) }} />
                        <input className='form-control' type="text" placeholder="Image URL" value={imageURL} onChange={(e) => { setimage(e.target.value) }} />
                        <button className='btn mt-3' type='submit'>Add Menu Item</button>
                    </form>
                </div>

            </div>

        </div>
    )
}
