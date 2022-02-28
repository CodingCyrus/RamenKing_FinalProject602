import React, { useEffect, useState } from 'react'
import { matchPath, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editItem, getItemById } from '../actions/menuitemsActions'

export default function Edititem(match) {
    //retrive unique item id from menu item list to edit the specific item details
    const { itemid } = useParams()

    const dispatch = useDispatch()
    const [item, setitem] = useState('')
    const [smallprice, setsmallprice] = useState('')
    const [mediumprice, setmediumprice] = useState('')
    const [largeprice, setlargeprice] = useState('')
    const [imageURL, setimage] = useState('')
    const [description, setdescription] = useState('')
    const [category, setcategory] = useState('')

    const getitembyidstate = useSelector((state) => state.getItemByIdReducer);
    const {newitem, error, loading} = getitembyidstate;

    const edititemstate = useSelector((state) => state.editItemsReducer);
    const {editloading, editerror, editsuccess} = edititemstate;

    useEffect(() => {
        if (newitem) {
            if (newitem._id == itemid) {
                setitem(newitem.item)
                setsmallprice(newitem.smallprice)
                setmediumprice(newitem.mediumprice)
                setlargeprice(newitem.largeprice)
                setcategory(newitem.category)
                setdescription(newitem.description)
                setimage(newitem.imageURL)
            } else {
                dispatch(getItemById(itemid));
            }
            
        } else {
            dispatch(getItemById(itemid));
        }
        
}, [newitem, dispatch]);


    function formHandler(e){
        e.preventDefault();
        const editeditem ={
            _id : itemid,
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
        dispatch(editItem(editeditem));
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
                    <div>
                        <h2>Edit Item</h2>
                        <h1>Item Id = {itemid}</h1>
                        <div className='text-left'>

                        <form onSubmit={formHandler}>
                            <input className='form-control' type="text" placeholder="item name" value={item} onChange={(e) => { setitem(e.target.value) }} />
                            <input className='form-control' type="text" placeholder="S size price" value={smallprice} onChange={(e) => { setsmallprice(e.target.value) }} />
                            <input className='form-control' type="text" placeholder="M size price" value={mediumprice} onChange={(e) => { setmediumprice(e.target.value) }} />
                            <input className='form-control' type="text" placeholder="L size price" value={largeprice} onChange={(e) => { setlargeprice(e.target.value) }} />
                            <input className='form-control' type="text" placeholder="Item Category" value={category} onChange={(e) => { setcategory(e.target.value) }} />
                            <input className='form-control' type="text" placeholder="Item Description" value={description} onChange={(e) => { setdescription(e.target.value) }} />
                            <input className='form-control' type="text" placeholder="Image URL" value={imageURL} onChange={(e) => { setimage(e.target.value) }} />
                            <button className='btn mt-3' type='submit'>Edit Menu Item</button>
                        </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
