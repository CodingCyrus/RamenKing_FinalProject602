import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';

export default function Navbar() {
    const orderstate = useSelector(state => state.orderReducer)
    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate
    const dispatch = useDispatch()
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-light shadow-sm p-3 mb-5 bg-white rounded">
             <div class="container-fluid">
                <a className="navbar-brand " href="/">RAMEN KING 🍜</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">

                    {currentUser ? (
                            <div className="dropdown mt-2">
                                <a style={{color:"brown"}} type="button" className="dropdown-toggle" data-bs-toggle="dropdown">
                                    {currentUser.name}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a className="dropdown-item" href="/userorders">My Orders</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={()=>{dispatch(logoutUser())}}><li>Logout</li></a></li>
                                </ul>
                            </div>
                        ) : (<li className="nav-item"><a className="nav-link" href="/login">Login</a></li>)}

                        <li className="nav-item"><a className="nav-link" href="/order">Order {orderstate.orderItems.length}</a></li>
                    </ul>
                </div>
             </div>                
            </nav>

        </div>

    )
}