import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Link, Switch } from 'react-router-dom'
import Additem from './additem';
import Menuitemslist from './menuitemslist';
import Orderslist from './orderslist';
import Userslist from './userslist';

export default function Adminpage() {
    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate
    const dispatch = useDispatch()

    // if user is not admin navigate to homepage, if admin navigate to admin page
    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = '/'
        }
    }, [])

    return (
        <div>

            <div className='row justify-content-center'>
                <div className='col-md-10'>
                    <h3>Admin Interface</h3>

                    <ul className='adminfunction'>
                        <li>
                            <Link to={'/admin/userslist'}>Users List</Link>
                        </li>
                        <li>
                            <Link to={'/admin/menuitemslist'}>Menu Items</Link>
                        </li>
                        <li>
                            <Link to={'/admin/additems'}>Add New Item</Link>
                        </li>
                        <li>
                            <Link to={'/admin/orderslist'}>Orders List</Link>
                        </li>
                    </ul>

                </div>

            </div>

        </div>

    )
}

{/* <BrowserRouter>
    <Routes>
        <Route path="/admin/userslist" element={<Userslist />}> </Route>
        <Route path="/admin/menuitemslist" element={<Menuitemslist />}> </Route>
        <Route path="/admin/additems" element={<Additem />}> </Route>
        <Route path="/admin/orderslist" element={<Orderslist />}> </Route>
    </Routes>
</BrowserRouter> */}